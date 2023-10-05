import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleService} from "../../services/people.service";
import {IPeople, IPeopleInfo} from "../../models/PeopleModels";
import {EMPTY, forkJoin, Subscription, take, takeUntil} from "rxjs";
import {CommunicateService} from "../../services/communicate.service";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  providers: []
})

export class MainTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['lastName', 'firstName', 'patronymic', 'company'];
  displayedColumnsWithExpand : string[];
  displayedColumnsRus : string[] = ['Фамилия', 'Имя', 'Отчество', 'Компания'];
  dataSource : IPeople[] = [];
  isEdit : boolean = false;
  isNew : boolean = false;
  subscriptionGetPeople : Subscription;
  subscriptionGetPeopleInfo : Subscription;

  constructor(private peopleServ: PeopleService, private communSer : CommunicateService) {

    this.displayedColumnsWithExpand = [...this.displayedColumns, 'expand']

    this.subscriptionGetPeople = new Subscription();
    this.subscriptionGetPeopleInfo = new Subscription();

    this.peopleServ.getPeoples().pipe(take(1)).subscribe(
      peoples => this.dataSource = peoples,
      err => {console.error(err.message); return EMPTY},
      () => console.log("Стрим закончен")
    )
  }

  ngOnInit(): void {
    this.communSer.stream$.subscribe(data => {
      this.updateTable(data);
    })
  }

  getPeople (id: number) {
    // debugger
    forkJoin([this.peopleServ.getPeople(id),this.peopleServ.getPeopleInfo(id)]).subscribe(
      result => {result[0].moreInfo = result[1]; this.communSer.changeData(result[0])},
      error => {alert(error.message); return EMPTY},
      () => {console.log("Запрос на сервер выполнен")}
    )
  }

  updateTable (data : IPeople) {
    this.dataSource = this.dataSource.map(ppldata => {
      if (ppldata.id === data.id) return data
      else return ppldata
    })
  }

  ngOnDestroy() {
    this.communSer.stream$.unsubscribe()
  }
}
