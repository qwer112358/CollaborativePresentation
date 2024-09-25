import React, { useState } from 'react';

const ToolBar = ({ setTool, setColor }) => {
  const [selectedColor, setSelectedColor] = useState('#000000'); // Начальный цвет черный

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    setColor(newColor); // Передаем цвет в родительский компонент
  };

  return (
    <div>
      <button onClick={() => setTool('pencil')}>Pencil</button>
      <button onClick={() => setTool('eraser')}>Eraser</button>
      <button onClick={() => setTool('rect')}>Rectangle</button>
      <button onClick={() => setTool('circle')}>Circle</button>
      <button onClick={() => setTool('arrow')}>Arrow</button>

      {/* Выбор цвета */}
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
};

export default ToolBar;
