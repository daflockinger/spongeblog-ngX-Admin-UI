import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { TagsApi } from './../../service/api/TagsApi';
import { TagDTO } from './../../service/model/TagDTO';
import { TagDefinition } from '@angular/compiler';
import { FormUtilsService } from './../../service/utils/form-utils.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [FormUtilsService, TagsApi]
})
export class TagsComponent implements OnInit {
  tagForm: FormGroup;
  toaster = new EventEmitter<string|MaterializeAction>();


  constructor(@Inject(TagsApi) private tagApi: TagsApi,
          @Inject(FormBuilder) private formBuilder: FormBuilder,
          @Inject(FormUtilsService) private formUtils: FormUtilsService) { }

  ngOnInit() {
    this.initTags();
  }

  initTags() {
    this.tagApi.apiV1TagsGetUsingGET().subscribe((tags: Array<TagDTO>) => {
      tags.unshift({name: ''});
      const tagGroups = tags.map(tag => this.formBuilder.group({
        name: [tag.name, Validators.required],
        tagId: [tag.tagId]
      }));
      this.tagForm = this.formBuilder.group({ tagGroups: this.formBuilder.array(tagGroups) });
    });
  }

  public statusClass(formControl: AbstractControl) {
    return this.formUtils.statusClass(formControl);
  }

  get tagGroups(): FormArray {
    return this.tagForm.get('tagGroups') as FormArray;
  }

  insertTag(tagGroup: FormGroup) {
    if (tagGroup.valid) {
      this.tagApi.apiV1TagsPostUsingPOST(tagGroup.value)
        .subscribe((response: Response) => {
          this.toaster.emit({action: 'toast', params: ['Category created!', 2000]});
          this.initTags();
        });
    }
  }

  updateTag(tagGroup: FormGroup) {
    if (tagGroup.valid) {
      this.tagApi.apiV1TagsPutUsingPUT(tagGroup.value)
        .subscribe(() => {
          this.toaster.emit({action: 'toast', params: ['Category updated!', 2000]});
          this.initTags();
        });
    }
  }

  deleteTag(tagId: number) {
    this.tagApi.apiV1TagsTagIdDeleteUsingDELETE(tagId)
      .subscribe(() => {
        this.toaster.emit({action: 'toast', params: ['Category removed!', 2000]});
        this.initTags();
      });
  }
}
