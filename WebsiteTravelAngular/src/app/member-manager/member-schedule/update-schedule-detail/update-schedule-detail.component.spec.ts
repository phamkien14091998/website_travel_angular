import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleDetailComponent } from './update-schedule-detail.component';

describe('UpdateScheduleDetailComponent', () => {
  let component: UpdateScheduleDetailComponent;
  let fixture: ComponentFixture<UpdateScheduleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScheduleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
