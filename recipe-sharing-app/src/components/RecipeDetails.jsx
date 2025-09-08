import DeleteRecipe from "./DeleteRecipeButton";
import EditRecipe from "./EditRecipeForm";
import useRecipeStore from "./recipeStore";

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );


return (
    <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <EditRecipe />
        <DeleteRecipe />
    </div>
)

};

export default RecipeDetails;