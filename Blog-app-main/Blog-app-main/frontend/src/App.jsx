import { useState } from "react";
import Home from "./components/Home";
//Some code missing here!!!
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { Route, Routes } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />

      </Routes>
    </>
  );
}

export default App;
