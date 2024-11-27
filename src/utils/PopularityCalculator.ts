import { Movie } from "../models/Movie";

export class PopularityCalculator {
    static calculate(movie: Movie): number {
        const ratingWeight = 0.7;
        const viewerWeight = 0.3;
        const popularity = (movie.ratings * ratingWeight) + (movie.viewerCount * viewerWeight);
        return parseFloat(popularity.toFixed(2));
    }
}