"use client"
import { create }  from 'zustand';
import { persist } from "zustand/middleware"

const useStore = create(persist(
    (set, get) => ({
  characters: [],
  films: [],
  starships: [],
  favoriteCharacters: [],
  isLoading: false,
  isFavorite: (name) => {
    return Boolean(get().favoriteCharacters.find(f => f.name === name));
  },
  setCharacters: (characters) => set({ characters }),
  setFilms: (films) => set({ films }),
  setStarships: (starships) => set({ starships }),
  setLoading: (loading) => set({ isLoading: loading }),
  addFavorite: (character) => {
    set((state) => {
    console.log('state.favoriteCharacters', state.favoriteCharacters);
    state.favoriteCharacters = [...state.favoriteCharacters, character]
    console.log('updatedFavorites', state.favoriteCharacters)
    return state.favoriteCharacters;
  });
  },
  removeFavorite: (character) => {
    set((state) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (char) => char.name !== character.name
      );
      console.log('updatedFavorites2', state.favoriteCharacters)
      return state.favoriteCharacters;
    });
  },
})));

export default useStore;
