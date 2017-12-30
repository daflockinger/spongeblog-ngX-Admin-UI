import { PostPreviewDTO } from './../../service/model/PostPreviewDTO';
import { PagesApi } from './../../service/api/PagesApi';
import { FilterValue, PostUtilsService } from './../../service/utils/post-utils.service';
import { BlogApi } from './../../service/api/BlogApi';
import { BlogDTO } from './../../service/model/BlogDTO';
import { Component, Input, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
import { CleanUrlUtilsService } from '../../service/utils/clean-url-utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [BlogApi, PagesApi, CleanUrlUtilsService]
})
export class FooterComponent implements OnInit {
  blog: BlogDTO;

  footerLinks: FilterValue[];

  constructor( @Inject(BlogApi) private blogApi: BlogApi,
    @Inject(PagesApi) private pageApi: PagesApi,
    @Inject(CleanUrlUtilsService) private utils: CleanUrlUtilsService) { }

  ngOnInit() {
    this.blogApi.apiV1BlogGetUsingGET().subscribe((blog: BlogDTO) => {
      this.blog = blog;
    });
    this.pageApi.apiV1PagesGetUsingGET(true)
      .map(postPage => postPage.previewPosts)
      .map(posts => _.map(posts, this.mapPostToLink))
      .subscribe(links => {
        this.footerLinks = links;
      });
  }

  private mapPostToLink(post: PostPreviewDTO): FilterValue {
    const link: FilterValue = {};
    link.id = post.postId.toString();
    link.name = post.title;
    return link;
  }

  public createFooterLink(link: FilterValue) {
    return this.utils.cleanLink(CleanUrlUtilsService.PAGE, link.name, Number(link.id));
  }
}
