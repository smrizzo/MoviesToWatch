import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  currentRate: number;
  changedRating = false;
  // ctrl = new FormControl(null, Validators.required);

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
    });
    this.currentRate = 3.14;
  }

  hasHomePage(): boolean {
    return this.movie.homepage == null ? false : true;
  }

  setRating(rate: number): void {
    this.currentRate = rate;
    this.rateChanged();
  }

  rateChanged() {
    this.changedRating = true;
  }
}
