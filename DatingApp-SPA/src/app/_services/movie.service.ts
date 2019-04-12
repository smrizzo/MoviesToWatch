import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OmdbMovie } from '../_models/omdbMovie';
import { tap, map } from 'rxjs/operators';
import { MovieDb } from '../_models/movieDb';
import { PaginatedResult } from '../_models/pagination';
import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
movieDbBaseUrl = 'http://localhost:5000/api/search/movies';
baseUrl = 'http://localhost:5000/api/';
// omdbMovies: OmdbMovie[];
movieDb: MovieDb[];
currentCategoryId: number;
categoryId = new BehaviorSubject<number>(0);
constructor(private http: HttpClient) { }

changeCategoryId(categoryId: number) {
  // this.photoUrl.next(photoUrl);
  this.categoryId.next(categoryId);
}

getMovies(userId: number, categoryId: number, page?, itemsPerPage?, movieParams?, userParams?): Observable<PaginatedResult<Movie[]>> {
  const paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<Movie[]>();
  let params = new HttpParams();
  this.changeCategoryId(categoryId);

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
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

searchMovies(term: string): Observable<MovieDb[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<MovieDb[]>(`${this.movieDbBaseUrl}/s=${term}`);
}

// getMovie(): Observable<any> {
//   const url = 'https://api.themoviedb.org/3/search/movie?' +
//     'api_key=3650d864e76977abd467fdc82290d485&query=captain&include_adult=false';
//   // const url = 'http://www.omdbapi.com/?t=thor+3&apikey=948cea94';
//   // const url = 'http://www.omdbapi.com/?apikey=948cea94&t=legends+of+the+fall';
//   return this.http.get(url);
//  }

}
