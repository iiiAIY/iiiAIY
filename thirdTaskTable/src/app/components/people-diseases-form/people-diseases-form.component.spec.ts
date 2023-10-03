import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDiseasesFormComponent } from './people-diseases-form.component';

describe('PeopleDiseasesFormComponent', () => {
  let component: PeopleDiseasesFormComponent;
  let fixture: ComponentFixture<PeopleDiseasesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleDiseasesFormComponent]
    });
    fixture = TestBed.createComponent(PeopleDiseasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
