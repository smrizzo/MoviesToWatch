import { Component, OnInit, Input } from '@angular/core';
import { OmdbMovie } from 'src/app/_models/omdbMovie';
import { MovieDb } from 'src/app/_models/movieDb';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: MovieDb;
  constructor() { }

  ngOnInit() {
  }

}
