import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OmdbMovie } from '../_models/omdbMovie';
import { tap, map } from 'rxjs/operators';
import { MovieDb } from '../_models/movieDb';
import { PaginatedResult } from '../_models/pagination';
import { Movie } from '../_models/movie';
import { MovieCategory } from '../_models/movieCategory';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
movieDbBaseUrl = 'http://localhost:5000/api/search/movies';
baseUrl = 'http://localhost:5000/api/';
// omdbMovies: OmdbMovie[];
movieDb: MovieDb[];
movieForDetail = new BehaviorSubject<Movie>(null);
currentCategory = new BehaviorSubject<MovieCategory>(null);
constructor(private http: HttpClient, private categeryService: CategoryService) { }

changeCurrentCategory(categoryId: number, userId: number) {
  this.categeryService.getCategory(categoryId, userId).subscribe(data => {
    this.currentCategory.next(data);
  });
}

changeMovieForDetail(movie: Movie) {
  this.movieForDetail.next(movie);
}

getMovies(userId: number, categoryId: number, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Movie[]>> {
  const paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<Movie[]>();
  let params = new HttpParams();
  this.changeCurrentCategory(categoryId, userId);

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    console.log('Found params orderBy: ' + userParams.orderBy);
    params = params.append('orderBy', userParams.orderBy);
  }

  return this.http.get<Movie[]>(this.baseUrl + 'users/' + userId + '/movies/category/' + categoryId, { observe: 'response', params })
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

addMovie(userId: number, categoryId: number, movieId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/movies/c=' + categoryId + '/m=' + movieId, {});
}

updateMovie(userId: number, movieId: number, movie: Movie) {
  return this.http.put(`${this.baseUrl}users/${userId}/movies/m=${movieId}`, movie);
}

searchMovies(term: string): Observable<MovieDb[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<MovieDb[]>(`${this.movieDbBaseUrl}/s=${term}`);
}

getMovie(userId: number, id: number): Observable<Movie> {
  return this.http.get<Movie>(`${this.baseUrl}users/${userId}/movies/m=${id}`);
}

deleteMovie(userId: number, movieId: number) {
  const { id } = this.currentCategory.getValue();
  // console.log('Deleted Movie: ' + movieId + ', for category Id: ' + id);
  return this.http.delete(`${this.baseUrl}users/${userId}/movies/c=${id}/m=${movieId}`);
}

// getMovie(): Observable<any> {
//   const url = 'https://api.themoviedb.org/3/search/movie?' +
//     'api_key=3650d864e76977abd467fdc82290d485&query=captain&include_adult=false';
//   // const url = 'http://www.omdbapi.com/?t=thor+3&apikey=948cea94';
//   // const url = 'http://www.omdbapi.com/?apikey=948cea94&t=legends+of+the+fall';
//   return this.http.get(url);
//  }

}
