import { Movie } from "../models/Movie";

export class Sorter {
    static sortBy<T extends keyof Movie>(
        movies: Movie[],
        key: T,
        order: "asc" | "desc" = "asc"
    ): Movie[] {
        const sorted = movies.sort((a, b) => {
            if (a[key] < b[key]) return order === "asc" ? -1 : 1;
            if (a[key] > b[key]) return order === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }
}