import { Component, OnInit, Input } from '@angular/core';
import { OmdbMovie } from 'src/app/_models/omdbMovie';
import { MovieDb } from 'src/app/_models/movieDb';
import { Movie } from 'src/app/_models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
  }

  navigateToDetail() {
    this.movieService.changeMovieForDetail(this.movie);
    this.router.navigate(['/movie/detail', this.movie.id]);
  }


}
