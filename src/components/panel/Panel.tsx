import { FC, useContext } from "react";
import styles from "./style.module.scss";
import { Circle, MousePointer2, Shapes, Square, Star } from "lucide-react";
import { shape, tool } from "../../@types/types";
import { canvasCtx } from "../../context/CanvasProvider";

const Panel: FC = () => {
  const values = useContext(canvasCtx);

  if (values === null) {
    return;
  }

  const { tool, setTool, shape, setShape } = values;

  /** Обработчик выбора инструмента */
  const handleClickTool = (tool: tool) => {
    setTool((prev) => {
      if (prev === tool) {
        return undefined;
      } else return tool;
    });
  };

  /** Обработчик выбора формы фигуры */
  const handleClickShape = (shape: shape) => {
    setShape(shape);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.btn} ${tool === "shapes" ? styles.active : ""}`}
        onClick={() => handleClickTool("shapes")}
      >
        <Shapes />
      </div>
      <div
        className={`${styles.icons__container} ${
          tool === "shapes" ? styles.active : ""
        }`}
      >
        <div
          className={`${styles.btn} ${shape === "circle" ? styles.active : ""}`}
          onClick={() => handleClickShape("circle")}
        >
          <Circle />
        </div>
        <div
          className={`${styles.btn} ${shape === "rect" ? styles.active : ""}`}
          onClick={() => handleClickShape("rect")}
        >
          <Square />
        </div>
        <div
          className={`${styles.btn} ${shape === "star" ? styles.active : ""}`}
          onClick={() => handleClickShape("star")}
        >
          <Star />
        </div>
      </div>
      <div
        className={`${styles.btn} ${tool === "cursor" ? styles.active : ""}`}
        onClick={() => handleClickTool("cursor")}
      >
        <MousePointer2 />
      </div>
    </div>
  );
};

export default Panel;
