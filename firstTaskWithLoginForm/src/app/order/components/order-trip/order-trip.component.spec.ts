import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTripComponent } from './order-trip.component';

describe('OrderTripComponent', () => {
  let component: OrderTripComponent;
  let fixture: ComponentFixture<OrderTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTripComponent]
    });
    fixture = TestBed.createComponent(OrderTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
