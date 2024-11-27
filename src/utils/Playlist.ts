import { Movie } from "../models/Movie";

export class Playlist {
    private movies: Movie[];
    private currentIndex: number;

    constructor(movies: Movie[]) {
        this.movies = movies;
        this.currentIndex = 0;
    }

    getCurrentMovie(): Movie | null {
        return this.movies[this.currentIndex] || null;
    }

    next(): Movie | null {
        if (this.currentIndex < this.movies.length - 1) {
            this.currentIndex++;
        }
        return this.getCurrentMovie();
    }

    previous(): Movie | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        return this.getCurrentMovie();
    }

    hasNext(): boolean {
        return this.currentIndex < this.movies.length - 1;
    }

    hasPrevious(): boolean {
        return this.currentIndex > 0;
    }

    reset(): void {
        this.currentIndex = 0;
    }

    getAllMovies(): Movie[] {
        return this.movies;
    }
}