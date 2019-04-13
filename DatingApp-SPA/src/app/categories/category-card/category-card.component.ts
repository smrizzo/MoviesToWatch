import { Component, OnInit, Input } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: MovieCategory;
  constructor(private route: Router) { }

  ngOnInit() {
  }

  navigateToMovies() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         category: this.category
      }
    };
    this.route.navigate([`/movies/${this.category.id}`], navigationExtras);
  }

}
