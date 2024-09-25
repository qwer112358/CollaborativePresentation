import React from 'react';
import { Line, Rect, Circle, Arrow } from 'react-konva';

const Shapes = ({ lines, currentShape, onShapeClick }) => {
  return (
    <>
      {/* Отрисовка всех нарисованных линий и фигур */}
      {lines.map((line, i) => {
        if (line.tool === 'rect') {
          return (
            <Rect
              key={i}
              x={Math.min(line.startX, line.endX)}
              y={Math.min(line.startY, line.endY)}
              width={Math.abs(line.endX - line.startX)}
              height={Math.abs(line.endY - line.startY)}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              onClick={() => onShapeClick(i)} // Добавляем клик для выбора фигуры
              draggable // Добавляем возможность перетаскивания
            />
          );
        } else if (line.tool === 'circle') {
          const radius = Math.sqrt(
            Math.pow(line.endX - line.startX, 2) +
              Math.pow(line.endY - line.startY, 2)
          );
          return (
            <Circle
              key={i}
              x={line.startX}
              y={line.startY}
              radius={radius}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              onClick={() => onShapeClick(i)} // Добавляем клик для выбора фигуры
              draggable // Добавляем возможность перетаскивания
            />
          );
        } else if (line.tool === 'arrow') {
          return (
            <Arrow
              key={i}
              points={[line.startX, line.startY, line.endX, line.endY]}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              onClick={() => onShapeClick(i)} // Добавляем клик для выбора фигуры
              draggable // Добавляем возможность перетаскивания
            />
          );
        } else {
          return (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              onClick={() => onShapeClick(i)} // Добавляем клик для выбора фигуры
              draggable // Добавляем возможность перетаскивания
            />
          );
        }
      })}

      {/* Отрисовка текущей фигуры */}
      {currentShape && currentShape.tool === 'rect' && (
        <Rect
          x={Math.min(currentShape.startX, currentShape.endX)}
          y={Math.min(currentShape.startY, currentShape.endY)}
          width={Math.abs(currentShape.endX - currentShape.startX)}
          height={Math.abs(currentShape.endY - currentShape.startY)}
          stroke={currentShape.stroke}
          strokeWidth={currentShape.strokeWidth}
          dash={[10, 5]} // Пример штриховки для текущей рисуемой фигуры
        />
      )}
      {currentShape && currentShape.tool === 'circle' && (
        <Circle
          x={currentShape.startX}
          y={currentShape.startY}
          radius={Math.sqrt(
            Math.pow(currentShape.endX - currentShape.startX, 2) +
              Math.pow(currentShape.endY - currentShape.startY, 2)
          )}
          stroke={currentShape.stroke}
          strokeWidth={currentShape.strokeWidth}
          dash={[10, 5]} // Пример штриховки для текущей рисуемой фигуры
        />
      )}
      {currentShape && currentShape.tool === 'arrow' && (
        <Arrow
          points={[
            currentShape.startX,
            currentShape.startY,
            currentShape.endX,
            currentShape.endY,
          ]}
          stroke={currentShape.stroke}
          strokeWidth={currentShape.strokeWidth}
          dash={[10, 5]} // Пример штриховки для текущей рисуемой фигуры
        />
      )}
    </>
  );
};

export default Shapes;
