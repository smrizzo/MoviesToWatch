import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MovieCategory } from 'src/app/_models/movieCategory';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  category: MovieCategory;

  constructor(private categoryService: CategoryService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.category = data.category;
    });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.authService.decodedToken.nameid, this.category.id, this.category)
      .subscribe(next => {
        this.alertify.success('Movie details updated!');
        this.editForm.reset(this.category);
    }, error => {
      this.alertify.error(error);
    });
  }

}
