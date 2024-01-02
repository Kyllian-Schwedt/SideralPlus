import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentShowingComponent } from './content-showing.component';

describe('ContentShowingComponent', () => {
  let component: ContentShowingComponent;
  let fixture: ComponentFixture<ContentShowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentShowingComponent]
    });
    fixture = TestBed.createComponent(ContentShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
