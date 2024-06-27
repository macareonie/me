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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/foodblog" element={<FoodBlog />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
