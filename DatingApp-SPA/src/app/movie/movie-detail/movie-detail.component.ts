import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  currentRate: number;
  changedRating = false;
  safeSrc: SafeResourceUrl;
  iframeHtml: any;
  // ctrl = new FormControl(null, Validators.required);

  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer,
              private embedService: EmbedVideoService, private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
    });
    this.currentRate = 3.14;
    this.iframeHtml = this.embedService.embed(this.movie.trailer_url, {
      attr: { width: 700, height: 349 }
    });
  }

  hasHomePage(): boolean {
    return this.movie.homepage == null ? false : true;
  }

  hasTrailer(): boolean {
    return this.movie.trailer_url == null ? false : true;
  }

  rateMovie(id: number): void {
    this.movieService.updateMovie(this.authService.decodedToken.nameid, id, this.movie).subscribe(next => {
      this.alertify.success('Saved Changes Successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  setRating(rate: number): void {
    this.movie.rating = rate;
    this.rateChanged();
  }

  rateChanged(): void {
    this.changedRating = true;
  }
}
