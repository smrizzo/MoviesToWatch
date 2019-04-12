import { Component, OnInit, Input } from '@angular/core';
import { MovieDb } from 'src/app/_models/movieDb';

@Component({
  selector: 'app-movie-db-card',
  templateUrl: './movie-db-card.component.html',
  styleUrls: ['./movie-db-card.component.css']
})
export class MovieDbCardComponent implements OnInit {
  @Input() movie: MovieDb;
  constructor() { }

  ngOnInit() {
  }

}
