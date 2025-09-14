import { useState } from 'react';
import useStore from '../store/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { fetchCharacterDetails } from '../lib/swapi';

const CharacterCard = ({ character }) => {
  const { addFavorite, removeFavorite, favoriteCharacters, isFavorite } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const toggleFavorite = () => {
    if (isFavorite(character.name)) {
      let updatedFavorites = removeFavorite(character);
      localStorage.setItem('favorites', updatedFavorites);
    } else {
      let updatedFavorites = addFavorite(character);
      localStorage.setItem('favorites', updatedFavorites);
    }
  };

  const fetchDetails = async () => {
    const data = await fetchCharacterDetails(character.url);
    setDetails(data);
  };

  const handleClose = () => {
    console.log('entro aqui');
    setIsOpen(false)
  }

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="text-lg font-semibold">{character.name}</h3>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              fetchDetails();
              setIsOpen(true);
            }}
          >
            View Details
          </button>
          <button
            className={`mt-2 px-4 py-2 rounded ${
              isFavorite(character.name) ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            onClick={toggleFavorite}
          >
            {isFavorite(character.name) ? 'Remove Favorite' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => handleClose()}>
        <DialogContent>
          <DialogTitle>{character.name}</DialogTitle>
          <DialogDescription>
            {details ? (
              <>
                <span><strong>Height:</strong> {details.height}</span><br/>
                <span><strong>Mass:</strong> {details.mass}</span><br/>
                <span><strong>Birth Year:</strong> {details.birth_year}</span><br/>
                <span><strong>Films:</strong> {details.films}</span><br/>
                <span><strong>Startships:</strong> {details.starships}</span><br/>
                {/* Add more details here */}
              </>
            ) : (
              <span>There is no info</span>
            )}
          </DialogDescription>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterCard;
