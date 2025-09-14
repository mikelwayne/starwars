"use client"
import { create }  from 'zustand';
import { persist } from "zustand/middleware"

const useStore = create(persist(
    (set, get) => ({
  characters: [],
//   favoriteCharacters: JSON.parse(localStorage.getItem('favorites')) || [],
  favoriteCharacters: [],
  isLoading: false,
  isFavorite: (name) => {
    return Boolean(get().favoriteCharacters.find(f => f.name === name));
  },
  setCharacters: (characters) => set({ characters }),
  setLoading: (loading) => set({ isLoading: loading }),
  addFavorite: (character) => {
    set((state) => {
        console.log('state.favoriteCharacters', state.favoriteCharacters);
    //   const updatedFavorites = [...state.favoriteCharacters, character];
      state.favoriteCharacters = [...state.favoriteCharacters, character]
    //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log('updatedFavorites', state.favoriteCharacters)
    //   return { favoriteCharacters: updatedFavorites };
    return state.favoriteCharacters;
  });
  },
  removeFavorite: (character) => {
    set((state) => {
    //   const updatedFavorites = state.favoriteCharacters.filter(
    //     (char) => char.name !== character.name
    //   );
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (char) => char.name !== character.name
      );
    //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log('updatedFavorites2', state.favoriteCharacters)
      return state.favoriteCharacters;
    });
  },
})));

export default useStore;
