import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
// import Navbar from "../src/components/Navbar";
import Khushboo from "../src/components/About/People/Khushboo";
import Cody from "../src/components/About/People/Cody";
import Ernesto from "../src/components/About/People/Ernesto";
import Jesus from "../src/components/About/People/Jesus";
import Jiasheng from "../src/components/About/People/Jiasheng";
import Vivian from "../src/components/About/People/Vivian";
import Mark from "../src/components/About/People/Mark";
import About from "./Pages/About";
import RegisterPage from "./Pages/Register";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/about/Mark" exact element={<Mark />} />
        <Route path="/about/khushboo" exact element={<Khushboo />} />
        <Route path="/about/Cody" exact element={<Cody />} />
        <Route path="/about/Ernesto" exact element={<Ernesto />} />
        <Route path="/about/Jesus" exact element={<Jesus />} />
        <Route path="/about/Jiasheng" exact element={<Jiasheng />} />
        <Route path="/about/Vivian" exact element={<Vivian />} />

        <Route path="/register" exact element={<RegisterPage />} />

        {/* <Route path="*" element={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
