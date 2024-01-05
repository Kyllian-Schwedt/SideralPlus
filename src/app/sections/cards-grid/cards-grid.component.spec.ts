import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsGridComponent } from './cards-grid.component';

describe('CardsGridComponent', () => {
  let component: CardsGridComponent;
  let fixture: ComponentFixture<CardsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsGridComponent]
    });
    fixture = TestBed.createComponent(CardsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
