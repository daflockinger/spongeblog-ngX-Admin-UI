import { HttpErrorResponse } from '@angular/common/http/public_api';
import { HttpResponse } from '@angular/common/http/src/response';
import { Error } from 'tslint/lib/error';
import { Response } from '@angular/http';
import { FormUtilsService } from './../../service/utils/form-utils.service';
import { CategoryDTO } from './../../service/model/CategoryDTO';
import { CategoriesApi } from '../../service';
import { Form, FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Inject, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';
import * as _ from 'lodash';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesApi, FormUtilsService]
})
export class CategoriesComponent implements /*OnChanges,*/ OnInit {
  categoriesForm: FormGroup;
  categories: Array<CategoryDTO>;
  toaster = new EventEmitter<string|MaterializeAction>();

  constructor( @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(FormUtilsService) private formUtils: FormUtilsService,
    private categoriesApi: CategoriesApi) { }

  ngOnInit() {
    this.initCategories();
  }

  private initCategories() {
    this.categoriesApi.apiV1CategoriesGetUsingGET()
      .subscribe((categories: CategoryDTO[]) => {
        categories.unshift({ name: '' });
        this.createForms(categories);
        this.categories = categories;
      });
  }

  private createForms(categories: Array<CategoryDTO>) {
    const categoryGroups = categories.map(category => this.formBuilder.group({
      categoryId: [category.categoryId],
      name: [category.name, Validators.required],
      parentId: [category.parentId],
      rank: [category.rank],
      pageId: [category.pageId]
    }));
    this.categoriesForm = this.formBuilder.group(
      { 'categoryGroups': this.formBuilder.array(categoryGroups) });
  }

  parentCategories(excludedCategoryId: number) {
    return this.categories
      .filter(category => category.parentId == null)
      .filter(category => category.categoryId != null)
      .filter(category => category.categoryId !== excludedCategoryId);
  }

  get categoryGroups(): FormArray {
    return this.categoriesForm.get('categoryGroups') as FormArray;
  }

  public statusClass(formControl: AbstractControl) {
    return this.formUtils.statusClass(formControl);
  }

  insertCategory(categoryGroup: FormGroup) {
    if (categoryGroup.valid) {
      this.categoriesApi.apiV1CategoriesPostUsingPOST(categoryGroup.value)
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['Category created!', 2000]});
          this.initCategories();
        });
    }
  }

  updateCategory(categoryGroup: FormGroup) {
    if (categoryGroup.valid) {
      this.categoriesApi.apiV1CategoriesPutUsingPUT(categoryGroup.value)
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['Category updated!', 2000]});
          this.initCategories();
        });
    }
  }

  deleteCategory(categoryId: number) {
    this.categoriesApi.apiV1CategoriesCategoryIdDeleteUsingDELETE(categoryId)
      .subscribe(() => {
        this.toaster.emit({action: 'toast', params: ['Category removed!', 2000]});
        this.initCategories();
      }, (error: any) => {
        this.toaster.emit({action: 'toast', params: [JSON.parse(error.error).message, 7000]});
      });
  }
}
