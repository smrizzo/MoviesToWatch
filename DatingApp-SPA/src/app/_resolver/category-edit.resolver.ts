import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { MovieCategory } from '../_models/movieCategory';
import { CategoryService } from '../_services/category.service';

@Injectable()
export class CategoryEditResolver implements Resolve<MovieCategory> {
  constructor(private categoryService: CategoryService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieCategory> {
    return this.categoryService.getCategory(this.authService.decodedToken.nameid, route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem with retrieving your data');
        this.router.navigate(['/categories']);
        return of(null);
      })
    );
  }

}
