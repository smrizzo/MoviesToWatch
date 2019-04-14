import { Component, OnInit, Input } from '@angular/core';
import { MovieDb } from 'src/app/_models/movieDb';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { MovieService } from 'src/app/_services/movie.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-movie-db-card',
  templateUrl: './movie-db-card.component.html',
  styleUrls: ['./movie-db-card.component.css']
})
export class MovieDbCardComponent implements OnInit {
  @Input() movie: MovieDb;
  category: MovieCategory;
  constructor(private movieService: MovieService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.movieService.currentCategory.subscribe(data => {
      this.category = data;
    });
    console.log(this.movie);
  }

  addMovie(movieId: number): void {
    console.log('Movie Id' + movieId);
    console.log('category Id' + this.category.id);
    this.movieService.addMovie(this.authService.decodedToken.nameid, this.category.id, movieId)
      .subscribe(data => {
      this.alertify.success(`Added ${this.movie.title} successfully`);
    }, error => {
      this.alertify.error(error);
    });
  }
}
