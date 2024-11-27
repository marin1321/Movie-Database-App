import { Movie } from "../Movie";

export class MovieFactory {
    static createMovie(data: any): Movie {
        const avgRating = this.calculateAverageRating(data.ratings);
        const durationMinutes = this.convertDurationToMinutes(data.duration);

        return new Movie(
            data.title,
            data.year,
            data.genres,
            avgRating,
            data.viewerCount,
            data.storyline,
            data.actors,
            durationMinutes,
            data.releaseDate,
            data.contentRating,
            data.posterImage
        );
    }

    private static calculateAverageRating(ratings: number[]): number {
        const total = ratings.reduce((sum, rating) => sum + rating, 0);
        return parseFloat((total / ratings.length).toFixed(2));
    }

    private static convertDurationToMinutes(duration: string): number {
        const match = duration.match(/PT(\d+)M/);
        return match ? parseInt(match[1], 10) : 0; // Si no coincide, devuelve 0.
    }
}
