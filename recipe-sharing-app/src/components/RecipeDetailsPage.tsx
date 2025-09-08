import { useParams } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  return <RecipeDetails recipeId={parseInt(id ?? "0")} />;
};