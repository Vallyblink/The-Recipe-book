import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/RecipeListPage";
import RecipeInfoPage from "./pages/RecipeInfoPage";
import RecipeListPage from "./pages/RecipeListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/The-Recipe-book/" element={<Home />} />
        <Route path="/The-Recipe-book/recipe/:idMeal" element={<RecipeInfoPage />} />
        <Route path="/The-Recipe-book/recipes" element={<RecipeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;