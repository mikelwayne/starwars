import axios from 'axios';

const SWAPI_URL = 'https://swapi.info/api/';

export const fetchCharacters = async (page = 1) => {
  const response = await axios.get(`${SWAPI_URL}people`); // /?page=${page}
  console.log(response.data)
  return response.data;
};

export const fetchCharacterDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchFilms = async (url) => {
  const response = await axios.get(`${SWAPI_URL}films`);
  return response.data;
};

export const fetchStarships = async (url) => {
  const response = await axios.get(`${SWAPI_URL}starships`);
  return response.data;
};
