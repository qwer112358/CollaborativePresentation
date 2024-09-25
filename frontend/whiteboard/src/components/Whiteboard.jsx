import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import ToolBar from './ToolBar';
import Shapes from './Shapes';
import drawingService from '../services/drawingService';
import signalRService from '../services/signalRService';
import lineService from '../services/lineService';

const Whiteboard = () => {
  const [lines, setLines] = useState([]);
  const [tool, setTool] = useState('pencil');
  const [currentShape, setCurrentShape] = useState(null);
  const stageRef = useRef(null);

  useEffect(() => {
    signalRService.startConnection();

    signalRService.onReceiveDrawAction((user, newLines) => {
      drawingService.addExternalDraw(newLines);
      setLines([...drawingService.getLines()]);
    });

    signalRService.onLoadPreviousDrawings((savedLines) => {
      drawingService.addExternalDraw(
        savedLines.map((line) => ({
          points: JSON.parse(line.points),
          stroke: line.stroke || 'black',
        }))
      );
      setLines([...drawingService.getLines()]);
    });
  }, []);

  const handleMouseDown = () => {
    const pos = stageRef.current.getPointerPosition();
    if (tool === 'pencil') {
      drawingService.startDrawing(pos); // Рисуем линии
    } else if (tool === 'eraser') {
      drawingService.startDrawing(pos, 'white', 20); // Использует белый цвет и ширину 20 для ластика
    } else if (['rect', 'circle', 'arrow'].includes(tool)) {
      drawingService.startShapeDrawing(tool, pos.x, pos.y); // Начинаем рисование фигуры
    }
  };

  const handleMouseMove = () => {
    const pos = stageRef.current.getPointerPosition();

    if (drawingService.isDrawing) {
      if (['pencil', 'eraser'].includes(tool)) {
        drawingService.continueDrawing(pos); // Продолжение рисования линии
      } else if (['rect', 'circle', 'arrow'].includes(tool)) {
        drawingService.continueShapeDrawing(pos.x, pos.y); // Продолжение рисования фигуры
      }

      setLines([...drawingService.getLines()]); // Обновляем линии/фигуры
    }

    // Обновляем текущую фигуру, чтобы показать её след
    if (
      ['rect', 'circle', 'arrow'].includes(tool) &&
      drawingService.currentShape
    ) {
      setCurrentShape({ ...drawingService.currentShape });
    }
  };

  const handleMouseUp = () => {
    const pos = stageRef.current.getPointerPosition();

    if (['pencil', 'eraser'].includes(tool)) {
      const newLine = drawingService.endDrawing();
      setLines([...drawingService.getLines()]);
      signalRService.sendDrawAction('user1', [newLine]);
      lineService.saveLine(newLine); // Сохраняем линию в базу данных
    } else if (['rect', 'circle', 'arrow'].includes(tool)) {
      const shape = drawingService.endShapeDrawing(); // Завершаем рисование фигуры
      setLines([...lines, shape]);
      signalRService.sendDrawAction('user1', [shape]);

      // Формируем объект для сохранения фигуры
      const shapeToSave = {
        id: 0,
        points: null,
        stroke: shape.stroke,
        tool: shape.tool,
        startX: Number(shape.startX), // Преобразуем в число
        startY: Number(shape.startY), // Преобразуем в число
        endX: Number(shape.endX), // Преобразуем в число
        endY: Number(shape.endY), // Преобразуем в число
      };

      // Сохраняем фигуру в базу данных
      lineService.saveLine(shapeToSave).catch((err) => {
        console.error('Error saving data to DB: ', err);
      });
    }
  };

  return (
    <div>
      <ToolBar setTool={setTool} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
        style={{ border: '1px solid black' }}
      >
        <Layer>
          <Shapes lines={lines} currentShape={currentShape} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;
