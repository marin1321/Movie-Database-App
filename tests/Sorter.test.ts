import { Movie } from "../src/models/Movie";
import { Sorter } from "../src/utils/Sorter";

test("Ordena las películas por año ascendente", () => {
    const movies = [
        new Movie("Movie A", 2020, [], 0, 0, "", [], 0, "", "", ""),
        new Movie("Movie B", 2015, [], 0, 0, "", [], 0, "", "", "")
    ];
    const sorted = Sorter.sortBy(movies, "year", "asc");
    expect(sorted[0].title).toBe("Movie B");
});