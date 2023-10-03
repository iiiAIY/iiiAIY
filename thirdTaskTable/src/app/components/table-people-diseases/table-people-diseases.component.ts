import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IPeopleDiseases} from "../../models/jsonDataModel";
import {Subscription} from "rxjs";
import {PeopleDiseasesService} from "../../services/people-diseases.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormGroup} from "@angular/forms";
import {SharedFormService} from "../../services/shared-form.service";
import {InteractionOfComponentsService} from "../../services/interaction-of-components.service";

@Component({
  selector: 'app-table-people-diseases',
  templateUrl: './table-people-diseases.component.html',
  styleUrls: ['./table-people-diseases.component.scss'],
  animations: [
    trigger('Expand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TablePeopleDiseasesComponent implements OnInit {
  peoples! : IPeopleDiseases [];
  people!: IPeopleDiseases;
  peoplesSubscription! : Subscription;
  displayedColumns: string[] = ['lastName', 'firstName', 'patronymic', 'age', 'insuranceNumber', 'codeDiseases'];
  displayedColumnsRus : string[] = ['Фамилия', 'Имя', 'Отчество', 'Возраст', 'СНИЛС', 'Код диагноза'];
  dataSource!: IPeopleDiseases[];
  expandedElement!: IPeopleDiseases | null;
  expandedForm! : Boolean | null;
  displayedColumnsWithExpanded = [...this.displayedColumns, 'expand'];
  dataSource1! : MatTableDataSource<IPeopleDiseases>;
  resolv! : string;
  resolvFormRender : boolean = false;
  isEdit : boolean = false;
  myForm! : FormGroup;

  constructor(private pDiseasesSer : PeopleDiseasesService, private sharedForm : SharedFormService,
              private commSer : InteractionOfComponentsService) {
  }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatTable, {static: false}) myTable! : MatTable<any>


  logData (data: any, data2? : any, Edit? : boolean) {
    console.log(data, data2, Edit);
  }

  patchPeopleInfo (people : IPeopleDiseases) {
    this.myForm.patchValue(people);
  }

  updatePeopleInfo (people : IPeopleDiseases) {
    const ppl : IPeopleDiseases = {id: people.id, ...this.myForm.value};
    this.pDiseasesSer.updatePeople(ppl).subscribe((data) => {
      this.dataSource = this.dataSource.map((ppldata) => {
        if (ppldata.id === data.id) return data
        else return ppldata
      })
    });
  }

  postPeopleInfo (peopleData : IPeopleDiseases) {
    this.pDiseasesSer.postPeople(peopleData).subscribe((data) => {
      this.dataSource.push(data)
      this.myTable.renderRows();
    })
  }

  deletePeopleInfo (id : number) {
    console.log(typeof(id))
    this.pDiseasesSer.deletePeople(id).subscribe(() => {
      this.dataSource.find( (data) => {
        // debugger
        if (id === data?.id) {
          let index = this.dataSource.findIndex( (data) => data.id === id );
          this.dataSource.splice(index,1);
          this.myTable.renderRows();
        }
      } )
    })
  }

  ngOnInit() {
    this.peoplesSubscription = this.pDiseasesSer.getPeoples().subscribe( (peoples) => {
      this.peoples = peoples;
      this.dataSource = this.peoples;
      this.dataSource1 = new MatTableDataSource<IPeopleDiseases>(this.dataSource);
      this.dataSource1.paginator = this.paginator;
    } )
    this.myForm = this.sharedForm.sharedForm();
    this.commSer.data$.subscribe((peopleData) =>{
      this.postPeopleInfo(peopleData);
    })
  }
}
