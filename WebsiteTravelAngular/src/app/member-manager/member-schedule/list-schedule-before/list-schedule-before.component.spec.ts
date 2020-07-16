import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleBeforeComponent } from './list-schedule-before.component';

describe('ListScheduleBeforeComponent', () => {
  let component: ListScheduleBeforeComponent;
  let fixture: ComponentFixture<ListScheduleBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListScheduleBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
