import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
};

const mainContentStyle = {
  flex: "0 0 70%",
};

const imageStyle = {
  width: "100%",
  height: "auto",
};

const titleStyle = {
  textAlign: "center",
  margin: "20px 0",
};

const linkStyle = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#007bff",
  textDecoration: "none",
  cursor: "pointer",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const ingredientStyle = {
  color: "#007bff",
  cursor: "pointer",
};

const instructionsStyle = {
  fontSize: "1rem",
  lineHeight: 1.6,
};

const sidebarStyle = {
  flex: "0 0 25%",
  padding: "20px",
  border: "1px solid #ccc",
  backgroundColor: "#f9f9f9",
};

const sidebarTitleStyle = {
  textAlign: "center",
};

const recipeLinkStyle = {
  display: "block",
  color: "#007bff",
  margin: "10px 0",
  textDecoration: "none",
};

function RecipeInfoPage() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const navigate = useNavigate();
  console.log( idMeal)
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://the-recipe-book-backend.onrender.com/api/recipes/${idMeal}`);
        const data = await res.json();
        console.log(data)
        const meal = data.meals?.[0] || data;
        setRecipe(meal);
        
        if (meal?.strCategory) {
          const relatedRes = await fetch(
            `https://the-recipe-book-backend.onrender.com/api/recipes?category=${meal.strCategory}`
          );
          const relatedData = await relatedRes.json();
          setRelatedRecipes(relatedData.meals || []);
        }
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    };

    fetchRecipe();
  }, [idMeal]);

  const handleNavigate = (type, value) => {
    navigate(`/recipes?${type}=${value}`);
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={imageStyle} />
        <h1 style={titleStyle}>{recipe.strMeal}</h1>

        <div style={linkStyle} onClick={() => handleNavigate("area", recipe.strArea)}>
          {recipe.strArea}
        </div>

        <h3>Instructions</h3>
        <p style={instructionsStyle}>{recipe.strInstructions}</p>

        <h3>Ingredients</h3>
        <ul style={listStyle}>
          {Array.from({ length: 20 }, (_, i) => recipe[`strIngredient${i + 1}`])
            .filter(Boolean)
            .map((ingredient, index) => (
              <li
                key={index}
                style={ingredientStyle}
                onClick={() => handleNavigate("ingredient", ingredient)}
              >
                {ingredient}
              </li>
            ))}
        </ul>
      </div>

      <div style={sidebarStyle}>
        <h2 style={sidebarTitleStyle}>More from this category</h2>
        {relatedRecipes.map((item) => (
          <Link
            key={item.idMeal}
            to={`/recipe/${item.idMeal}`}
            style={recipeLinkStyle}
          >
            {item.strMeal}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeInfoPage;
