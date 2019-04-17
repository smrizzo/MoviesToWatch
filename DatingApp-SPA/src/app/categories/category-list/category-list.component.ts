import { Component, OnInit } from '@angular/core';
import { MovieCategory } from 'src/app/_models/movieCategory';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: MovieCategory[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};

  constructor(private categoryService: CategoryService , private authService: AuthService,
              private route: ActivatedRoute , private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pagination = data.categories.pagination;
      this.categories = data.categories.result;
     });
  }

  deleteCategory(id: number) {
    this.alertify.confirm('You will lose all movies saved under this category!! Are you sure you want to delete category??', () => {
      this.categoryService.deleteCategory(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.pagination.currentPage = 1;
        this.loadCategories();
        this.alertify.success('Category has been deleted');
      }, error => {
        this.alertify.error('Failed to delete category');
      });
    });
  }

  haveCategories() {
    return this.categories.length > 0 ? true : false;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage)
     .subscribe((res: PaginatedResult<MovieCategory[]>) => {
       this.categories = res.result;
       this.pagination = res.pagination;
    }, error => {
       this.alertify.error(error);
    });
  }

}
