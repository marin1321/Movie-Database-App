import { Request, Response } from "express";
import { MovieDataLoader } from "../data/MovieDataLoader";
import { Sorter } from "../utils/Sorter";
import { PopularityCalculator } from "../utils/PopularityCalculator";
import { Playlist } from "../utils/Playlist";

const loader = new MovieDataLoader("src/data/movies.json");
const movies = loader.loadMovies();

// Current playlist in memory
let currentPlaylist: Playlist | null = null;

export class PlaylistController {

    /**
     * Creates a playlist sorted by movie popularity.
     * Calculates the popularity for each movie and sorts them in descending order.
     * 
     * @param req - The request object.
     * @param res - The response object to send a success message.
     */
    static createPlaylistByPopularity(req: Request, res: Response) {
        try {
            const popularMovies = movies.map(movie => ({
                ...movie,
                popularity: PopularityCalculator.calculate(movie)
            }));
            popularMovies.sort((a, b) => b.popularity - a.popularity); // Orden descendente
            currentPlaylist = new Playlist(popularMovies);
            res.json({ message: "Playlist de popularidad creada con éxito" });
        } catch (err) {
            res.status(500).json({ message: "Error al crear playlist por popularidad", error: err });
        }
    }

    /**
     * Creates a playlist sorted by movie release year.
     * The sorting order can be ascending or descending, based on the query parameter.
     * 
     * @param req - The request object containing the sorting order (`order` query parameter).
     * @param res - The response object to send a success message.
     */
    static createPlaylistByYear(req: Request, res: Response) {
        try {
            const order = req.query.order === "desc" ? "desc" : "asc"; // Validación del parámetro 'order'
            const sortedMovies = Sorter.sortBy(movies, "year", order);
            currentPlaylist = new Playlist(sortedMovies);
            res.json({ message: "Playlist por año creada con éxito" });
        } catch (err) {
            res.status(500).json({ message: "Error al crear playlist por año", error: err });
        }
    }

    /**
     * Retrieves the current movie in the playlist.
     * Returns the movie at the current position of the playlist.
     * 
     * @param req - The request object.
     * @param res - The response object to send the current movie data.
     */
    static getCurrentMovie(req: Request, res: Response) {
        if (!currentPlaylist) {
            res.status(404).json({ error: "No hay ninguna playlist creada" });
            return
        }
        const currentMovie = currentPlaylist.getCurrentMovie();
        res.json(currentMovie);
    }

    /**
     * Retrieves the next movie in the playlist.
     * Returns the next movie in the playlist, or an error if no playlist exists.
     * 
     * @param req - The request object.
     * @param res - The response object to send the next movie data.
     */
    static nextMovie(req: Request, res: Response) {
        if (!currentPlaylist) {
            res.status(404).json({ error: "No hay ninguna playlist creada" });
            return
        }
        const nextMovie = currentPlaylist.next();
        res.json(nextMovie);
    }

    /**
     * Retrieves the previous movie in the playlist.
     * Returns the previous movie in the playlist, or an error if no playlist exists.
     * 
     * @param req - The request object.
     * @param res - The response object to send the previous movie data.
     */
    static previousMovie(req: Request, res: Response) {
        if (!currentPlaylist) {
            res.status(404).json({ error: "No hay ninguna playlist creada" });
            return
        }
        const previousMovie = currentPlaylist.previous();
        res.json(previousMovie);
    }

    /**
     * Resets the playlist.
     * Clears the current playlist and sets it back to the initial state.
     * 
     * @param req - The request object.
     * @param res - The response object to send a success message.
     */
    static resetPlaylist(req: Request, res: Response) {
        if (!currentPlaylist) {
            res.status(404).json({ error: "No hay ninguna playlist creada" });
            return
        }
        currentPlaylist.reset();
        res.json({ message: "Playlist reiniciada" });
    }
}
