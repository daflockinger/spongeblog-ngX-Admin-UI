import { TagDTO } from './../model/TagDTO';
import { AuthenticationService } from './../auth/authentication.service';
/**
 * SpongeblogSP API
 * Spongeblog blogging API
 *
 * */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class TagsApi {

  protected basePath = 'http://localhost:8081';
  private tagsPath = this.basePath + '/api/v1/tags';
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
   * Returns all Tags.
   * @summary All Tags
   */
  public apiV1TagsGetUsingGET(extraHttpRequestParams?: any): Observable<Array<TagDTO>> {
    return this.http.get<Array<TagDTO>>(this.tagsPath);
  }

  /**
   * Creates new Tag entry.
   * @summary Create Tag
   * @param tagEdit tagEdit
   */
  public apiV1TagsPostUsingPOST(tagEdit: models.TagDTO, extraHttpRequestParams?: any): Observable<TagDTO> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'tagEdit' is not null or undefined
    if (tagEdit === null || tagEdit === undefined) {
      throw new Error('Required parameter tagEdit was null or undefined when calling apiV1TagsPostUsingPOST.');
    }
    headers = headers.set('Content-Type', 'application/json');
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials
    };
    return this.http.post(this.tagsPath, tagEdit, requestOptions);
  }

  /**
   * Updated a Tag entry.
   * @summary Update Tag
   * @param tagEdit tagEdit
   */
  public apiV1TagsPutUsingPUT(tagEdit: models.TagDTO, extraHttpRequestParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'tagEdit' is not null or undefined
    if (tagEdit === null || tagEdit === undefined) {
      throw new Error('Required parameter tagEdit was null or undefined when calling apiV1TagsPutUsingPUT.');
    }
    headers = headers.set('Content-Type', 'application/json');
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(this.tagsPath, tagEdit, requestOptions);
  }

  /**
   * Restores previous Tag entry.
   * @summary Rewind Tag
   * @param tagId Unique identifier of a Tag;
   */
  public apiV1TagsRewindTagIdPutUsingPUT(tagId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.tagsPath + '/rewind/' + String(tagId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1TagsRewindTagIdPutUsingPUT.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.put(path, null, requestOptions);
  }

  /**
   * Deletes a Tag with defined Id.
   * @summary Delete Tag
   * @param tagId Unique identifier of a Tag;
   */
  public apiV1TagsTagIdDeleteUsingDELETE(tagId: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.tagsPath + '/' + String(tagId);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.auth.getToken());
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1TagsTagIdDeleteUsingDELETE.');
    }
    const requestOptions: any = {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      responseType: 'text'
    };
    return this.http.delete(path, requestOptions);
  }

  /**
   * Fetches Tag with defined Id.
   * @summary Get Tag
   * @param tagId Unique identifier of a Tag;
   */
  public apiV1TagsTagIdGetUsingGET(tagId: number, extraHttpRequestParams?: any): Observable<TagDTO> {
    const path = this.tagsPath + '/api/v1/tags/' + String(tagId);
    // verify required parameter 'tagId' is not null or undefined
    if (tagId === null || tagId === undefined) {
      throw new Error('Required parameter tagId was null or undefined when calling apiV1TagsTagIdGetUsingGET.');
    }
    return this.http.get<TagDTO>(path);
  }
}
