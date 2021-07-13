import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWeekEventDialogComponent } from './new-week-event-dialog.component';

describe('NewWeekEventDialogComponent', () => {
  let component: NewWeekEventDialogComponent;
  let fixture: ComponentFixture<NewWeekEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWeekEventDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWeekEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
