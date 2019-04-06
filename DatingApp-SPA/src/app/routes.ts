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
        { path: 'members', component: MemberListComponent,
          resolve: {users: MemberListResolver}},
        { path: 'members/:id', component: MemberDetailComponent,
          resolve: {user: MemberDetailResolver}},
        { path: 'member/edit', component: MemberEditComponent,
          resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        { path: 'messages', component: MessagesComponent},
        { path: 'lists', component: ListsComponent, resolve: {users: ListResolver}},
        { path: 'movies', component: MovieSearchComponent}
      ]
   },
   { path: '**', redirectTo: '', pathMatch: 'full'}
];
