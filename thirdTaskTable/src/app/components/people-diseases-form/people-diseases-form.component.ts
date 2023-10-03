import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InteractionOfComponentsService} from "../../services/interaction-of-components.service";
import {FormGroup} from "@angular/forms";
import {IPeopleDiseases} from "../../models/jsonDataModel";
import {SharedFormService} from "../../services/shared-form.service";
import {PeopleDiseasesService} from "../../services/people-diseases.service";

@Component({
  selector: 'app-people-diseases-form',
  templateUrl: './people-diseases-form.component.html',
  styleUrls: ['./people-diseases-form.component.scss']
})
export class PeopleDiseasesFormComponent implements OnInit, OnDestroy{

  @Output() addPeopleInfoEvent = new EventEmitter()

  mReactiveForm! : FormGroup;
  people! : IPeopleDiseases;

  constructor(private pDiseasesSer : PeopleDiseasesService, private sharedForm : SharedFormService,
              private commSer : InteractionOfComponentsService) {
  }

  submitForm() {
    this.commSer.changeData(this.mReactiveForm.value)
    this.addPeopleInfoEvent.emit(true);
  }

  ngOnInit() {
    this.mReactiveForm = this.sharedForm.sharedForm();
  }

  ngOnDestroy() {
  }
}
