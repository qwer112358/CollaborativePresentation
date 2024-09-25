// ToolBar.jsx
import React from 'react';

const ToolBar = ({ setTool }) => {
  return (
    <div>
      <button onClick={() => setTool('pencil')}>Pencil</button>
      <button onClick={() => setTool('eraser')}>Eraser</button>
      <button onClick={() => setTool('rect')}>Rectangle</button>
      <button onClick={() => setTool('circle')}>Circle</button>
      <button onClick={() => setTool('arrow')}>Arrow</button>
    </div>
  );
};

export default ToolBar;
