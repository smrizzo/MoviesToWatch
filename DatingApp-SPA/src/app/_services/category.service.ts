import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieCategory } from '../_models/movieCategory';
import { PaginatedResult } from '../_models/pagination';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 baseUrl = environment.apiUrl;
 categoryId = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  changeCategoryId(categoryId: number) {
    // this.photoUrl.next(photoUrl);
    this.categoryId.next(categoryId);
  }

  getCategories(userId: number, page?, itemsPerPage?, categoryParams?, userParams?):
    Observable<PaginatedResult<MovieCategory[]>> {
    const paginatedResult: PaginatedResult<MovieCategory[]> = new PaginatedResult<MovieCategory[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MovieCategory[]>(this.baseUrl + 'users/' + userId + '/movies', { observe: 'response', params })
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

  getCategory(categoryId: number, userId: number): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(this.baseUrl + 'users/' + userId + '/movies/c=' + categoryId);
  }

  updateCategory(categoryId: number, userId: number, movieCategory: MovieCategory) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/movies/' + categoryId, movieCategory);
  }

  addCategory(userId: number, movieCategory: any) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/movies/addCategory', movieCategory);
  }

  deleteCategory(userId: number, categoryId: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/movies' + '/c=' + categoryId);
  }





}
