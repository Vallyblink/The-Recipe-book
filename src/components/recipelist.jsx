export default function RecipeList({ recipes }) {
    if (!recipes.length) return <p>⏳ Loading recipes...</p>;
  
    return (
      <ul style={{ marginTop: 24, listStyleType: "none", padding: 0 }}>
        {recipes.map((recipe) => (
          <li key={recipe._id} style={{ marginBottom: 20, padding: 16, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ marginBottom: 8, fontSize: "1.2em", color: "#333" }}>{recipe.name}</h3>
            <p style={{ fontSize: "1em", color: "#555" }}>{recipe.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  