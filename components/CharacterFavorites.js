"use client"
import { useEffect } from 'react';
import useStore from '../store/store';
import { fetchCharacters } from '../lib/swapi';
import CharacterCard from './CharacterCard';

const CharacterFavorites = () => {
  const { characters, setCharacters, isLoading, setLoading, favoriteCharacters } = useStore();

  const loadCharacters = async (page = 1) => {
    setLoading(true);
    const data = await fetchCharacters(page);
    setCharacters(data);
    setLoading(false);
  };

  console.log('favoriteCharacters', favoriteCharacters)

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        favoriteCharacters.map((character) => <CharacterCard key={character.name} character={character} />)
      )}
    </div>
  );
};

export default CharacterFavorites;
