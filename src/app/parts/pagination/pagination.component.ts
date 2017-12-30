import { getTestBed } from '@angular/core/testing';
import { PostsPage } from './../../service/model/PostsPage';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input('page') page: PostsPage;
  @Input('currentPage') currentPage: number;
  @Input('path') path: string;
  pages = [];

  private DEFAULT_PAGES_RANGE = 5;
  private DISABLED = 'disabled';
  private ACTIVE = 'active';
  previousClass: string;
  nextClass: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pages = [];
    this.updatePaging();
  }

  private updatePaging() {
    let end = Math.max(this.DEFAULT_PAGES_RANGE, this.currentPage + 2);
    end = Math.min(end, this.page.totalPages);
    const start = Math.max(1, (end - 4));

    for (let pageCount = start; pageCount <= end; pageCount++) {
      this.pages.push(pageCount);
    }
  }

  getType() {
    if (this.path === undefined) {
      return '/';
    } else {
      return '/' + this.path + '/';
    }
  }

  isCurrentPage(page: number) {
    return page === this.currentPage;
  }
}
