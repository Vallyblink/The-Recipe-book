import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/RecipeListPage";
import RecipeInfoPage from "./pages/RecipeInfoPage";
import RecipeListPage from "./pages/RecipeListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:idMeal" element={<RecipeInfoPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;