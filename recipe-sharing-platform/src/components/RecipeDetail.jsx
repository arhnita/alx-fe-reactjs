import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe data from data.json
    fetch('/src/data.json')
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error('Error loading recipe:', error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ê Back to Recipes
      </Link>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 text-lg">{recipe.summary}</p>
        </div>
      </div>

      {/* Ingredients and Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700"
              >
                <span className="text-blue-600 mr-2">"</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cooking Instructions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cooking Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700"
              >
                <span className="font-semibold text-blue-600 mr-3 flex-shrink-0">
                  {index + 1}.
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
