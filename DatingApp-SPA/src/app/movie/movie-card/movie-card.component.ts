import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OmdbMovie } from 'src/app/_models/omdbMovie';
import { MovieDb } from 'src/app/_models/movieDb';
import { Movie } from 'src/app/_models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  @Output() deletedMovie = new EventEmitter<number>();
  watchedMovie = false;
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService,
              private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    console.log('movies watch or not:' + this.movie.watched);
  }

  navigateToDetail() {
    this.movieService.changeMovieForDetail(this.movie);
    this.router.navigate(['/movie/detail', this.movie.id]);
  }

  setHaveWatched() {
    this.movie.watched = !this.movie.watched;
    console.log(this.movie.watched);
    this.movieService.updateMovie(this.authService.decodedToken.nameid, this.movie.id, this.movie).subscribe(next => {
      this.movie.watched === true ? this.alertify.message('Have watched ' + this.movie.title) :
        this.alertify.message('Have not watched: ' + this.movie.title);
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteMovie(id: number) {
    this.deletedMovie.emit(id);
  }


}
