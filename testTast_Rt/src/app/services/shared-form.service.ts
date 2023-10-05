import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable()

export class SharedFormService {

  constructor() { }

  public sharedFrom () : FormGroup {
    const fg = new FormGroup({
      id: new FormControl(''),
      lastName : new FormControl(''),
      firstName : new FormControl(''),
      patronymic : new FormControl(''),
      company : new FormControl(''),
      moreInfo : new FormGroup({
        id : new FormControl(''),
        age : new FormControl(''),
        post : new FormControl(''),
        tel : new FormControl(''),
        email : new FormControl(''),
        education : new FormGroup({
          educationalInstitution : new FormControl(''),
          specialization : new FormControl(''),
          yearOfGraduation : new FormControl('')
        }),
        peopleId : new FormControl('')
      })
    }, {updateOn: "blur"})
    return fg;
  }
}
