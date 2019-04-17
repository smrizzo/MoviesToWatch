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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
baseUrl = environment.apiUrl;
movieDbBaseUrl = this.baseUrl + 'search/movies';
movieDb: MovieDb[];
movieForDetail = new BehaviorSubject<Movie>(null);
currentCategory = new BehaviorSubject<MovieCategory>(null);
constructor(private http: HttpClient, private categeryService: CategoryService) { }

changeCurrentCategory(userId: number, categoryId: number) {
  this.categeryService.getCategory(userId, categoryId).subscribe(data => {
    this.currentCategory.next(data);
  });
}

changeMovieForDetail(movie: Movie) {
  this.movieForDetail.next(movie);
}

getMovies(userId: number, categoryId: number, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Movie[]>> {
  const paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<Movie[]>();
  let params = new HttpParams();
  this.changeCurrentCategory(userId, categoryId);

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
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
  return this.http.delete(`${this.baseUrl}users/${userId}/movies/c=${id}/m=${movieId}`);
}

}
