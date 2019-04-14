import { Component, OnInit, Input } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { CategoryService } from 'src/app/_services/category.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Movie } from 'src/app/_models/movie';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  category: MovieCategory;
  movies: Movie[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private alertify: AlertifyService) {}

  ngOnInit() {
    this.movieService.currentCategory.subscribe(data => {
      this.category = data;
    });

    this.route.data.subscribe(data => {
      console.log(data);
      this.movies = data.movies.result;
      this.pagination = data.movies.pagination;
     });
  }

  deleteMovie(id: number) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    //   this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
    //     this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
    //     this.alertify.success('Photo has been deleted');
    //   }, error => {
    //     this.alertify.error('Failed to delete the photo');
    //   });
    // });
    this.alertify.confirm('Are you sure you want to delete this Movie?', () => {
      this.movieService.deleteMovie(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.pagination.currentPage = 1;
        this.loadMovies();
        this.alertify.success('Movie has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Movie');
      });
    });
  }

  haveMovies() {
    return this.movies.length > 0 ? true : false;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies(this.authService.decodedToken.nameid,
      this.category.id, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Movie[]>) => {
        this.movies = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

}
