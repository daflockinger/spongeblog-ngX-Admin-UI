import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { UserEditDTO } from './../../service/model/UserEditDTO';
import { FilterValue, PostUtilsService } from './../../service/utils/post-utils.service';
import { PostsApi } from './../../service/api/PostsApi';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { PostDTO, UsersApi, CategoriesApi, TagsApi, TagDTO, UserInfoDTO, CategoryDTO } from '../../service/index';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { MapOperator } from 'rxjs/operator/map';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  providers: [PostsApi, UsersApi, CategoriesApi, TagsApi, PostUtilsService]
})
export class PostEditorComponent implements OnInit {

  post: PostDTO;
  postEditForm: FormGroup;
  categories: Array<FilterValue>;
  tags: Array<FilterValue>;
  statuses: Array<FilterValue>;
  authors: Array<FilterValue>;
  toaster = new EventEmitter<string|MaterializeAction>();

  constructor( @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(PostsApi) private postApi: PostsApi,
    @Inject(UsersApi) private userApi: UsersApi,
    @Inject(CategoriesApi) private categoryApi: CategoriesApi,
    @Inject(TagsApi) private tagApi: TagsApi,
    @Inject(PostUtilsService) private postUtils: PostUtilsService,
    @Inject(AuthenticationService) private authService: AuthenticationService,
    private route: ActivatedRoute) {
    const filterValueMap = postUtils.createFilterValues(userApi, categoryApi, tagApi);
    this.createFilterValues(filterValueMap);

    this.route.paramMap.switchMap((params: ParamMap) =>
      Observable.forkJoin(this.postApi.apiV1PostsPostIdGetUsingGET(Number(params.get('id'))).catch(e => {
        return this.createEmptyNewPost(userApi);
      }),
        filterValueMap.get(PostUtilsService.TAG)))
      .subscribe(postsNtags => {
        this.post = postsNtags[0];
        this.createForm(postsNtags[1], postsNtags[0]);
      });

  }

  private createEmptyNewPost(userApi: UsersApi): Observable<PostDTO> {
    const userEmail: string = this.authService.getUserEmail();

    return userApi.apiV1UsersGetUsingGET()
      .map(users => {
        const user = _.find(users, userToFilter => userToFilter.email === userEmail);
        const post: PostDTO = {};
        post.author = this.mapUserInfo(user);
        post.category = {};
        post.tags = [];
        post.created = new Date();
        post.modified = new Date();
        post.status = PostDTO.StatusEnum.PUBLIC;

        return post;
      });
  }

  private mapUserInfo(user: UserEditDTO) {
    const author: UserInfoDTO = {};
    author.email = user.email;
    author.nickName = user.nickName;
    author.userId = user.userId;
    return author;
  }

  private createFilterValues(filterValueMap: Map<string, Observable<FilterValue[]>>) {
    filterValueMap.get(PostUtilsService.CATEGORY).subscribe(categories => {
      this.categories = categories;
      this.categories.push({'id': null, 'name': 'None (Bottom menu link)'});
    });
    filterValueMap.get(PostUtilsService.STATUS).subscribe(statuses => {
      this.statuses = statuses;
    });
    filterValueMap.get(PostUtilsService.TAG).subscribe(tags => {
      this.tags = tags;
    });
    filterValueMap.get(PostUtilsService.USER).subscribe(users => {
      this.authors = users;
    });
  }

  private createForm(tags: FilterValue[], post: PostDTO) {
    if (post.category === null) {
      post.category = {};
    }
    this.postEditForm = this.formBuilder.group({
      authorId: [post.author.userId],
      categoryid: [post.category.categoryId],
      content: [post.content],
      created: [post.created],
      status: [post.status],
      tags: this.formBuilder.array(this.createTags(tags, post.tags)),
      title: [post.title]
    });
  }

  private createTags(tagFilterValues: FilterValue[], tags: TagDTO[]) {
    return tagFilterValues.map(tag =>
      this.formBuilder.group({ name: tag.name, tagValue: this.isTagInList(tags, tag.name) }));
  }

  private isTagInList(tags: TagDTO[], tagName: string): boolean {
    return _.includes(tags.map(storedTag => storedTag.name), tagName);
  }

  ngOnInit() {
  }

  public savePost() {
    if (this.post.postId === undefined) {
      this.insertPost();
    } else {
      this.updatePost();
    }
  }

  private insertPost() {
    this.mapTags(this.postEditForm.value['tags']).subscribe(tags => {
      this.postApi.apiV1PostsPostUsingPOST(this.mapPost(tags)).subscribe(storedPost => {
        this.post.postId = storedPost.postId;
        this.toaster.emit({action: 'toast', params: ['Post saved!', 2000]});
      });
    });
  }

  private mapPost(tags: TagDTO[]): PostDTO {
    const post: PostDTO = {};
    post.modified = new Date();
    post.created = this.postEditForm.value['created'];
    post.status = this.postEditForm.value['status'];
    post.title = this.postEditForm.value['title'];
    post.content = this.postEditForm.value['content'];
    const author: UserInfoDTO = {};
    author.userId = Number(this.postEditForm.value['authorId']);
    post.author = author;
    const category: CategoryDTO = {};
    const categoryId = this.postEditForm.value['categoryid'];
    if (categoryId !== null) {
      category.categoryId = Number(categoryId);
      post.category = category;
    } else {
      post.category = null;
    }
    post.tags = tags;
    return post;
  }

  private mapTags(rolesArray: any): Observable<TagDTO[]> {
    return this.tagApi.apiV1TagsGetUsingGET()
      .map(tags => {
        return rolesArray.filter(tag => tag.tagValue)
          .map(tag => _.find(tags, loadedTag => loadedTag.name === tag.name));
      });
  }

  private updatePost() {
    this.mapTags(this.postEditForm.value['tags']).subscribe(tags => {
      const post: PostDTO = this.mapPost(tags);
      post.postId = this.post.postId;
      this.postApi.apiV1PostsPutUsingPUT(post).subscribe(storedPost => {
        this.toaster.emit({action: 'toast', params: ['Post saved!', 2000]});
      });
    });
  }
}
