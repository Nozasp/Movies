import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Movie} from "./model/movie";

@Injectable()
export class DataService {

  constructor(public http: HttpClient) {
  }

  fetchUsers(): Promise<User[]> {
    let url = ('http://10.31.1.30:8080/movies/api/users/');

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })

  }

  fetchFriends(user: User): Promise<User[]> {
    console.log(user.pseudo);
    let url = ('http://10.31.1.30:8080/movies/api/users/' + user.pseudo);

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as User[]
      })
  }

  fetchOMDBTypedMovie(extract: string): Promise<Movie> {
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&type=movie&t=' + extract)
      .toPromise()
      .then(data => {
        return data as Movie
      });

  }


  fetchMoviesOMDB(extract: string): Promise<Movie[]> {
/*    function mapper(movie: Movie) {
      return {
        Search: Movie[],
        totalResults: string,
        Response: string
    }
    }*/
    return this.http
      .get('http://www.omdbapi.com/?apikey=d424c139&s=' + extract)
      .toPromise()
      // .then(internetMovie => (internetMovie as any).map(mapper))
      .then(data => {
        return data as Movie[]
      });
  }

  fetchFavoriteMovies(user: User): Promise<Movie[]> {
    let url = ('http://10.31.1.30:8080/movies/api/fav_movies/' + user.id);

    return this.http
      .get(url)
      .toPromise()
      .then(data => {
        return data as Movie[];
      })
  }


  createFavMovie(movie: Movie) {
    let url = 'http://10.31.1.30:8080/movies/api/fav_movies';
    let dto = {
      imDbId: movie.imdbID,
      title: movie.Title,
      user: movie.user
    }
    return this.http.post(url, dto)
      .toPromise()
      .then(console.log);
  }


}
