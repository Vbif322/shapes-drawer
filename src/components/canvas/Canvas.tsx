import { FC, useContext, useState } from "react";
import { Circle, Layer, Rect, Stage, Star } from "react-konva";
import { figure, shape, tool } from "../../@types/types";
import Konva from "konva";
import { canvasCtx } from "../../context/CanvasProvider";

const defaultAttrs = (shape: shape) => {
  switch (shape) {
    case "circle":
      return { radius: 5 };
    case "rect":
      return { width: 5, height: 5 };
    case "star":
      return { numPoints: 5 };
    default:
      break;
  }
};

const renderFigure = (state: figure, i?: number, tool?: tool) => {
  switch (state.type) {
    case "circle":
      return (
        <Circle
          key={i}
          x={state.x}
          y={state.y}
          stroke="black"
          radius={state.radius}
          draggable={tool === "cursor"}
        />
      );
    case "rect":
      return (
        <Rect
          key={i}
          x={state.x}
          y={state.y}
          width={state.width}
          height={state.height}
          stroke="black"
          draggable={tool === "cursor"}
        />
      );
    case "star":
      return (
        <Star
          key={i}
          x={state.x}
          y={state.y}
          numPoints={5}
          innerRadius={state.innerRadius || 5}
          outerRadius={state.outerRadius || 25}
          stroke="black"
          draggable={tool === "cursor"}
        />
      );
    default:
      break;
  }
};

const Canvas: FC = () => {
  const values = useContext(canvasCtx);

  if (!values) return;

  const { tool, shape } = values;

  const [figures, setFigures] = useState<figure[]>([]);
  const [state, setState] = useState<figure & { click: boolean }>({
    click: false,
    x: 0,
    y: 0,
    type: "",
  });

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== "shapes") return;
    const stage = e.target.getStage();
    if (stage === null) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (point === null) return;
    setState({
      click: true,
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      ...defaultAttrs(shape),
      type: shape,
    });
  };

  const handleMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!state.click) return;
    const stage = e.target.getStage();
    if (stage === null) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (point === null) return;
    switch (shape) {
      case "circle":
        setState((prev) => ({
          ...prev,
          radius:
            Math.sqrt(
              Math.abs(point.x - prev.x - stageOffset.x) ** 2 +
                Math.abs(point.y - prev.y - stageOffset.y) ** 2
            ) + 5,
        }));
        break;
      case "rect":
        setState((prev) => ({
          ...prev,
          width: point.x - prev.x - stageOffset.x + 5,
          height: point.y - prev.y - stageOffset.y + 5,
        }));
        break;
      case "star":
        setState((prev) => ({
          ...prev,
          numPoints: 5,
          innerRadius:
            Math.sqrt(
              Math.abs(point.x - prev.x - stageOffset.x) ** 2 +
                Math.abs(point.y - prev.y - stageOffset.y) ** 2
            ) + 5,
          outerRadius:
            (Math.sqrt(
              Math.abs(point.x - prev.x - stageOffset.x) ** 2 +
                Math.abs(point.y - prev.y - stageOffset.y) ** 2
            ) +
              10) *
            2,
        }));
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    setState({ click: false, x: 0, y: 0, type: "" });
    const { click, ...figAttrs } = state;
    setFigures((prev) => [...prev, figAttrs]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool !== "shapes"}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>{state.click && renderFigure(state)}</Layer>
      <Layer>
        {figures.map((figure, i: number) => {
          return renderFigure(figure, i, tool);
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
