import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {IPeopleDiseases} from "../models/jsonDataModel";

@Injectable({
  providedIn: 'root'
})
export class InteractionOfComponentsService {

  constructor() { }

  public data$ = new Subject<IPeopleDiseases>()

  public changeData(data: IPeopleDiseases) {
    this.data$.next(data);
  }

}
