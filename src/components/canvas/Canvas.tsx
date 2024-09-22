import { FC, useContext, useState } from "react";
import { Circle, Layer, Rect, Stage, Star } from "react-konva";
import { figure, shape, temporaryFigure, tool } from "../../@types/types";
import Konva from "konva";
import { canvasCtx } from "../../context/CanvasProvider";

/**
 * Определение начальных параметров фигуры в зависимости от ее типа
 * @param shape Тип фигуры
 * @returns Начальные параметры для каждой из фигур
 */
const defaultAttrs = (shape: shape): figure => {
  switch (shape) {
    case "rect":
      return { width: 5, height: 5, type: "rect", x: 0, y: 0 };
    case "star":
      return {
        numPoints: 5,
        innerRadius: 5,
        outerRadius: 10,
        type: "star",
        x: 0,
        y: 0,
      };
    default:
      return { radius: 5, type: "circle", x: 0, y: 0 };
  }
};

/** Определяет JSX разметку в зависимости от типа фигуры
 * @param figure Выбранная фигура
 * @param i Порядковый номер в массиве фигур
 * @param tool Выбранный инструмент
 * @returns JSX разметку нужной фигуры
 */
const renderFigure = (figure: figure, i?: number, tool?: tool) => {
  switch (figure.type) {
    case "rect":
      return (
        <Rect
          key={i}
          x={figure.x}
          y={figure.y}
          width={figure.width}
          height={figure.height}
          stroke="black"
          draggable={tool === "cursor"}
        />
      );
    case "star":
      return (
        <Star
          key={i}
          x={figure.x}
          y={figure.y}
          numPoints={5}
          innerRadius={figure.innerRadius || 5}
          outerRadius={figure.outerRadius || 25}
          stroke="black"
          draggable={tool === "cursor"}
        />
      );
    default:
      return (
        <Circle
          key={i}
          x={figure.x}
          y={figure.y}
          stroke="black"
          radius={figure.radius}
          draggable={tool === "cursor"}
        />
      );
  }
};

const Canvas: FC = () => {
  const values = useContext(canvasCtx);

  if (!values) return;

  const { tool, shape } = values;

  const [figures, setFigures] = useState<figure[]>([]);
  const [tempFigure, setTempFigure] = useState<temporaryFigure>({
    click: false,
  });

  /** Обработчик нажатия мыши. Устанавливает временную фигуру с изменяемым размером */
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== "shapes") return;
    const stage = e.target.getStage();
    if (stage === null) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (point === null) return;
    setTempFigure({
      ...defaultAttrs(shape),
      click: true,
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
    });
  };

  /** Обработчик движения мыши при нажатой ЛКМ. Меняет размер выбранной фигуры */
  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!tempFigure.click) return;
    const stage = e.target.getStage();
    if (stage === null) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (point === null) return;
    switch (shape) {
      case "circle":
        setTempFigure((prev) => {
          if (!("x" in prev)) return prev;
          return {
            ...prev,
            radius:
              Math.sqrt(
                Math.abs(point.x - prev.x - stageOffset.x) ** 2 +
                  Math.abs(point.y - prev.y - stageOffset.y) ** 2
              ) + 5,
          };
        });
        break;
      case "rect":
        setTempFigure((prev) => {
          if (!("x" in prev)) return prev;
          return {
            ...prev,
            width: point.x - prev.x - stageOffset.x + 5,
            height: point.y - prev.y - stageOffset.y + 5,
          };
        });
        break;
      case "star":
        setTempFigure((prev) => {
          if (!("x" in prev)) return prev;
          return {
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
                5) *
              2,
          };
        });
        break;
      default:
        break;
    }
  };

  /** Обработчик мыши, который срабатывает при отпускании ЛКМ. Добавляет временную фигуру в массив всех фигур */
  const handleMouseUp = () => {
    setTempFigure({ click: false });
    const { click, ...figAttrs } = tempFigure;
    if ("x" in figAttrs) {
      setFigures((prev) => {
        return [...prev, figAttrs];
      });
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool !== "shapes"}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>{tempFigure.click && renderFigure(tempFigure)}</Layer>
      <Layer>
        {figures.map((figure, i: number) => {
          return renderFigure(figure, i, tool);
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
