import { Movie } from "../models/Movie";

export class SimilarityFinder {
    static findSimilar(target: Movie, movies: Movie[]): Movie[] {
        const weights = { genres: 0.5, actors: 0.3, rating: 0.2 };
        const similarMovies = movies
            .filter(movie => movie.title !== target.title)
            .map(movie => ({
                movie,
                similarity: this.calculateSimilarity(target, movie, weights)
            }))
            .filter(item => item.similarity > 0)
            .sort((a, b) => b.similarity - a.similarity);

        return similarMovies.map(item => item.movie);
    }

    static calculateSimilarity(target: Movie, movie: Movie, weights: any): number {
        let similarity = 0;

        const genreSimilarity = this.calculateGenreSimilarity(target, movie);
        similarity += genreSimilarity * weights.genres;

        const actorSimilarity = this.calculateActorSimilarity(target, movie);
        similarity += actorSimilarity * weights.actors;

        const ratingSimilarity = this.calculateRatingSimilarity(target, movie);
        similarity += ratingSimilarity * weights.rating;

        return similarity;
    }

    static calculateGenreSimilarity(target: Movie, movie: Movie): number {
        const commonGenres = target.genres.filter(genre => movie.genres.includes(genre));
        return commonGenres.length / Math.max(target.genres.length, movie.genres.length);
    }

    static calculateActorSimilarity(target: Movie, movie: Movie): number {
        const commonActors = target.actors.filter(actor => movie.actors.includes(actor));
        return commonActors.length / Math.max(target.actors.length, movie.actors.length);
    }

    static calculateRatingSimilarity(target: Movie, movie: Movie): number {
        return 1 - Math.abs(target.ratings - movie.ratings) / 10;
    }
}

