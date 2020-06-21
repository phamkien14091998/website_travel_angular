import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInviteScheduleComponent } from './list-invite-schedule.component';

describe('ListInviteScheduleComponent', () => {
  let component: ListInviteScheduleComponent;
  let fixture: ComponentFixture<ListInviteScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInviteScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInviteScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
