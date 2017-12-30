import { PostDTO } from './../model/PostDTO';
import { PostsPage } from './../model/PostsPage';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { AuthenticationService } from '../auth/authentication.service';


@Injectable()
export class PostsApi {

  protected basePath = 'http://localhost:8081';
  public defaultHeaders: Headers = new Headers();
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
   * Posts from User
   * Returns all posts from defined User.
   * @param userId Unique identifier of a User;
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsAuthorUserIdGetUsingGET(userId: number,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/author/${userId}'
      .replace('${' + 'userId' + '}', String(userId));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1PostsAuthorUserIdGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  private createPagingParams(page: number, size: number) {
    let queryParameters = new HttpParams();
    if (page !== undefined) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (size !== undefined) {
      queryParameters = queryParameters.set('size', <any>size);
    }
    return queryParameters;
  }

  /**
   * Posts from User and Status
   * Returns all posts from defined User and Status.
   * @param userId Unique identifier of a User;
   * @param status Post Status Id
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsAuthorUserIdStatusGetUsingGET(userId: number, status: string,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/author/${userId}/${status}'
      .replace('${' + 'userId' + '}', String(userId))
      .replace('${' + 'status' + '}', String(status));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1PostsAuthorUserIdStatusGetUsingGET.');
    }
    // verify required parameter 'status' is not null or undefined
    if (status === null || status === undefined) {
      throw new Error('Required parameter status was null or undefined when calling apiV1PostsAuthorUserIdStatusGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * Posts from Category
   * Returns all posts from defined Category.
   * @param categoryId Unique identifier of a Category;
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsCategoryCategoryIdGetUsingGET(categoryId: number,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/category/${categoryId}'
      .replace('${' + 'categoryId' + '}', String(categoryId));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'categoryId' is not null or undefined
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1PostsCategoryCategoryIdGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * Posts from Category and Status
   * Returns all posts from defined Category and Status.
   * @param categoryId Unique identifier of a Category;
   * @param status Post Status Id
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsCategoryCategoryIdStatusGetUsingGET(categoryId: number, status: string,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/category/${categoryId}/${status}'
      .replace('${' + 'categoryId' + '}', String(categoryId))
      .replace('${' + 'status' + '}', String(status));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'categoryId' is not null or undefined
    if (categoryId === null || categoryId === undefined) {
      throw new Error('Required parameter categoryId was null or undefined when calling apiV1PostsCategoryCategoryIdStatusGetUsingGET.');
    }
    // verify required parameter 'status' is not null or undefined
    if (status === null || status === undefined) {
      throw new Error('Required parameter status was null or undefined when calling apiV1PostsCategoryCategoryIdStatusGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * All posts
   * Returns all posts (paginated).
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsGetUsingGET(page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts';
    const queryParameters = this.createPagingParams(page, size);
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * Delete Post
   * Deletes a Post with defined Id.
   * @param postId Unique identifier of a Post;
   */
  public apiV1PostsPostIdDeleteUsingDELETE(postId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/api/v1/posts/${postId}'
      .replace('${' + 'postId' + '}', String(postId));

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'postId' is not null or undefined
    if (postId === null || postId === undefined) {
      throw new Error('Required parameter postId was null or undefined when calling apiV1PostsPostIdDeleteUsingDELETE.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(path, requestOptions);
  }

  /**
   * Get Post
   * Fetches Post with defined Id.
   * @param postId Unique identifier of a Post;
   */
  public apiV1PostsPostIdGetUsingGET(postId: number, extraHttpRequestParams?: any): Observable<PostDTO> {
    const path = this.basePath + '/api/v1/posts/${postId}'
      .replace('${' + 'postId' + '}', String(postId));

    // verify required parameter 'postId' is not null or undefined
    if (postId === null || postId === undefined) {
      throw new Error('Required parameter postId was null or undefined when calling apiV1PostsPostIdGetUsingGET.');
    }
    return this.http.get<PostDTO>(path);
  }

  /**
   * Create Post
   * Creates new Post entry.
   * @param postEdit postEdit
   */
  public apiV1PostsPostUsingPOST(postEdit: models.PostDTO, extraHttpRequestParams?: any): Observable<PostDTO> {
    const path = this.basePath + '/api/v1/posts';

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'postEdit' is not null or undefined
    if (postEdit === null || postEdit === undefined) {
      throw new Error('Required parameter postEdit was null or undefined when calling apiV1PostsPostUsingPOST.');
    }
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<PostDTO>(path, postEdit, {headers: headers,
      withCredentials: this.configuration.withCredentials});
  }

  /**
   * Update Post
   * Updated a Post entry.
   * @param postEdit postEdit
   */
  public apiV1PostsPutUsingPUT(postEdit: models.PostDTO, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/api/v1/posts';

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'postEdit' is not null or undefined
    if (postEdit === null || postEdit === undefined) {
      throw new Error('Required parameter postEdit was null or undefined when calling apiV1PostsPutUsingPUT.');
    }
    headers = headers.append('Content-Type', 'application/json');

    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };

    return this.http.put(path, postEdit, requestOptions);
  }

  /**
   * Rewind Post
   * Restores previous Post entry.
   * @param postId Unique identifier of a Post;
   */
  public apiV1PostsRewindPostIdPutUsingPUT(postId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/api/v1/posts/rewind/${postId}'
      .replace('${' + 'postId' + '}', String(postId));

    const headers = new HttpHeaders();
    // verify required parameter 'postId' is not null or undefined
    if (postId === null || postId === undefined) {
      throw new Error('Required parameter postId was null or undefined when calling apiV1PostsRewindPostIdPutUsingPUT.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };

    return this.http.put(path, requestOptions);
  }

  /**
   * Posts with status
   * Returns all posts with defined status.
   * @param status Post Status Id
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsStatusStatusGetUsingGET(status: string,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/status/${status}'
      .replace('${' + 'status' + '}', String(status));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'status' is not null or undefined
    if (status === null || status === undefined) {
      throw new Error('Required parameter status was null or undefined when calling apiV1PostsStatusStatusGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * Posts from Tag
   * Returns all posts from defined Tag.
   * @param tagId Unique identifier of a Tag;
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsTagTagIdGetUsingGET(tagId: number,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/tag/${tagId}'
      .replace('${' + 'tagId' + '}', String(tagId));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1PostsTagTagIdGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }

  /**
   * Posts from Tag and Status
   * Returns all posts from defined Tag and Status.
   * @param tagId Unique identifier of a Tag;
   * @param status Post Status Id
   * @param page Page number from that on entities are returned.
   * @param size Entities per page.
   */
  public apiV1PostsTagTagIdStatusGetUsingGET(tagId: number, status: string,
  page?: number, size?: number, extraHttpRequestParams?: any): Observable<PostsPage> {
    const path = this.basePath + '/api/v1/posts/tag/${tagId}/${status}'
      .replace('${' + 'tagId' + '}', String(tagId))
      .replace('${' + 'status' + '}', String(status));

    const queryParameters = this.createPagingParams(page, size);
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1PostsTagTagIdStatusGetUsingGET.');
    }
    // verify required parameter 'status' is not null or undefined
    if (status === null || status === undefined) {
      throw new Error('Required parameter status was null or undefined when calling apiV1PostsTagTagIdStatusGetUsingGET.');
    }
    return this.http.get<PostsPage>(path, {params: queryParameters});
  }
}
