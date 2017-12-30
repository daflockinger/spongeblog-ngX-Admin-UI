import { CategoryDTO } from './../model/CategoryDTO';
import { AuthenticationService } from './../auth/authentication.service';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CategoriesApi {

  protected basePath = 'http://localhost:8081';
  private categoryPath = this.basePath + '/api/v1/categories';
  public defaultHeaders: Headers = new Headers();
  public configuration: Configuration = new Configuration();

  constructor(protected http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string,
  @Inject(AuthenticationService) private auth: AuthenticationService,
  @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
    }
  }

  /**
   * Deletes a Category with defined Id.
   * @summary Delete Category
   * @param categoryId Unique identifier of a Category;
   */
  public apiV1CategoriesCategoryIdDeleteUsingDELETE(categoryId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.categoryPath + '/' +  String(categoryId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'categoryId' is not null or undefined
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1CategoriesCategoryIdDeleteUsingDELETE.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(path, requestOptions);
  }

  /**
   * Fetches Category with defined Id.
   * @summary Get Category
   * @param categoryId Unique identifier of a Category;
   */
  public apiV1CategoriesCategoryIdGetUsingGET(categoryId: number, extraHttpRequestParams?: any): Observable<CategoryDTO> {
    const path = this.categoryPath + '/' +  String(categoryId);
    const headers = new HttpHeaders();
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1CategoriesCategoryIdGetUsingGET.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<CategoryDTO>(path, requestOptions);
  }

  /**
   * Returns all Categorys of defined parent Category.
   * @summary Categorys of Parent.
   * @param parentCategoryId Unique identifier of the parent Category;
   */
  public apiV1CategoriesChildrenParentCategoryIdGetUsingGET(
    parentCategoryId: number, extraHttpRequestParams?: any): Observable<Array<CategoryDTO>> {
    const path = this.categoryPath + '/children/' + String(parentCategoryId);
    if (parentCategoryId === null || parentCategoryId === undefined) {
      throw new Error('Required parameter parentCategoryId was null or' +
      'undefined when calling apiV1CategoriesChildrenParentCategoryIdGetUsingGET.');
    }
    return this.http.get<Array<CategoryDTO>>(path);
  }

  /**
   * Returns all Categorys.
   * @summary All Categorys
   */
  public apiV1CategoriesGetUsingGET(extraHttpRequestParams?: any): Observable<Array<CategoryDTO>> {
    return this.http.get(this.categoryPath);
  }

  /**
   * Creates new Category entry.
   * @summary Create Category
   * @param categoryEdit categoryEdit
   */
  public apiV1CategoriesPostUsingPOST(categoryEdit: models.CategoryDTO, extraHttpRequestParams?: any): Observable<CategoryDTO> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'categoryEdit' is not null or undefined
    if (categoryEdit === null || categoryEdit === undefined) {
      throw new Error('Required parameter categoryEdit was null or undefined when calling apiV1CategoriesPostUsingPOST.');
    }
    headers = headers.set('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.post(this.categoryPath, categoryEdit, requestOptions);
  }

  /**
   * Updated a Category entry.
   * @summary Update Category
   * @param categoryEdit categoryEdit
   */
  public apiV1CategoriesPutUsingPUT(categoryEdit: models.CategoryDTO, extraHttpRequestParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    if (categoryEdit === null || categoryEdit === undefined) {
      throw new Error('Required parameter categoryEdit was null or undefined when calling apiV1CategoriesPutUsingPUT.');
    }
    headers = headers.set('Content-Type', 'application/json');
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(this.categoryPath, categoryEdit, requestOptions);
  }

  /**
   * Restores previous Category entry.
   * @summary Rewind Category
   * @param categoryId Unique identifier of a Category;
   */
  public apiV1CategoriesRewindCategoryIdPutUsingPUT(categoryId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.categoryPath + '/rewind/' + String(categoryId);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'categoryId' is not null or undefined
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1CategoriesRewindCategoryIdPutUsingPUT.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(path, null, requestOptions);
  }

}
