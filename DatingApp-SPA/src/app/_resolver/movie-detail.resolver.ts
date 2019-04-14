import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { MovieService } from '../_services/movie.service';
import { AuthService } from '../_services/auth.service';

// This will allow us to get the data from a specific user by id parameter
@Injectable()
export class MovieDetailResolver implements Resolve<Movie> {
  constructor(private movieService: MovieService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie> {
    return this.movieService.getMovie( this.authService.decodedToken.nameid, route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/categories']);
        return of(null);
      })
    );
  }
}
