import { Component, OnInit, Input } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: MovieCategory;

  constructor() { }

  ngOnInit() {
  }

}
