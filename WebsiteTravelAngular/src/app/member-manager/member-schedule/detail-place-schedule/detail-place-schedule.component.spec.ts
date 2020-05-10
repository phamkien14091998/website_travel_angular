import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlaceScheduleComponent } from './detail-place-schedule.component';

describe('DetailPlaceScheduleComponent', () => {
  let component: DetailPlaceScheduleComponent;
  let fixture: ComponentFixture<DetailPlaceScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPlaceScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlaceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
