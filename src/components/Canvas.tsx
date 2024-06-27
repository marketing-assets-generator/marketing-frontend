import {useRef} from "react";
import {Layer, Line, Stage, Text} from 'react-konva';

export type DrawnLine = {
  tool: 'pen' | 'eraser';
  points: number[];
}

function positionToArrayLikePoint(position: { x: number; y: number; }) {
  return [position.x, position.y];
}

type Props = {
  tool: 'pen' | 'eraser';
  lines: DrawnLine[];
  setLines: (lines: DrawnLine[]) => void;
}
const Canvas = (
  {tool, lines, setLines}: Props
) => {
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, {tool, points: [...positionToArrayLikePoint(pos)]}]);

    console.log(lines.flatMap((line) => line.points))
    console.log(lines[lines.length - 1].points)
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat(positionToArrayLikePoint(point));

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={512}
      height={512}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        <Text fill={"white"} text="Just start drawing" x={5} y={30}/>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={30}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              line.tool === 'eraser' ? 'destination-out' : 'source-over'
            }
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Canvas;
