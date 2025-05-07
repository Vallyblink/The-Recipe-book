import { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/recipelist";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Fetch all recipes on component mount
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get(
          "https://the-recipe-book-backend.onrender.com/api/recipes"
        );
        console.log(res)
        setRecipes(res.data);
      } catch (err) {
        console.error("❌ Error fetching recipes", err);
      }
    };

    fetchAllRecipes();
  }, []);

  // Fetch recipes by ingredient
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        `https://the-recipe-book-backend.onrender.com/api/recipes?ingredient=${ingredient}`
      );
      setRecipes(res.data);
    } catch (err) {
      console.error("❌ Error fetching recipes", err);
    }
  };

  return (
    <div className="container">
      <h2>🔍 Search Recipes by Ingredient</h2>
      <input
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="For example, chicken"
      />
      <button onClick={fetchRecipes}>Search</button>
      <RecipeList recipes={recipes} />
    </div>
  );
}
