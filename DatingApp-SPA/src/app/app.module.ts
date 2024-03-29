import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EmbedVideo } from 'ngx-embed-video';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ListResolver } from './_resolver/lists.resolver';
import { MovieService } from './_services/movie.service';
import { MovieSearchComponent } from './movie/movie-search/movie-search.component';
import { MovieCardComponent } from './movie/movie-card/movie-card.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryService } from './_services/category.service';
import { CategoryCardComponent } from './categories/category-card/category-card.component';
import { CategoryListResolver } from './_resolver/category-list.resolver';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { PhotoAddComponent } from './categories/photo-add/photo-add.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieListResolver } from './_resolver/movie-list.resolver';
import { MovieDbCardComponent } from './movie/movie-db-card/movie-db-card.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieDetailResolver } from './_resolver/movie-detail.resolver';
import { CategoryEditResolver } from './_resolver/category-edit.resolver';



export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      TimeAgoPipe,
      MovieSearchComponent,
      MovieCardComponent,
      CategoryListComponent,
      CategoryCardComponent,
      CategoryEditComponent,
      CategoryDetailComponent,
      CategoryFormComponent,
      PhotoAddComponent,
      MovieListComponent,
      MovieDbCardComponent,
      MovieDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxGalleryModule,
      NgbModule,
      ReactiveFormsModule,
      EmbedVideo.forRoot(),
      ButtonsModule.forRoot(),
      FileUploadModule,
      PaginationModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
        }
     })
  ],
  providers: [
     AuthService,
     ErrorInterceptorProvider,
     AlertifyService,
     AuthGuard,
     UserService,
     MemberDetailResolver,
     MemberListResolver,
     MemberEditResolver,
     PreventUnsavedChanges,
     ListResolver,
     MovieService,
     CategoryService,
     CategoryListResolver,
     MovieListResolver,
     MovieDetailResolver,
     CategoryEditResolver
  ],
  bootstrap: [
     AppComponent
  ]
})
export class AppModule { }
