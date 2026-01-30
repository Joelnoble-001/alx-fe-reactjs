import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  return (
    <div>
      <h2>Recommended Recipes</h2>

      <button onClick={generateRecommendations}>
        Generate Recommendations
      </button>

      {recommendations.length === 0 && <p>No recommendations yet</p>}

      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
