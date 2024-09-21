import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Panel from "./components/panel/Panel";
import CanvasProvider from "./context/CanvasProvider";

function App() {
  return (
    <CanvasProvider>
      <Panel />
      <Canvas />
    </CanvasProvider>
  );
}

export default App;
