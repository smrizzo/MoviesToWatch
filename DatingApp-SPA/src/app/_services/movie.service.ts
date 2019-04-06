import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OmdbMovie } from '../_models/omdbMovie';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
baseUrl = 'http://localhost:5000/api/search/movies/';
omdbMovies: OmdbMovie[];
constructor(private http: HttpClient) { }

searchMovies(term: string): Observable<OmdbMovie[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<OmdbMovie[]>(`${this.baseUrl}/s=${term}`);
}

// getMovie(): Observable<any> {
//   const url = 'https://api.themoviedb.org/3/search/movie?' +
//     'api_key=3650d864e76977abd467fdc82290d485&query=captain&include_adult=false';
//   // const url = 'http://www.omdbapi.com/?t=thor+3&apikey=948cea94';
//   // const url = 'http://www.omdbapi.com/?apikey=948cea94&t=legends+of+the+fall';
//   return this.http.get(url);
//  }

}
