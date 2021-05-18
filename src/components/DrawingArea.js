import { React, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';

// https://medium.com/bb-tutorials-and-thoughts/how-to-implement-drawing-in-react-app-aba092e926e6

const DrawingArea = ({onClearLines, clearLines}) => {
  const [tool, setTool] = useState('pen');
  const [width, setWidth] = useState(2);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    //loadImage();
  }, [clearLines])

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, {tool, width, points: [pos.x, pos.y]}]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    if (lastLine) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }

  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className = "text-center text-dark">
    <Stage width={600}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="canvas-stage"
          >
          <Layer>
          {lines.map((line, i) => (
            <Line key={i}
                  points={line.points}
                  stroke="#000"
                  strokeWidth={line.width}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                  />
          ))}
          </Layer>
          </Stage>
          <div class="select">
          <select id="tool"
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <select id="width"
    value={width}
    onChange={(e) => {
      setWidth(e.target.value);
    }}
  >
    <option value="2">thin</option>
    <option value="5">thick</option>
    <option value="10">chonk</option>
  </select></div>
          </div>
  )
}

export default DrawingArea