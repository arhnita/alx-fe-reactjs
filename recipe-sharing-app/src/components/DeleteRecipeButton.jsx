import useRecipeStore from "../store/useRecipeStore";

const DeleteRecipe = () => {
  const { recipes, deleteRecipe} = useRecipeStore();



  const handleDelete = (id) => {
    deleteRecipe(id);
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => handleDelete(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteRecipe;