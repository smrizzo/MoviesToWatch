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
  category = new FormData();
  selectedFile: File;
  title: string;
  description: string;
  loading: boolean;


  constructor(private categoryService: CategoryService,
              private alertify: AlertifyService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loading = false;
  }

  addCategory() {
    if (this.title !== undefined && this.description !== undefined && this.selectedFile !== undefined ) {
      this.loading = true;
      this.category.append('Title', this.title);
      this.category.append('Description', this.description);
      this.category.append('File', this.selectedFile, this.selectedFile.name);
      this.categoryService.addCategory(this.authService.decodedToken.nameid, this.category).subscribe(next => {
        this.alertify.success('Category was created successfully');
        this.editForm.reset(this.category);
        this.loading = false;
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.alertify.warning('Please fill out all fields and choose photo');
    }

  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }
}
