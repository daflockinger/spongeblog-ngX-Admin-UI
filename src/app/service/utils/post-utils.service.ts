import { UserEditDTO } from './../model/UserEditDTO';
import { UsersApi } from './../api/UsersApi';
import { Injectable, Inject } from '@angular/core';
import { CategoriesApi, TagsApi, PostDTO, CategoryDTO, TagDTO } from '../index';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ucs2 } from 'punycode';

@Injectable()
export class PostUtilsService {
  public static readonly TAG = 'Tag';
  public static readonly NONE = 'None';
  public static readonly CATEGORY = 'Category';
  public static readonly USER = 'User';
  public static readonly STATUS = 'Status';

  constructor() { }

  public createFilterValues(userApi: UsersApi,
    categoryApi: CategoriesApi, tagApi: TagsApi): Map<string, Observable<FilterValue[]>> {
    const filterValueMap: Map<string, Observable<FilterValue[]>> = new Map<string, Observable<FilterValue[]>>();
    filterValueMap.set(PostUtilsService.NONE, Observable.of([]));
    filterValueMap.set(PostUtilsService.USER, userApi.apiV1UsersGetUsingGET().map(user => _.map(user, this.userToFilterValue)));
    filterValueMap.set(PostUtilsService.CATEGORY, categoryApi.apiV1CategoriesGetUsingGET()
      .map(category => _.map(category, this.categoryToFilterValue)));
    filterValueMap.set(PostUtilsService.TAG, tagApi.apiV1TagsGetUsingGET().map(tag => _.map(tag, this.tagToFilterValue)));
    filterValueMap.set(PostUtilsService.STATUS, Observable.of(
      _.map(_.values(PostDTO.StatusEnum), this.statusToFilterValue)));
    return filterValueMap;
  }

  private userToFilterValue(user: UserEditDTO) {
    return <FilterValue>{ id: user.userId.toString(), name: user.nickName };
  }
  private categoryToFilterValue(category: CategoryDTO) {
    return <FilterValue>{ id: category.categoryId.toString(), name: category.name };
  }
  private tagToFilterValue(tag: TagDTO) {
    return <FilterValue>{ id: tag.tagId.toString(), name: tag.name };
  }
  private statusToFilterValue(status: string) {
    return <FilterValue>{ id: status, name: status };
  }

}

export interface FilterValue {
  id?: string;
  name?: string;
}
