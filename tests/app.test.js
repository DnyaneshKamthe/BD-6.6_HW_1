const { app } = require("../index")
const { getAllMovies, getMovieById } = require("../controllers/index")
const http = require('http')
const request = require('supertest')
const { isTypedArray } = require("util/types")
const { hasUncaughtExceptionCaptureCallback } = require("process")

jest.mock("../controllers", () =>({
    ...jest.requireActual("../controllers"),
    getAllMovies : jest.fn(),
    getMovieById : jest.fn()
}))

let server;
beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001, done)
})

afterAll((done)=>{
    server.close(done)
})

describe("Api testing", () => {
    it("should return list of movies ", async() => {
        let mockMovies =  [
            {
              'movieId': 1,
              'title': 'Inception',
              'genre': 'Sci-Fi',
              'director': 'Christopher Nolan'
            },
            {
              'movieId': 2,
              'title': 'The Shawshank Redemption',
              'genre': 'Drama',
              'director': 'Frank Darabont'
            },
            {
              'movieId': 3,
              'title': 'The Godfather',
              'genre': 'Crime',
              'director': 'Francis Ford Coppola'
            }
        ]
        getAllMovies.mockReturnValue(mockMovies);
        let result = await request(server).get("/movies");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockMovies);
        expect(getAllMovies).toHaveBeenCalled()
    })

    it("should return movie by id", async() => {
        let mockMovie = {
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
        }

        getMovieById.mockReturnValue(mockMovie);
        let result = await request(server).get("/movies/details/1");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockMovie);
        expect(getMovieById).toHaveBeenCalledWith(1)
    })
})