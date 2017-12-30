import { FormUtilsService } from './../../service/utils/form-utils.service';
import { Response } from '@angular/http';
import { BlogApi } from './../../service/api/BlogApi';
import { BlogDTO } from './../../service/model/BlogDTO';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';
import * as _ from 'lodash';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [FormUtilsService]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  statuses = [];
  toaster = new EventEmitter<string|MaterializeAction>();

  constructor( @Inject(FormBuilder) formBuilder: FormBuilder,
    @Inject(BlogApi) private blogApi: BlogApi,
    @Inject(FormUtilsService) private formUtils: FormUtilsService) {
    this.settingsForm = this.createFormGroup(formBuilder);
    this.statuses = _.values(BlogDTO.StatusEnum);

    this.initValues();
  }

  private createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      settings: formBuilder.group({
        title: ['', Validators.required],
        subtitle: [''],
        bgImage: [''],
        copyright: [''],
        socialTwitter: [''],
        socialFacebook: [''],
        socialInstagram: [''],
        socialReddit: [''],
        socialGoogle: [''],
        socialYoutube: ['']
      })
    });
  }

  private initValues() {
    this.blogApi.apiV1BlogGetUsingGET().subscribe((blog: BlogDTO) => {
      this.settingsForm.patchValue({
        name: blog.name,
        status: blog.status,
        settings: blog.settings
      });
    });
  }

  public isNotEmpty(controlName: string) {
    return !_.isEmpty(this.settingsForm.get(controlName).value);
  }

  public statusClass(controlName: string) {
    return this.formUtils.statusClass(this.settingsForm.get(controlName));
  }

  public saveSettings() {
    this.blogApi.apiV1BlogPutUsingPUT(this.settingsForm.value)
    .subscribe(() => {
      this.toaster.emit({action: 'toast', params: ['Blog settings updated!', 2000]});
    },
    (error: any) => {
      console.log(error);
    });
  }

  get name() { return this.settingsForm.get('name'); }
  get blogStatus() { return this.settingsForm.get('status'); }
  get title() { return this.settingsForm.get('settings.title'); }

  ngOnInit() {
  }
}
