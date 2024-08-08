import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OptionChain from "./pages/OptionChain";
// import "./App.css";
import "./scss/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/optionchain" element={<OptionChain />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
