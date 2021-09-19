import React from "react";
import Layout from "./components/Layout/Layout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <Layout />
      </DndProvider>
    </div>
  );
}

export default App;
