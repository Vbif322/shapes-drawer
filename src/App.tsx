import { FC } from "react";
import Canvas from "./components/canvas/Canvas";
import Panel from "./components/panel/Panel";
import CanvasProvider from "./context/CanvasProvider";

const App: FC = () => {
  return (
    <CanvasProvider>
      <Panel />
      <Canvas />
    </CanvasProvider>
  );
};

export default App;
