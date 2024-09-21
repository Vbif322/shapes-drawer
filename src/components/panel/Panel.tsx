import { FC, useContext } from "react";
import s from "./style.module.scss";
import { Circle, MousePointer2, Shapes, Square, Star } from "lucide-react";
import { shape, tool } from "../../@types/types";
import { canvasCtx } from "../../context/CanvasProvider";

const Panel: FC = () => {
  const values = useContext(canvasCtx);

  if (values === null) {
    return;
  }

  const { tool, setTool, shape, setShape } = values;

  const handleClickTool = (tool: tool) => {
    setTool((prev) => {
      if (prev === tool) {
        return "";
      } else return tool;
    });
  };

  const handleClickShape = (shape: shape) => {
    setShape((prev) => {
      if (prev === shape) {
        return "";
      } else return shape;
    });
  };

  return (
    <div className={s.container}>
      <div
        className={`${s.btn} ${tool === "shapes" ? s.active : ""}`}
        onClick={() => handleClickTool("shapes")}
      >
        <Shapes />
      </div>
      <div
        className={`${s.icons__container} ${tool === "shapes" ? s.active : ""}`}
      >
        <div
          className={`${s.btn} ${shape === "circle" ? s.active : ""}`}
          onClick={() => handleClickShape("circle")}
        >
          <Circle />
        </div>
        <div
          className={`${s.btn} ${shape === "rect" ? s.active : ""}`}
          onClick={() => handleClickShape("rect")}
        >
          <Square />
        </div>
        <div
          className={`${s.btn} ${shape === "star" ? s.active : ""}`}
          onClick={() => handleClickShape("star")}
        >
          <Star />
        </div>
      </div>
      <div
        className={`${s.btn} ${tool === "cursor" ? s.active : ""}`}
        onClick={() => handleClickTool("cursor")}
      >
        <MousePointer2 />
      </div>
    </div>
  );
};

export default Panel;
