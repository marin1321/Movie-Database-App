import request from "supertest";
import app from "../../src/app";

describe("API Test of playback list", () => {

    it("You should create a playlist by popularity", async () => {
        const res = await request(app).post("/playlist/popularity");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Playlist de popularidad creada con éxito");
    });

    it("You must create one playlist per year", async () => {
        const res = await request(app).post("/playlist/year?order=desc");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Playlist por año creada con éxito");
    });

    it("Should return the current movie in the playlist", async () => {
        const res = await request(app).get("/playlist/current");
        expect(res.status).toBe(200);
        expect(res.body.title).toBeDefined();
    });

    it("You must return the next movie in the playlist", async () => {
        const res = await request(app).get("/playlist/next");
        expect(res.status).toBe(200);
        expect(res.body.title).toBeDefined();
    });

    it("You must return the previous movie in the playlist", async () => {
        const res = await request(app).get("/playlist/previous");
        expect(res.status).toBe(200);
        expect(res.body.title).toBeDefined();
    });

    it("You must restart the playlist", async () => {
        const res = await request(app).post("/playlist/reset");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Playlist reiniciada");
    });

    it("should return paginated list of movies", async () => {
        const response = await request(app)
            .get("/movies/popularity")
            .query({ page: 2, limit: 5 });

        expect(response.status).toBe(200);
        expect(response.body.movies.length).toBe(5);
        expect(response.body.currentPage).toBe(2);
    });
    it("should return paginated list of movies by year", async () => {
        const response = await request(app)
            .get("/movies/year")
            .query({ page: 1, limit: 5 });

        expect(response.status).toBe(200);
        expect(response.body.movies.length).toBe(5); // Asegúrate de que se devuelvan 5 películas
        expect(response.body.currentPage).toBe(1); // Página 1
        expect(response.body.totalPages).toBeGreaterThan(1); // Al menos una página más
    });

});