import { Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <RecipeList />
                  <AddRecipeForm />
                </div>
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetails />}/>
          </Routes>
        </div>
      </Router>

      <RecipeList />
      <AddRecipeForm />
    </>
  );
}

export default App;
