import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';

import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
// import SearchBar from './components/SearchBar';
// import FavoritesList from './components/FavoritesList';
// import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Add SearchBar to the UI */}
        {/* <SearchBar /> */}
        
        <Routes>
          <Route path="/" element={
            <>
              <RecipeList />
              <AddRecipeForm />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          {/* <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Component to extract ID from URL and pass as prop to RecipeDetails
const RecipeDetailsPage = () => {
  const { id } = useParams();
  return <RecipeDetails recipeId={parseInt(id)} />;
};

export default App;