import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommunicateService} from "../../services/communicate.service";
import {IPeople, IPeopleInfo} from "../../models/PeopleModels";
import {SharedFormService} from "../../services/shared-form.service";
import {EMPTY, forkJoin, take} from "rxjs";
import {PeopleService} from "../../services/people.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [SharedFormService]
})

export class FormComponent implements OnInit, OnDestroy {

  @Input() newPeople : boolean = false;
  @Output() isUpdateTable = new EventEmitter()

  myRF : FormGroup;
  displayedMainForm : string[];
  displayedInfoForm : string[];
  displayedInfoEducForm : string[];
  displayedFormRus : string[];

  constructor(private communSer : CommunicateService, private sFormServ : SharedFormService,
              private peopleSer : PeopleService) {
    this.displayedMainForm = ['lastName', 'firstName', 'patronymic', 'company'];
    this.displayedInfoForm = ['age', 'post', 'tel', 'email'];
    this.displayedInfoEducForm = ['educationalInstitution', 'specialization', 'yearOfGraduation']
    this.displayedFormRus = ['Фамилия', 'Имя', 'Отчество', 'Компания', 'Возраст', 'Должность', 'Телефон', 'Email',
                             'Образ. учреждение', 'Специализация', 'Год окончания'];
    this.myRF = this.sFormServ.sharedFrom();
  }

  ngOnInit(): void {
    this.communSer.stream$.subscribe((data) => {
      this.patchForm(data);
    })
    if (this.newPeople) {
      this.myRF.get('moreInfo.age')?.valueChanges.subscribe(data => {
        // console.log(this.myRF)
        if (data >= 18) {
          (this.myRF.controls['moreInfo'] as FormGroup).controls['post'].setValidators(Validators.required);
          (this.myRF.controls['moreInfo'] as FormGroup).controls['post'].updateValueAndValidity();
        } else {
          (this.myRF.controls['moreInfo'] as FormGroup).controls['post'].clearValidators();
          (this.myRF.controls['moreInfo'] as FormGroup).controls['post'].updateValueAndValidity();
        }
      })
    }
  }

  patchForm(data : IPeople) {
    this.myRF.patchValue(data);

  }

  updateData () {
    const res = Object.entries(this.myRF.value)
      .map(entry => ({[entry[0]]: entry[1]}))
      .slice(0,5)
    const people = Object.assign({},...res);
    const resinfo = Object.entries(this.myRF.value)
      .slice(5,6)
      .map(entry => (entry[1]))
    const peopleInfo = Object.assign({}, ...resinfo)
    forkJoin([this.peopleSer.updatePeople(people),
                     this.peopleSer.updatePeopleInfo(peopleInfo)])
      .subscribe(
        data => {this.communSer.changeData(data[0]);
                      this.isUpdateTable.emit(false)},
        error => {console.error(error.message); return EMPTY},
        () => {console.log("Обновление прошло успешно")}
      )
  }

  postData () {
    const res = Object.entries(this.myRF.value)
      .map(entry => ({[entry[0]]: entry[1]}))
      .slice(0,5)
    const people = Object.assign({},...res);
    const resinfo = Object.entries(this.myRF.value)
      .slice(5,6)
      .map(entry => (entry[1]))
    const peopleInfo = Object.assign({}, ...resinfo)
    forkJoin([this.peopleSer.postPeople(people),
                     this.peopleSer.postPeopleInfo(peopleInfo)])
      .subscribe(
        data => this.isUpdateTable.emit(false),
        error => {console.error(error.message); return EMPTY},
        () => {console.log("Данные успешно добавлены")}
      )
  }

  ngOnDestroy() {
    // this.communSer.stream$.unsubscribe();
  }
}
