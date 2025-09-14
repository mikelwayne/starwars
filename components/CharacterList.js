"use client"
import { useEffect } from 'react';
import useStore from '../store/store';
import { fetchCharacters } from '../lib/swapi';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const { characters, setCharacters, isLoading, setLoading } = useStore();

  const loadCharacters = async (page = 1) => {
    setLoading(true);
    const data = await fetchCharacters(page);
    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        characters.map((character) => <CharacterCard key={character.name} character={character} />)
      )}
    </div>
  );
};

export default CharacterList;
