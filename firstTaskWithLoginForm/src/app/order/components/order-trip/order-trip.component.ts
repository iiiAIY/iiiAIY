import { Component } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-trip',
  templateUrl: './order-trip.component.html',
  styleUrls: ['./order-trip.component.scss']
})
export class OrderTripComponent {
  mReactiveForm!: FormGroup;
  download : boolean = false;
  observer$ : Subject<void> = new Subject<void>();
  myForm : any = {};

  constructor(private lStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.initForm()
    this.mReactiveForm.get('longTrip')?.valueChanges.pipe(takeUntil(this.observer$)).subscribe((event) => {
      if (event) {
        this.mReactiveForm.controls["name"].setValidators([Validators.required, Validators.pattern(/[А-я]/)])
        this.mReactiveForm.controls["autor"].setValidators([Validators.required, Validators.pattern(/[А-я]/)])
        this.mReactiveForm.controls["executor"].setValidators(Validators.required)
        this.mReactiveForm.controls["dayOfTheWeek"].setValidators(Validators.required)
      } else {
        this.mReactiveForm.controls["name"].clearValidators()
        this.mReactiveForm.controls["autor"].clearValidators()
        this.mReactiveForm.controls["executor"].clearValidators()
        this.mReactiveForm.controls["dayOfTheWeek"].clearValidators()
      }
      this.mReactiveForm.controls["name"].updateValueAndValidity()
      this.mReactiveForm.controls["autor"].updateValueAndValidity()
      this.mReactiveForm.controls["executor"].updateValueAndValidity()
      this.mReactiveForm.controls["dayOfTheWeek"].updateValueAndValidity()
    })
  }

  private initForm () {
    this.mReactiveForm = new FormGroup({
      name: new FormControl(''),
      autor: new FormControl(''),
      executor : new FormControl(''),
      dayOfTheWeek : new FormControl(''),
      longTrip : new FormControl('')
    })
  }

  concateForm () {
    return this.myForm = Object.assign({}, this.mReactiveForm.value);
  }

  clearOrPatchValue (data : any) {
    this.mReactiveForm.get('name')?.setValue(data.name)
    this.mReactiveForm.get('autor')?.setValue(data.autor)
    this.mReactiveForm.get('executor')?.setValue(data.executor)
    this.mReactiveForm.get('dayOfTheWeek')?.setValue(data.dayOfTheWeek)
    // this.myReactiveForm.patchValue({
    //   name : data.name,
    //   autor : data.autor,
    //   executor : data.executor,
    //   dayOfTheWeek : data.dayOfTheWeek,
    // })
  }

  saveForm() {
    this.lStorage.clear()
    this.lStorage.saveFormToLocalStorage('MyForm',this.concateForm())
    this.download = !this.download;
    this.clearOrPatchValue({
      name : null,
      autor : null,
      executor : null,
      dayOfTheWeek : null,
    })
  }

  downloadForm() {
    this.myForm = this.lStorage.getFormFromLocalStorage('MyForm')
    this.download = !this.download;
    this.clearOrPatchValue({
      name: this.myForm.name,
      autor: this.myForm.autor,
      executor: this.myForm.executor,
      dayOfTheWeek : this.myForm.dayOfTheWeek,
    })
  }

  ngOnDestroy() {
    this.observer$.complete()
    console.log('complete')
  }
}
