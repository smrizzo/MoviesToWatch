import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/_models/movie';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  category: any = {};
  photoUrl: string;
  title: string;
  description: string;


  constructor(private categoryService: CategoryService,
              private alertify: AlertifyService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  addCategory() {
    this.category.title = this.title;
    this.category.description = this.description;
    this.categoryService.addCategory(this.authService.decodedToken.nameid, this.category).subscribe(next => {
      this.alertify.success('Category was created successfully');
      this.editForm.reset(this.category);
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/categories']);
    });
  }

}
