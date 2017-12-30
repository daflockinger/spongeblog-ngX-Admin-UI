import { CleanUrlUtilsService } from './../../service/utils/clean-url-utils.service';
import { CategoryDTO } from './../../service/model/CategoryDTO';
import { CategoriesApi } from './../../service/api/CategoriesApi';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CategoriesApi, CleanUrlUtilsService]
})
export class NavbarComponent implements OnInit {
  categories: CategoryDTO[];
  updateMenu = new EventEmitter<string|MaterializeAction>();

  constructor(private categoryApi: CategoriesApi, private utils: CleanUrlUtilsService) {
    categoryApi.apiV1CategoriesGetUsingGET().subscribe((categories: CategoryDTO[]) => {
      this.categories = categories.filter(cat => cat.parentId == null);
    });
  }

  ngOnInit() {
  }

  public hasChildren(children: Array<any>): boolean {
    return !_.isEmpty(children);
  }

  public updateDropdown() {
    this.updateMenu.emit('dropdown');
  }

  createCategoryLink(category: CategoryDTO) {
    if (category.pageId === null) {
      return this.utils.cleanLink(CleanUrlUtilsService.CATEGORY, category.name, category.categoryId);
    } else {
      return this.utils.cleanLink(CleanUrlUtilsService.PAGE, category.name, category.categoryId);
    }
  }
}
