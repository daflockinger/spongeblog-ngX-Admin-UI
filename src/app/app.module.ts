import { HttpModule } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from './service/auth/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { CleanUrlUtilsService } from './service/utils/clean-url-utils.service';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { LocalStorageModule } from 'angular-2-local-storage';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { FooterComponent } from './parts/footer/footer.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { TagsComponent } from './admin/tags/tags.component';
import { UsersComponent } from './admin/users/users.component';
import { PostsComponent } from './admin/posts/posts.component';
import { AdminNavbarComponent } from './admin/parts/admin-navbar/admin-navbar.component';
import { LoginComponent } from './admin/login/login.component';
import { PostEditorComponent } from './admin/post-editor/post-editor.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostComponent,
    FooterComponent,
    NavbarComponent,
    PaginationComponent,
    SettingsComponent,
    CategoriesComponent,
    TagsComponent,
    UsersComponent,
    PostsComponent,
    AdminNavbarComponent,
    LoginComponent,
    PostEditorComponent,
    PageComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    Angular2FontawesomeModule,
    HttpClientModule,
    HttpModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    LocalStorageModule.withConfig({
            prefix: 'spongeblog',
            storageType: 'localStorage'
        })
  ],
  providers: [AuthenticationService, JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
