import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePeopleDiseasesComponent } from './table-people-diseases.component';

describe('TablePeopleDiseasesComponent', () => {
  let component: TablePeopleDiseasesComponent;
  let fixture: ComponentFixture<TablePeopleDiseasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePeopleDiseasesComponent]
    });
    fixture = TestBed.createComponent(TablePeopleDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
