import { PopularityCalculator } from "../src/utils/PopularityCalculator";
import { Movie } from "../src/models/Movie";

describe("PopularityCalculator", () => {
    it("should calculate popularity correctly based on ratings and viewer count", () => {
        const movie = new Movie(
            "Movie A", 2020, ["Drama"], 5, 5000, "Description", ["Actor A"], 120, "2020-01-01", "PG", "example.jpg"
        );

        const popularity = PopularityCalculator.calculate(movie);
        expect(popularity).toBeGreaterThan(0);
    });
});
