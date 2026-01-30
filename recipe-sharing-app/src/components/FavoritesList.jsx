import { useRecipeStore } from '../store/recipeStore';

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore();

  const favoriteRecipes = favorites.map((id) =>
    recipes.find((r) => r.id === id)
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map(
        (recipe) =>
          recipe && (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
            </div>
          )
      )}
    </div>
  );
};

export default FavoritesList;
