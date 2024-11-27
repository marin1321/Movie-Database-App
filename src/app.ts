import express from "express";
import { MovieController } from "./controllers/MovieController";
import { PlaylistController } from "./controllers/PlaylistController";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/movies/popularity", MovieController.getByPopularity);
app.get("/movies/year", MovieController.getByYear);
app.get("/movies/similar", MovieController.getSimilarMovies);

app.post("/playlist/popularity", PlaylistController.createPlaylistByPopularity);
app.post("/playlist/year", PlaylistController.createPlaylistByYear);
app.get("/playlist/current", PlaylistController.getCurrentMovie);
app.get("/playlist/next", PlaylistController.nextMovie);
app.get("/playlist/previous", PlaylistController.previousMovie);
app.post("/playlist/reset", PlaylistController.resetPlaylist);

export default app;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
