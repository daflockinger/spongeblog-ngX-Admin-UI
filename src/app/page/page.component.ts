import { CleanUrlUtilsService } from './../service/utils/clean-url-utils.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsApi } from './../service/api/PostsApi';
import { Component, OnInit } from '@angular/core';
import { PostDTO, PagesApi } from '../service/index';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [PagesApi, CleanUrlUtilsService, Title]
})
export class PageComponent implements OnInit {

  post: PostDTO;

  constructor(private pageApi: PagesApi, private route: ActivatedRoute,
    private utils: CleanUrlUtilsService, private titleService: Title) {}

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
    this.pageApi.apiV1PostsPageIdGetUsingGET(this.utils.parseId(params.get('id'))))
     .subscribe((post: PostDTO) => {
          this.post = post;
          this.titleService.setTitle(post.title);
        });
  }

}
