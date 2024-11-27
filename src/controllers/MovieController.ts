import { Request, Response } from "express";
import { MovieDataLoader } from "../data/MovieDataLoader";
import { Sorter } from "../utils/Sorter";
import { PopularityCalculator } from "../utils/PopularityCalculator";
import { SimilarityFinder } from "../utils/SimilarityFinder";

// Load the movie data
const loader = new MovieDataLoader("src/data/movies.json");
const movies = loader.loadMovies();

export class MovieController {

    /**
     * Retrieves a list of movies ordered by popularity.
     * Supports pagination using `page` and `limit` query parameters.
     * 
     * @param req - The request object containing query parameters for pagination.
     * @param res - The response object to send the paginated movie data.
     */
    static getByPopularity(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const popularMovies = movies.map(movie => ({
                ...movie,
                popularity: PopularityCalculator.calculate(movie)
            }));
            popularMovies.sort((a, b) => b.popularity - a.popularity);

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedMovies = popularMovies.slice(startIndex, endIndex);

            res.json({
                currentPage: page,
                totalPages: Math.ceil(popularMovies.length / limit),
                totalMovies: popularMovies.length,
                movies: paginatedMovies
            });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener las películas por popularidad", error: err });
        }
    }

    /**
     * Retrieves a list of movies sorted by year (ascending or descending).
     * Supports pagination using `page` and `limit` query parameters.
     * 
     * @param req - The request object containing query parameters for pagination and sorting order.
     * @param res - The response object to send the sorted and paginated movie data.
     */
    static getByYear(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const order = req.query.order === "desc" ? "desc" : "asc";

            const sortedMovies = Sorter.sortBy(movies, "year", order);

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

            res.json({
                currentPage: page,
                totalPages: Math.ceil(sortedMovies.length / limit),
                totalMovies: sortedMovies.length,
                movies: paginatedMovies
            });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener las películas por año", error: err });
        }
    }

    /**
     * Retrieves a list of movies similar to a specified movie (based on the title).
     * Supports pagination using `page` and `limit` query parameters.
     * 
     * @param req - The request object containing the `title` query parameter and pagination parameters.
     * @param res - The response object to send the paginated similar movie data.
     */
    static getSimilarMovies(req: Request, res: Response) {
        try {
            const { title } = req.query;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            if (!title) {
                res.status(400).json({ error: "El parámetro 'title' es obligatorio" });
                return;
            }
            const target = movies.find(movie => movie.title === title);
            if (!target) {
                res.status(404).json({ error: "Película no encontrada" });
                return;
            }

            const similarMovies = SimilarityFinder.findSimilar(target, movies);

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedSimilarMovies = similarMovies.slice(startIndex, endIndex);

            res.json({
                currentPage: page,
                totalPages: Math.ceil(similarMovies.length / limit),
                totalMovies: similarMovies.length,
                movies: paginatedSimilarMovies
            });
        } catch (err) {
            res.status(500).json({ message: "Error al obtener películas similares", error: err });
        }
    }
}
