import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListResolver } from './_resolver/lists.resolver';
import { MovieSearchComponent } from './movie/movie-search/movie-search.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryListResolver } from './_resolver/category-list.resolver';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieListResolver } from './_resolver/movie-list.resolver';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieDetailResolver } from './_resolver/movie-detail.resolver';


// Using AuthGuard to protect routes so cannot enter directly in browser
// will first need to be logged into app
// resolve allows us to get data to the component before it loads that way the data is there already
export const appRoutes: Routes = [
   { path: '', component: HomeComponent},
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path: 'categories', component: CategoryListComponent,
          resolve: {categories: CategoryListResolver}},
        { path: 'movies/:id', component: MovieListComponent,
          resolve: { movies: MovieListResolver }},
        { path: 'movie/detail/:id', component: MovieDetailComponent,
          resolve: { movie: MovieDetailResolver}},
        { path: 'movies', component: MovieSearchComponent},
        { path: 'categories/:id', component: CategoryDetailComponent },
        { path: 'category/form', component: CategoryFormComponent }
      ]
   },
   { path: '**', redirectTo: '', pathMatch: 'full'}
];

// { path: 'members', component: MemberListComponent,
//           resolve: {users: MemberListResolver}},
//         { path: 'members/:id', component: MemberDetailComponent,
//           resolve: {user: MemberDetailResolver}},
//         { path: 'member/edit', component: MemberEditComponent,
//           resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
//         { path: 'messages', component: MessagesComponent},
//         { path: 'lists', component: ListsComponent, resolve: {users: ListResolver}},
