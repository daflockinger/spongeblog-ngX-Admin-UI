import { TagDTO } from './../service/model/TagDTO';
import { TagDefinition } from '@angular/compiler';
import { CategoryDTO, UserInfoDTO } from '../service';
import { CleanUrlUtilsService } from './../service/utils/clean-url-utils.service';
import { utf8Encode } from '@angular/compiler/src/util';
import { PostsPage } from './../service/model/PostsPage';
import { PostDTO } from './../service/model/PostDTO';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogDTO } from './../service/model/BlogDTO';
import { BlogApi } from './../service/api/BlogApi';
import { PostPreviewDTO } from './../service/model/PostPreviewDTO';
import { PostsApi } from './../service/api/PostsApi';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostsApi, BlogApi, CleanUrlUtilsService, Title]
})
export class PostListComponent implements OnInit {
  page: PostsPage;
  blog: BlogDTO;
  currentPage: number;
  path: string;

  private DEFAULT_PAGE_NUMBER = 1;
  private DEFAULT_POSTS_PER_PAGE = 2;
  private DEFAULT_STATUS = 'PUBLIC';

  constructor(private postApi: PostsApi, private blogApi: BlogApi,
  private router: ActivatedRoute, private utils: CleanUrlUtilsService,
   private titleService: Title) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
    Observable.forkJoin(
      this.getPostsFor(params), this.blogApi.apiV1BlogGetUsingGET()).subscribe((postsAndBlog) => {
      this.page = postsAndBlog[0];
      this.blog = postsAndBlog[1];
      this.setTitle(params.get('id'), this.getCorrectPage(params.get('page')));
      });
    });
  }

  private getPostsFor(params: ParamMap) {
    const id = this.utils.parseId(params.get('id'));
    const type = params.get('type');
    const page = this.getCorrectPage(params.get('page'));
    this.currentPage = page + 1;
    this.createPath(type, params.get('id'));

    switch (type) {
      case CleanUrlUtilsService.CATEGORY:
        return this.postApi.apiV1PostsCategoryCategoryIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      case CleanUrlUtilsService.USER:
        return this.postApi.apiV1PostsAuthorUserIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      case CleanUrlUtilsService.TAG:
        return this.postApi.apiV1PostsTagTagIdStatusGetUsingGET(id,
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
      default:
        return this.postApi.apiV1PostsStatusStatusGetUsingGET(
            this.DEFAULT_STATUS, page, this.DEFAULT_POSTS_PER_PAGE);
    }
  }

  private getCorrectPage(page: string) {
    return this.saveToNumber(page, this.DEFAULT_PAGE_NUMBER) - 1;
  }

  private setTitle(idString: string, page: number) {
    let title: string = this.utils.parseName(idString);
    if (_.isEmpty(title)) {
      title = this.blog.settings.title;
    }
    this.blog.settings.title = title;

    let titleWithPagination: string = title;
    if (page !== null) {
      titleWithPagination += ' - page ' + (page + 1);
    }
    this.titleService.setTitle(titleWithPagination);
  }

  private createPath(type: string, id: any) {
    if (type != null) {
      this.path = type + '/' + id;
    }
  }

  private saveToNumber(param: string, defaultValue: number) {
    const number = parseInt(param, 10);
    return (Number.isNaN(number)) ? defaultValue : number;
  }

  createPostLink(post: PostPreviewDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.POST, post.title, post.postId);
  }
  createUserLink(post: PostPreviewDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.USER, post.author.nickName, post.author.userId);
  }
  createTagLink(tag: TagDTO) {
    return this.utils.cleanLink(CleanUrlUtilsService.TAG, tag.name, tag.tagId);
  }
}
