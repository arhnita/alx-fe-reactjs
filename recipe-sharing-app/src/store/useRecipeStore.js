import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipie) =>
    set((state) => ({
      recipies: [...state.recipies, newRecipie],
    })),
  setRecipes: (recipies) => set({ recipies }),
}));

export default useRecipeStore;
