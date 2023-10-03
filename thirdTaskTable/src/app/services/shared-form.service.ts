import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SharedFormService {

  constructor(private fb: FormBuilder) { }

  public sharedForm(): FormGroup {
    const fg = this.fb.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      patronymic : [''],
      age : ['', [Validators.required]],
      insuranceNumber : ['', [Validators.required]],
      codeDiseases : ['', [Validators.required]],
      diseasesDetail : ['', [Validators.required]]
    })

    return fg;
  }


}
