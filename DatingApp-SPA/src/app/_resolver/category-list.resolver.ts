import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieCategory } from '../_models/movieCategory';
import { CategoryService } from '../_services/category.service';
import { AuthService } from '../_services/auth.service';


// This will allow us to get the data from a specific user by id parameter
@Injectable()
export class CategoryListResolver implements Resolve<MovieCategory[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private authService: AuthService, private categoryService: CategoryService,
              private router: Router, private alertify: AlertifyService ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieCategory[]> {

    return this.categoryService.getCategories(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
