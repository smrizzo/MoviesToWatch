import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: MovieCategory;
  @Output() deletedCategory = new EventEmitter<number>();

  constructor(private route: Router) { }

  ngOnInit() {
  }

  navigateToMovies() {
    this.route.navigate([`/movies/${this.category.id}`]);
  }

  deleteCategory(id: number) {
    console.log('category to be deleted: ' + id);
    this.deletedCategory.emit(id);
  }

}
