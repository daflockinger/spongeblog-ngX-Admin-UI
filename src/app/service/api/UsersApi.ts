import { UserInfoDTO } from './../model/UserInfoDTO';
import { UserEditDTO } from './../model/UserEditDTO';
import { AuthenticationService } from './../auth/authentication.service';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 *
 **/
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class UsersApi {

  protected basePath = 'http://localhost:8081';
  private userPath = this.basePath + '/api/v1/users';
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
   * Returns all Users.
   * @summary All Users
   */
  public apiV1UsersGetUsingGET(extraHttpRequestParams?: any): Observable<Array<UserEditDTO>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
    };
    return this.http.get<Array<UserEditDTO>>(this.userPath, requestOptions)
      .map((users: any) => users);
  }

  /**
   * Fetches User info with defined Id.
   * @summary Get User info
   * @param userId Unique identifier of a User;
   */
  public apiV1UsersInfoUserIdGetUsingGET(userId: number, extraHttpRequestParams?: any): Observable<UserInfoDTO> {
    const path = this.userPath + '/info/' + String(userId);
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1UsersInfoUserIdGetUsingGET.');
    }
    return this.http.get<UserInfoDTO>(path);
  }

  /**
   * Fetches User by login name.
   * @summary Get User by login name
   * @param userName Login name of the user.
   */
  public apiV1UsersNameUserNameGet(userName: string, extraHttpRequestParams?: any): Observable<UserInfoDTO> {
    const path = this.userPath + '/name/' + String(userName);
    // verify required parameter 'userName' is not null or undefined
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling apiV1UsersNameUserNameGet.');
    }
    return this.http.get<UserInfoDTO>(path);
  }

  /**
   * Creates new User entry.
   * @summary Create User
   * @param userEdit userEdit
   */
  public apiV1UsersPostUsingPOST(userEdit: models.UserEditDTO, extraHttpRequestParams?: any): Observable<UserEditDTO> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'userEdit' is not null or undefined
    if (userEdit === null || userEdit === undefined) {
      throw new Error('Required parameter userEdit was null or undefined when calling apiV1UsersPostUsingPOST.');
    }
    headers = headers.set('Content-Type', 'application/json');
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.post(this.userPath, userEdit, requestOptions);
  }

  /**
   * Updated a User entry.
   * @summary Update User
   * @param userEdit userEdit
   */
  public apiV1UsersPutUsingPUT(userEdit: models.UserEditDTO, extraHttpRequestParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'userEdit' is not null or undefined
    if (userEdit === null || userEdit === undefined) {
      throw new Error('Required parameter userEdit was null or undefined when calling apiV1UsersPutUsingPUT.');
    }
    headers = headers.set('Content-Type', 'application/json');
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(this.userPath, userEdit, requestOptions);
  }

  /**
   * Restores previous User entry.
   * @summary Rewind User
   * @param userId Unique identifier of a User;
   */
  public apiV1UsersRewindUserIdPutUsingPUT(userId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.userPath + '/rewind/' + String(userId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1UsersRewindUserIdPutUsingPUT.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(path, null, requestOptions);
  }

  /**
   * Deletes a User with defined Id.
   * @summary Delete User
   * @param userId Unique identifier of a User;
   */
  public apiV1UsersUserIdDeleteUsingDELETE(userId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.userPath + '/' + String(userId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1UsersUserIdDeleteUsingDELETE.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(path, requestOptions);
  }

  /**
   * Fetches User with defined Id.
   * @summary Get User
   * @param userId Unique identifier of a User;
   */
  public apiV1UsersUserIdGetUsingGET(userId: number, extraHttpRequestParams?: any): Observable<UserEditDTO> {
    const path = this.userPath + '/' + String(userId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling apiV1UsersUserIdGetUsingGET.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.get<UserEditDTO>(path, requestOptions);
  }
}
