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
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService,
              private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
  }

  navigateToDetail() {
    this.movieService.changeMovieForDetail(this.movie);
    this.router.navigate(['/movie/detail', this.movie.id]);
  }

  deleteMovie(id: number) {
    this.deletedMovie.emit(id);
  }


}
