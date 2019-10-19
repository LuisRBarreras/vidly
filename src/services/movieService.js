import http from "./httpService";
import config from "../config.json";

function movieUrl(id) {
  return `${config.apiUrl}/movies/${id}`;
}

export function getMovies() {
  return http.get(`${config.apiUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (!movie._id) {
    return http.post(`${config.apiUrl}/movies/`, movie);
  }


  const body = { ...movie };
  delete body._id;
  return http.put(movieUrl(movie._id), body);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
