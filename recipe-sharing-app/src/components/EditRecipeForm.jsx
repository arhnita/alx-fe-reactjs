import useRecipeStore from "../store/useRecipeStore";

const EditRecipe = () => {
  const { recipes, updateRecipe } = useRecipeStore();


  const handleUpdate = (id) => {
    updateRecipe(id, {
      title: "Updated Title"
    });
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => handleUpdate(recipe.id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default EditRecipe;