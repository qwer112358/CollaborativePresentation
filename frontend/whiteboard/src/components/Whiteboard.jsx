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
  const [color, setColor] = useState('#000000');
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);

  const handleShapeClick = (index) => {
    setSelectedShapeIndex(index);
  };

  useEffect(() => {
    signalRService.startConnection();

    signalRService.onReceiveDrawAction((user, newLines) => {
      drawingService.addExternalDraw(newLines);
      setLines([...drawingService.getLines()]);
    });

    signalRService.onLoadPreviousDrawings((savedLines) => {
      console.log('saved', savedLines);
      drawingService.addExternalDraw(
        savedLines.map((line) => ({
          points: JSON.parse(line.points),
          stroke: line.stroke || 'black',
        }))
      );
      setLines([...drawingService.getLines()]);
    });
  }, []);

  const moveShapeUp = (index) => {
    if (index < lines.length - 1) {
      const newLines = [...lines];
      const temp = newLines[index];
      newLines[index] = newLines[index + 1];
      newLines[index + 1] = temp;
      setLines(newLines);
    }
  };

  const moveShapeDown = (index) => {
    if (index > 0) {
      const newLines = [...lines];
      const temp = newLines[index];
      newLines[index] = newLines[index - 1];
      newLines[index - 1] = temp;
      setLines(newLines);
    }
  };

  const handleMouseDown = () => {
    const pos = stageRef.current.getPointerPosition();
    if (tool === 'pencil') {
      drawingService.startDrawing(pos, color);
    } else if (tool === 'eraser') {
      drawingService.startDrawing(pos, 'white', 20);
    } else if (['rect', 'circle', 'arrow'].includes(tool)) {
      drawingService.startShapeDrawing(tool, pos.x, pos.y, color);
    }
  };

  const handleMouseMove = () => {
    const pos = stageRef.current.getPointerPosition();

    if (drawingService.isDrawing) {
      if (['pencil', 'eraser'].includes(tool)) {
        drawingService.continueDrawing(pos);
      } else if (['rect', 'circle', 'arrow'].includes(tool)) {
        drawingService.continueShapeDrawing(pos.x, pos.y);
      }

      setLines([...drawingService.getLines()]);
    }

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
      lineService.saveLine(newLine);
    } else if (['rect', 'circle', 'arrow'].includes(tool)) {
      const shape = drawingService.endShapeDrawing();
      setLines([...lines, shape]);
      signalRService.sendDrawAction('user1', [shape]);

      const shapeToSave = {
        id: 0,
        points: null,
        stroke: shape.stroke,
        tool: shape.tool,
        startX: Number(shape.startX),
        startY: Number(shape.startY),
        endX: Number(shape.endX),
        endY: Number(shape.endY),
      };

      lineService.saveLine(shapeToSave).catch((err) => {
        console.error('Error saving data to DB: ', err);
      });
    }
  };

  return (
    <div>
      <ToolBar setTool={setTool} setColor={setColor} />
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
          <Shapes
            lines={lines}
            currentShape={currentShape}
            onShapeClick={handleShapeClick}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;
