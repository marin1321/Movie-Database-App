import { Movie } from "../models/Movie";
import { MovieFactory } from "../models/factory/MovieFactory";
import fs from "fs";

export class MovieDataLoader {
    private static instance: MovieDataLoader | null = null;
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    static getInstance(filePath: string): MovieDataLoader {
        if (!this.instance) {
            this.instance = new MovieDataLoader(filePath);
        }
        return this.instance;
    }

    loadMovies(): Movie[] {
        const rawData = fs.readFileSync(this.filePath, "utf-8");
        const movieData = JSON.parse(rawData);

        return movieData.map((movie: any) => MovieFactory.createMovie(movie));
    }
}
