import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormUtilsService {

  constructor() { }

  public statusClass(formControl: AbstractControl) {
    const status = formControl.status;
    const touchedOrDirty = formControl.touched || formControl.dirty;
    if (!touchedOrDirty) {
      return '';
    }
    if (status === 'INVALID' && touchedOrDirty) {
      return 'invalid';
    }
    if (status === 'VALID') {
      return 'valid';
    }
  }
}
