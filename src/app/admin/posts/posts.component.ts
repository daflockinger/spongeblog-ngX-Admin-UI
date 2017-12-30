import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { FilterValue, PostUtilsService } from './../../service/utils/post-utils.service';
import { PostPreviewDTO } from './../../service/model/PostPreviewDTO';
import { PostDTO } from './../../service/model/PostDTO';
import { CategoryDTO } from './../../service/model/CategoryDTO';
import { TagsApi } from './../../service/api/TagsApi';
import { CategoriesApi, TagDTO, UserEditDTO, UsersApi } from '../../service';
import { FormUtilsService } from './../../service/utils/form-utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsApi } from './../../service/api/PostsApi';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostsApi, UsersApi, CategoriesApi, TagsApi, FormUtilsService, PostUtilsService],
})
export class PostsComponent implements OnInit {

  postFilterForm: FormGroup;
  filters: string[] = [];
  selectedFilterName: string;
  filterValues: FilterValue[] = [{ id: '1', name: 'Please choose filter' }];
  filterValueMap: Map<string, Observable<FilterValue[]>> = new Map<string, Observable<FilterValue[]>>();
  toaster = new EventEmitter<string|MaterializeAction>();

  currentPage = 0;
  postsPerPage = 1000;

  postApi: PostsApi;
  posts: PostPreviewDTO[];


  constructor( @Inject(FormBuilder) formBuilder: FormBuilder,
    @Inject(PostsApi) postApi: PostsApi,
    @Inject(UsersApi) private userApi: UsersApi,
    @Inject(CategoriesApi) private categoryApi: CategoriesApi,
    @Inject(TagsApi) private tagApi: TagsApi,
    @Inject(FormUtilsService) private formUtils: FormUtilsService,
    @Inject(PostUtilsService) private postUtilService: PostUtilsService) {
    this.postApi = postApi;
    this.filters.push(PostUtilsService.NONE, PostUtilsService.CATEGORY, PostUtilsService.USER,
      PostUtilsService.TAG, PostUtilsService.STATUS);
    this.initFilterValues(userApi, categoryApi, tagApi);

    this.postFilterForm = formBuilder.group({
      filter: ['None'],
      chosenFilterValue: ['']
    });
    this.initPosts();
    this.postFilterForm.controls.filter.valueChanges
      .subscribe(filter => this.updateFilterValues(filter));
  }

  public initFilterValues(userApi: UsersApi, categoryApi: CategoriesApi, tagApi: TagsApi) {
    this.filterValueMap = this.postUtilService.createFilterValues(this.userApi, this.categoryApi, this.tagApi);
  }


  updateFilterValues(filter: string) {
    this.selectedFilterName = filter;
    this.filterValueMap.get(filter).subscribe(values => {
      this.filterValues = values;
    });
  }

  private initPosts() {
    this.postApi.apiV1PostsGetUsingGET(this.currentPage, this.postsPerPage).subscribe(postPage => {
      this.posts = postPage.previewPosts;
    });
  }

  updatePosts() {
    const filterValue: string = this.getBestFilterValue();

    if (this.selectedFilterName === PostUtilsService.CATEGORY) {
      this.postApi.apiV1PostsCategoryCategoryIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === PostUtilsService.USER) {
      this.postApi.apiV1PostsAuthorUserIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === PostUtilsService.TAG) {
      this.postApi.apiV1PostsTagTagIdGetUsingGET(Number(filterValue),
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else if (this.selectedFilterName === PostUtilsService.STATUS) {
      this.postApi.apiV1PostsStatusStatusGetUsingGET(filterValue,
        this.currentPage, this.postsPerPage).subscribe(postPage => {
          this.posts = postPage.previewPosts;
        });
    } else {
      this.initPosts();
    }
  }

  private getBestFilterValue(): string {
    let filterValue: string = this.postFilterForm.value.chosenFilterValue;
    if (_.isEmpty(filterValue)) {
      filterValue = _.first(this.filterValues).id;
    }
    console.log('filtervalue ' + filterValue);
    return filterValue;
  }

  public removePost(postId: number) {
    this.postApi.apiV1PostsPostIdDeleteUsingDELETE(postId).subscribe(deleted => {
      this.toaster.emit({action: 'toast', params: ['Post removed!', 2000]});
      this.updatePosts();
    });
  }

  ngOnInit() {
  }
}
