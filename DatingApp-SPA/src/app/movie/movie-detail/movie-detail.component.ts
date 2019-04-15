import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

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
              private embedService: EmbedVideoService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movie = data.movie;
    });
    this.currentRate = 3.14;
    console.log('movie trailer' + this.movie.trailer_url);
    this.iframeHtml = this.embedService.embed(this.movie.trailer_url, {
      attr: { width: 700, height: 349 }
    });
    // let url = this.movie.trailer_url;
    // url = url.replace('watch?v=', 'embed/');
    // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  hasHomePage(): boolean {
    return this.movie.homepage == null ? false : true;
  }

  hasTrailer(): boolean {
    return this.movie.trailer_url == null ? false : true;
  }

  setRating(rate: number): void {
    this.currentRate = rate;
    this.rateChanged();
  }

  rateChanged() {
    this.changedRating = true;
  }
}
