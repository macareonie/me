import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/header/NavBar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import FoodBlog from "./pages/foodblog/FoodBlog";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/foodblog" element={<FoodBlog />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
