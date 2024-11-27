import { Movie } from "../src/models/Movie";
import { SimilarityFinder } from "../src/utils/SimilarityFinder";

describe("SimilarityFinder", () => {
    it("should return similar movies based on genres, actors, and ratings", () => {
        const movie1 = new Movie(
            "Movie A", 2020, ["Drama", "Action"], 8, 5000, "Description", ["Actor A", "Actor B"], 120, "2020-01-01", "PG", "example.jpg"
        );

        const movie2 = new Movie(
            "Movie B", 2021, ["Action", "Adventure"], 7, 8000, "Description", ["Actor A", "Actor C"], 115, "2021-01-01", "PG", "example.jpg"
        );

        const movies = [movie1, movie2];
        const similarMovies = SimilarityFinder.findSimilar(movie1, movies);

        expect(similarMovies).toContain(movie2);
    });
});
