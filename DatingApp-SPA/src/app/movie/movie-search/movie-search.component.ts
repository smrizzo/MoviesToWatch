import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/_services/movie.service';
import { OmdbMovie } from 'src/app/_models/omdbMovie';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MovieDb } from 'src/app/_models/movieDb';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  // omdbMovies: Observable<OmdbMovie[]>;
  movieDbMovies: Observable<MovieDb[]>;
  results: MovieDb[];
  queryField: FormControl = new FormControl();
  // omdbMovies: OmdbMovie[];
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService,
              private location: Location,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.movieDbMovies = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );

    this.queryField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) =>  this.movieService.searchMovies(query)),
    ).subscribe(result => this.results = result);

  }

  goBack(): void {
    this.location.back();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
