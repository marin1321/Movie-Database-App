export class Movie {
    constructor(
        public title: string,
        public year: number,
        public genres: string[],
        public ratings: number,
        public viewerCount: number,
        public storyline: string,
        public actors: string[],
        public duration: number,
        public releaseDate: string,
        public contentRating: string,
        public posterImage: string,
    ) {}
}
