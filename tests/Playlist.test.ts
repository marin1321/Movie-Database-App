import { Movie } from "../src/models/Movie";
import { Playlist } from "../src/utils/Playlist";

test("Crear una playlist y navegar entre las películas", () => {
    const movies = [
        new Movie("Movie A", 2020, [], 0, 0, "", [], 120, "", "", ""),
        new Movie("Movie B", 2015, [], 0, 0, "", [], 100, "", "", ""),
        new Movie("Movie C", 2021, [], 0, 0, "", [], 130, "", "", "")
    ];
    const playlist = new Playlist(movies);

    expect(playlist.getCurrentMovie()?.title).toBe("Movie A");

    playlist.next();
    expect(playlist.getCurrentMovie()?.title).toBe("Movie B");

    playlist.previous();
    expect(playlist.getCurrentMovie()?.title).toBe("Movie A");

    playlist.reset();
    expect(playlist.getCurrentMovie()?.title).toBe("Movie A");
});