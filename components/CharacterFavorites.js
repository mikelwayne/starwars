"use client"
import { useEffect } from 'react';
import useStore from '../store/store';
import { fetchCharacters, fetchFilms, fetchStarships } from '../lib/swapi';
import CharacterCard from './CharacterCard';

const CharacterFavorites = () => {
  const { characters, films, starships, setCharacters, isLoading, setLoading, setFilms, setStarships, favoriteCharacters  } = useStore();

  const loadInfo = async (page = 1) => {
    setLoading(true);
    const data = await fetchCharacters(page);
    setCharacters(data);
    const dataFilms = await fetchFilms(page);
    setFilms(dataFilms);
    const dataStarships = await fetchStarships(page);
    setStarships(dataStarships);
    setLoading(false);
  };

  // const loadCharacters = async (page = 1) => {
  //   setLoading(true);
  //   const data = await fetchCharacters(page);
  //   setCharacters(data);
  //   setLoading(false);
  // };

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        favoriteCharacters.map((character) => <CharacterCard key={character.name} character={character}  films={films} starships={starships} />)
      )}
    </div>
  );
};

export default CharacterFavorites;
