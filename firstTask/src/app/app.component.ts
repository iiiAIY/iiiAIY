import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil, Subject, Subscription, Subscriber} from "rxjs";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  myReactiveForm: FormGroup;
  download : boolean = false;
  observer$ : Subject<void> = new Subject<void>();
  myForm : any = {};

  constructor(private lStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.initForm()
    this.myReactiveForm.get('longTrip')?.valueChanges.pipe(takeUntil(this.observer$)).subscribe((event) => {
      if (event) {
        this.myReactiveForm.controls["name"].setValidators([Validators.required, Validators.pattern(/[А-я]/)])
        this.myReactiveForm.controls["autor"].setValidators([Validators.required, Validators.pattern(/[А-я]/)])
        this.myReactiveForm.controls["executor"].setValidators(Validators.required)
        this.myReactiveForm.controls["dayOfTheWeek"].setValidators(Validators.required)
      } else {
        this.myReactiveForm.controls["name"].clearValidators()
        this.myReactiveForm.controls["autor"].clearValidators()
        this.myReactiveForm.controls["executor"].clearValidators()
        this.myReactiveForm.controls["dayOfTheWeek"].clearValidators()
      }
      this.myReactiveForm.controls["name"].updateValueAndValidity()
      this.myReactiveForm.controls["autor"].updateValueAndValidity()
      this.myReactiveForm.controls["executor"].updateValueAndValidity()
      this.myReactiveForm.controls["dayOfTheWeek"].updateValueAndValidity()
    })
  }

  private initForm () {
    this.myReactiveForm = new FormGroup({
      name: new FormControl(''),
      autor: new FormControl(''),
      executor : new FormControl(''),
      dayOfTheWeek : new FormControl(''),
      longTrip : new FormControl('')
    })
  }

  concateForm () {
    return this.myForm = Object.assign({}, this.myReactiveForm.value);
  }

  clearOrPatchValue (data : any) {
    this.myReactiveForm.get('name')?.setValue(data.name)
    this.myReactiveForm.get('autor')?.setValue(data.autor)
    this.myReactiveForm.get('executor')?.setValue(data.executor)
    this.myReactiveForm.get('dayOfTheWeek')?.setValue(data.dayOfTheWeek)
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

  // this.myReactiveForm.get(longTrip).valueChanges.subscribe
}
