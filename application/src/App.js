import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About } from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Navbar from "./components/Navbar";
import Khushboo from "./components/About/People/Khushboo";
import Cody from "./components/About/People/Cody";
import Ernesto from "./components/About/People/Ernesto";
import Jesus from "./components/About/People/Jesus";
import Jiasheng from "./components/About/People/Jiasheng";
import Vivian from "./components/About/People/Vivian";
import Mark from "./components/About/People/Mark";

function App() {
  return (
    <Router>
      <Navbar />
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

        {/* <Route path="*" component={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
