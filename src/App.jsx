import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/header/NavBar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import FoodBlog from "./pages/foodblog/FoodBlog";
import Footer from "./components/footer/Footer";
import CourseReview from "./pages/coursereviews/CourseReview";
import Ratings from "./pages/mal/Ratings";
import { MALDataProvider } from "./context/MALDataContext";

function App() {
  return (
    <MALDataProvider>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/foodblog" element={<FoodBlog />} />
            <Route path="/coursereviews" element={<CourseReview />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </MALDataProvider>
  );
}

export default App;
