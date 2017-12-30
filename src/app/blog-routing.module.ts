import { PostEditorComponent } from './admin/post-editor/post-editor.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { LoginComponent } from './admin/login/login.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { UsersComponent } from './admin/users/users.component';
import { TagsComponent } from './admin/tags/tags.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { PostsComponent } from './admin/posts/posts.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { CleanUrlUtilsService } from './service/utils/clean-url-utils.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  {
    path: 'admin',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/posts',
    component: PostsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/posts/:id',
    component: PostEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/tags',
    component: TagsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: CleanUrlUtilsService.POST + '/:id',
    component: PostComponent,
  },
  {
    path: CleanUrlUtilsService.PAGE + '/:id',
    component: PageComponent,
  },
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: ':page',
    component: PostListComponent,
  },
  {
    path: ':type/:id',
    component: PostListComponent,
  },
  {
    path: ':type/:id/:page',
    component: PostListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [AuthGuardService]
})

export class BlogRoutingModule { }
