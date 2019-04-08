import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   baseUrl = environment.apiUrl + 'auth/';
   jwtHelper = new JwtHelperService();
   decodedToken: any;
   currentUser: User;
   photoUrl = new BehaviorSubject<string>('../../assets/user.png');
   currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}
// login post request returns a token
login(model: any) {
   return this.http.post(this.baseUrl + 'login', model)
      .pipe(
         map((response: any) => {
            const user = response;
            if (user) {
               localStorage.setItem('token', user.token);
               localStorage.setItem('user', JSON.stringify(user.user));
               this.decodedToken = this.jwtHelper.decodeToken(user.token);
               this.currentUser = user.user;
               this.changeMemberPhoto(this.currentUser.photoUrl);
            }
         })
      );
}

register(user: User) {
   return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
   const token = localStorage.getItem('token');
   return !this.jwtHelper.isTokenExpired(token);
}

getMovie(): Observable<any> {
  const url = 'https://api.themoviedb.org/3/search/movie?' +
    'api_key=3650d864e76977abd467fdc82290d485&query=captain marvel';
  // const url = 'http://www.omdbapi.com/?t=thor+3&apikey=948cea94';
  // const url = 'http://www.omdbapi.com/?s=captain marvel&apikey=948cea94';

  // const url = 'http://www.omdbapi.com/?i=tt4154664&apikey=948cea94';
  // const url = 'http://www.omdbapi.com/?apikey=948cea94&type=movie&s=captain america';
  return this.http.get(url);
 }
}
