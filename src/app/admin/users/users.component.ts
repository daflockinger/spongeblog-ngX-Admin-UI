import { BlogApi } from '../../service';
import { DatePipe } from '@angular/common';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { UserEditDTO } from './../../service/model/UserEditDTO';
import { FormUtilsService } from './../../service/utils/form-utils.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { UsersApi } from './../../service/api/UsersApi';
import { Component, OnInit, Inject, OnChanges, SimpleChanges, Input, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersApi, FormUtilsService, DatePipe]
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users: Array<UserEditDTO>;
  toaster = new EventEmitter<string|MaterializeAction>();


  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(FormUtilsService) private formUtils: FormUtilsService,
    private datePipe: DatePipe,
    private userApi: UsersApi) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userSelection: '',
      user: this.formBuilder.group({
        email: ['', Validators.email],
        login: ['', Validators.required],
        nickName: ['', Validators.required],
        password: ['', Validators.required],
        registered: [''],
        roles: this.formBuilder.array(this.createRoles()),
        userId: [''],
      })
    });
    this.loadUsers();
  }

  private loadUsers() {
    this.userApi.apiV1UsersGetUsingGET().subscribe((users: Array<UserEditDTO>) => {
      this.users = users;
    });
  }

  private createRoles() {
    return _.values(UserEditDTO.RolesEnum).map(role =>
      this.formBuilder.group({ roleName: role, roleValue: false }));
  }

  loadUser() {
    const selectedUser = this.userForm.value.userSelection;
    if (selectedUser !== 'null') {
      this.userApi.apiV1UsersUserIdGetUsingGET(selectedUser).subscribe((user: UserEditDTO) => {
        this.updateUserValues(user);
      });
    } else {
      this.updateUserValues({});
    }
  }

  updateUserValues(user: UserEditDTO) {
    this.userForm.controls.user.patchValue({
        email: user.email,
        login: user.login,
        nickName: user.nickName,
        password: user.password,
        registered: user.registered,
        roles: this.applyRoles(user.roles),
        userId: user.userId,
    });
  }

  applyRoles(roles: Array<UserEditDTO.RolesEnum>) {
    return this.createRoles()
      .map(roleGroup => roleGroup.value)
      .map(role => {
        role.roleValue = _.includes(roles, role.roleName);
        return role;
      });
  }

  get roles(): FormArray {
    return this.userForm.controls.user.get('roles') as FormArray;
  }

  userControl(name: string) {
    return this.userForm.controls.user.get(name);
  }

  isStoredUser() {
    return _.isNumber(this.getUserData().userId);
  }

  formatDate(weirdDate: any) {
    if (!_.isEmpty(weirdDate)) {
      return this.datePipe.transform(new Date(weirdDate), 'dd/MM/yyyy');
    } else {
      return ' ';
    }
  }

  public isNotEmpty(controlName: string) {
    return !_.isEmpty(this.userForm.controls.user.get(controlName).value);
  }
  public statusClass(controlName: string) {
    return this.formUtils.statusClass(this.userForm.controls.user.get(controlName));
  }

  public insertUser() {
    this.userApi.apiV1UsersPostUsingPOST(this.getUserData())
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['User created!', 2000]});
          this.loadUsers();
        });
  }
  public updateUser() {
    this.userApi.apiV1UsersPutUsingPUT(this.getUserData())
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['User updated!', 2000]});
          this.loadUsers();
        });
  }

  getUserData() {
    const userData = this.userForm.value.user;
    const user: UserEditDTO = {
       email: userData.email,
       login: userData.login,
       nickName: userData.nickName,
       password: userData.password,
       registered: this.prepareDateIfNotThere(userData.registered),
       roles: this.mapRoles(userData.roles),
       userId: userData.userId,
    };
    return user;
  }

  private prepareDateIfNotThere(date: any) {
    if (!_.isEmpty(date)) {
      return date;
    } else {
      return new Date().toISOString();
    }
  }

  private mapRoles(rolesArray: any) {
    return rolesArray.filter(role => role.roleValue)
                     .map(role => role.roleName);
  }

  public removeUser() {
    this.userApi.apiV1UsersUserIdDeleteUsingDELETE(this.getUserData().userId)
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['User deleted!', 2000]});
          this.loadUsers();
        });
  }
}
