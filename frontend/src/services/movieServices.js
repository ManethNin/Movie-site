import config from "../config.json"
import http from "./httpService";

export function getMovies() {
    return http.get(config.myMovies);
}

export function deleteMovie(id) {
    
    return http.delete(config.myMovies + "/" + id);
}

