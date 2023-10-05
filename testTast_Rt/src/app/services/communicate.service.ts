import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IPeople} from "../models/PeopleModels";

@Injectable()

export class CommunicateService {

  public stream$ : Subject<IPeople>;

  constructor() {
    this.stream$ = new Subject<IPeople>()
  }

  public changeData(data : IPeople) {
    this.stream$.next(data);
  }

}
