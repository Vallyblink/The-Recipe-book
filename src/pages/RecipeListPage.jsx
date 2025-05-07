import { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/recipelist";
import { useSearchParams } from "react-router-dom";

export default function RecipeListPage() {
  const [searchParams] = useSearchParams();

  const initialIngredient = searchParams.get("ingredient") || "";
  const initialCountry = searchParams.get("country") || "";

  const [ingredient, setIngredient] = useState(initialIngredient);
  const [area, setArea] = useState(initialCountry);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, [ingredient, area]);

  const fetchRecipes = async () => {
    try {
      let url = "https://the-recipe-book-backend.onrender.com/api/recipes";
      const params = [];
      if (ingredient) params.push(`ingredient=${ingredient}`);
      if (area) params.push(`area=${area}`);
      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await axios.get(url);
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("❌ Error fetching recipes", err);
    }
  };

  return (
    <div className="container">
      <h2>🔍 Search Recipes</h2>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Ingredient (e.g. chicken)"
      />
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Country (e.g. Italian)"
      />
      <button onClick={fetchRecipes}>Search</button>
      <RecipeList recipes={recipes} />
    </div>
  );
}
