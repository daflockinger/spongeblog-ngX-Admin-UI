import { BlogDTO } from './service/model/BlogDTO';
import { BlogApi } from './service/api/BlogApi';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Component } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BlogApi]
})
export class AppComponent {
  title = 'SpongeBlog';

  constructor (private activatedRoute: ActivatedRoute, private blogApi: BlogApi) {
    blogApi.apiV1BlogGetUsingGET().subscribe((blog: BlogDTO) => {
      this.title = blog.name;
    });
  }
}
