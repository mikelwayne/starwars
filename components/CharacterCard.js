import { useState } from 'react';
import useStore from '../store/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { fetchCharacterDetails } from '../lib/swapi';
import { supabase } from '../lib/client';

const CharacterCard = ({ character, films, starships }) => {
  const { addFavorite, removeFavorite, favoriteCharacters, isFavorite } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [listFilms, setListFilms] = useState(null);
  const [listStarships, setListStartships] = useState(null);

  const toggleFavorite = () => {
    if (isFavorite(character.name)) {
      let updatedFavorites = removeFavorite(character);
      // toggleFav(character.name, false)
      deleteFav(character.name)
      localStorage.setItem('favorites', updatedFavorites);
    } else {
      let updatedFavorites = addFavorite(character);
      addFav(character.name)
      localStorage.setItem('favorites', updatedFavorites);
    }
  };

  const addFav = async (nameChar) => {
      const newChar = {
        name: nameChar,
        isCompleted: true,
      };
      const { data, error } = await supabase
        .from("starwars")
        .insert([newChar])
        .single();

      if (error) {
        console.log("Error adding todo: ", error);
      } else {
        // setData((prev) => [...prev, data]);
        // setNewTodo("");
      }
    };

    const toggleFav = async (name, isCompleted) => {
      const { data, error } = await supabase
        .from("starwars")
        .update({ isCompleted: !isCompleted })
        .eq("name", name);

      if (error) {
        console.log("error toggling task: ", error);
      }
    };

    const deleteFav = async (name) => {
      const { data, error } = await supabase
        .from("starwars")
        .delete()
        .eq("name", name);

      if (error) {
        console.log("error deleting char: ", error);
      } 
      // else {
      //   setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      // }
    };

  const fetchDetails = async () => {
    const data = await fetchCharacterDetails(character.url);

    let ff = []
    character.films.forEach(f => {
        let film = films.find(fm => f === fm.url)
        ff.push('Episode ' + film.episode_id + ') ' + film.title )
        // ff += 'Episode ' + film.episode_id + ') ' + film.title + ', '
    })
    console.log('ff', ff)
    setListFilms(ff)

    let sss = []
    character.starships.forEach(ss => {
        let starship = starships.find(ssss => ss === ssss.url)
        sss.push(starship.name)
        // sss += starship.name + ', '
    })
    console.log('sss', sss)
    setListStartships(sss)

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
            className={`mt-2 px-4 py-2 text-white rounded ${
              isFavorite(character.name) ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            onClick={toggleFavorite}
          >
            {isFavorite(character.name) ? 'Remove Favorite' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => handleClose()} showCloseButton={false}>
        <DialogContent className="[&>button]:hidden">
          <DialogTitle>{character.name}</DialogTitle>
          <DialogDescription>
            {details ? (
              <>
                <span><strong>Height:</strong> {details.height}</span><br/>
                <span><strong>Mass:</strong> {details.mass}</span><br/>
                <span><strong>Birth Year:</strong> {details.birth_year}</span><br/>
                {/* <span><strong>Films:</strong> {details.films}</span><br/>
                <span><strong>Startships:</strong> {details.starships}</span><br/> */}
                {/* <span><strong>Films:</strong> {listFilms}</span><br/> */}
                <span><strong>Films:</strong></span><br/>
                {listFilms.map(function(item, idx) {
                    return (
                        <span key={idx}>
                            {item}
                            <br/>
                        </span>
                    )
                })}
                {/* <span><strong>Startships:</strong> {listStarships}</span><br/> */}
                <span><strong>Startships:</strong></span><br/>
                {listStarships.map(function(item, idx) {
                    return (
                        <span key={idx}>
                            {item}
                            <br/>
                        </span>
                    )
                })}
                {/* <span><strong>Films:</strong> 
                    {listFilms.map(lf => lf)}<br/>
                </span><br/>
                <span><strong>Startships:</strong> 
                    {listStarships.map(lss => lss)}<br/>
                </span><br/> */}
                {/* Add more details here */}
              </>
            ) : (
              <span>There is no info</span>
            )}
          </DialogDescription>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="bg-blue-500 text-white rounded" type="button" variant="secondary" onClick={() => handleClose()}>
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


/*

import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.log("error toggling task: ", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase
      .from("TodoList")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("error deleting task: ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      {" "}
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}> Add Todo Item</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li>
            <p> {todo.name}</p>
            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>
              {" "}
              {todo.isCompleted ? "Undo" : "Complete Task"}
            </button>
            <button onClick={() => deleteTask(todo.id)}> Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/