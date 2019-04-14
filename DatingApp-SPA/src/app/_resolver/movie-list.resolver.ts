import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieCategory } from '../_models/movieCategory';
import { CategoryService } from '../_services/category.service';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie';


// This will allow us to get the data from a specific user by id parameter
@Injectable()
export class MovieListResolver implements Resolve<Movie[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private authService: AuthService, private movieService: MovieService,
              private router: Router, private alertify: AlertifyService ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie[]> {
    // this.movieService.changeCurrentCategory(this.authService.decodedToken.nameid, route.params.id);
    return this.movieService.getMovies(this.authService.decodedToken.nameid, route.params.id, this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/categories']);
        return of(null);
      })
    );
  }
}
