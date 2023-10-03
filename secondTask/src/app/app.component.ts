import {Component, OnInit} from '@angular/core';
import {batya, peoples} from "./Models/peopleModels";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  peoples = [
    {name : 'Иван', age : 50},
    {name : 'Сёмен', age: 65},
    {name : 'Степан', age: 32},
    {name : 'Генадий', age: 70},
    {name : 'Пётр', age: 68},
    {name : 'Алексей', age: 29},
  ]

  batyas : Array<batya> = [];
  oldBatyas : Array<batya> = [];
  resultArr : Object = {};

  myReacriveForm = new FormGroup({
    'name' : new FormControl('',[Validators.required, Validators.pattern(/[А-я]/)]),
    'age' : new FormControl('',[Validators.required, Validators.pattern("\\d{1,2}")]),
  })
  updateArrBatyas () {
    this.batyas = this.peoples.map( ppl => ({...ppl, isBatya: ppl.age> 55}))
  }

  submitForm () {
    this.peoples.push({name: this.myReacriveForm.get('name')?.value!, age: +this.myReacriveForm.get('age')?.value!})
    this.updateArrBatyas()
    this.myReacriveForm.reset()
  }
  ngOnInit() {
    this.updateArrBatyas()
    this.oldBatyas = this.batyas.filter(batya => batya.age > 65)
    this.resultArr = {arr1 : this.peoples, arr2: this.batyas, arr3: this.oldBatyas}
    console.log(this.batyas)
    console.log(this.oldBatyas)
    console.log(this.resultArr)
  }
}
