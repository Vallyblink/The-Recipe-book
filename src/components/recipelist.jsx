import React from 'react';
import { Link } from 'react-router-dom';

const listStyle = {
  marginTop: 24,
  listStyleType: "none",
  padding: 0
};

const listItemStyle = {
  marginBottom: 20,
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit"
};

const headingStyle = {
  marginBottom: 8,
  fontSize: "1.2em",
  color: "#333"
};

const imageStyle = {
  width: "100%",
  borderRadius: "8px"
};

const textStyle = {
  fontSize: "1em",
  color: "#555",
  marginTop: 8
};

const ingredientListStyle = {
  fontSize: "1em",
  color: "#555",
  marginTop: 8
};

const fullRecipeLinkStyle = {
  color: "#4CAF50",
  textDecoration: "none",
  marginTop: 8,
  display: "block"
};

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) return <p>⏳ Loading recipes...</p>;

  return (
    <ul style={listStyle}>
      {recipes.map((recipe) => {
        const ingredients = Array.from({ length: 20 }, (_, index) => recipe[`strIngredient${index + 1}`])
          .filter(Boolean);

        return (
          <li key={recipe.idMeal} style={listItemStyle}>
            <Link to={`/recipe/${recipe.idMeal}`} style={linkStyle}>
              <div>
                <h3 style={headingStyle}>{recipe.strMeal}</h3>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  style={imageStyle}
                />
                <p style={textStyle}>Category: {recipe.strCategory}</p>
                <p style={textStyle}>Area: {recipe.strArea}</p>
                <h2 style={ingredientListStyle}>
                  <strong>Ingredients:</strong>
                  <ul>
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </h2>
                <p style={textStyle}>
                  <strong>Instructions:</strong>
                  <br />
                  {recipe.strInstructions}
                </p>
                <h4
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={fullRecipeLinkStyle}
                >
                  View Full Recipe
                </h4>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
