import React, {
    useEffect,
    useState,
    useRef,
} from 'react';

import {
    Stage,
    Layer,
    Line,
} from 'react-konva';

// https://medium.com/bb-tutorials-and-thoughts/how-to-implement-drawing-in-react-app-aba092e926e6

const DrawingArea = ({
    socket
}) => {
    const [tool, setTool] = useState('draw');
    const [width, setWidth] = useState(2);
    const [color, setColor] = useState("black")
    const [lines, setLines] = useState([]);

    const isDrawing = useRef(false);

    useEffect(() => {
        //loadImage();
    }, [])

    const colors = document.getElementsByClassName('color');
    // console.log(colors, 'the colors');
    const onColorUpdate = (e) => {
        setColor(e.target.className.split(" ")[1]);
    }
    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', onColorUpdate, false);
    }

    socket.on("drawing", (arg) => {
        console.log("client drawing");
        setLines(arg);
    });

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        console.log("mousedown");
        setLines([...lines, {
            tool,
            width,
            color,
            points: [pos.x, pos.y]
            }]);
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
            // why concat an empty arg? should replace this splice?
            lines.splice(lines.length - 1, 1, lastLine);
            console.log("mousemove");
            setLines(lines.concat());
        }

    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        console.log("mouseup");
        socket.emit('drawing', lines);
    };

    return (
        <div className="text-center text-dark">
          <Stage
            width={600}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          className="canvas-stage">
            <Layer>
              {lines.map((line, i) => (<Line
                key = {i}
                points = {line.points}
                stroke = {line.color}
                strokeWidth = {line.width}
                tension = {0.5}
                lineCap = "round"
                globalCompositeOperation = {
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'} />))}
            </Layer>
          </Stage>
          <div className="select">
            <select
              id="tool"
              value={tool}
              onChange={(e) => {
                setTool(e.target.value);
              }}>
              <option value="draw">draw</option>
              <option value="eraser">erase</option>
            </select>
            <select
              id="width"
              value={width}
              onChange = {(e) => {
                setWidth(e.target.value);
              }}>
              <option value="2">thin</option>
              <option value="5">thick</option>
              <option value="10">chonk</option>
            </select>
            <div className="colors">
              <div className="color black" />
              <div className="color red" />
              <div className="color green" />
              <div className="color blue" />
              <div className="color yellow" />
              <div className="color white" />
            </div>
          </div>
        </div>
    )
}

export default DrawingArea
