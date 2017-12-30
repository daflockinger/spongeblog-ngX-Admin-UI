import { BlogDTO } from './../model/BlogDTO';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './../auth/authentication.service';
import { InjectionError } from '@angular/core/src/di/reflective_errors';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 */
@Injectable()
export class BlogApi {

  protected basePath = 'http://localhost:8081';
  private blogPath = this.basePath + '/api/v1/blog';
  public defaultHeaders: HttpHeaders = new HttpHeaders();
  public configuration: Configuration = new Configuration();

  constructor(protected http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string,
  @Optional() configuration: Configuration, @Inject(AuthenticationService) private auth: AuthenticationService) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
    }
  }

  /**
   * Delete Blog
   * Deletes existing Blog.
   */
  public apiV1BlogDeleteUsingDELETE(extraHttpRequestParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(this.blogPath, requestOptions);
  }

  /**
   * Returns the Blog entry.
   * @summary Get Blog
   */
  public apiV1BlogGetUsingGET(extraHttpRequestParams?: any): Observable<BlogDTO> {
    const requestOptions: any = {
      method: 'GET',
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<BlogDTO>(this.blogPath, requestOptions);
  }

  /**
   * Create Blog
   * Creates new Blog entry.
   * @param blogEdit blogEdit
   */
  public apiV1BlogPostUsingPOST(blogEdit: BlogDTO, extraHttpRequestParams?: any): Observable<BlogDTO> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'blogEdit' is not null or undefined
    if (blogEdit === null || blogEdit === undefined) {
      throw new Error('Required parameter blogEdit was null or undefined when calling apiV1BlogPostUsingPOST.');
    }
    headers = headers.set('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.post<BlogDTO>(this.blogPath, blogEdit, requestOptions);
  }

  /**
   * Update Blog
   * Updated a Blog entry.
   * @param blogEdit blogEdit
   */
  public apiV1BlogPutUsingPUT(blogEdit: models.BlogDTO, extraHttpRequestParams?: any): Observable<any> {
   let headers = new HttpHeaders();
   headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'blogEdit' is not null or undefined
    if (blogEdit === null || blogEdit === undefined) {
      throw new Error('Required parameter blogEdit was null or undefined when calling apiV1BlogPutUsingPUT.');
    }
    headers = headers.set('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put<BlogDTO>(this.blogPath, blogEdit, requestOptions);
  }

  /**
   * Rewind Blog
   * Restores previous Blog entry.
   */
  public apiV1BlogRewindPutUsingPUT(extraHttpRequestParams?: any): Observable<any> {
    const path = this.blogPath + '/rewind';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(path, '', requestOptions);
  }
}
