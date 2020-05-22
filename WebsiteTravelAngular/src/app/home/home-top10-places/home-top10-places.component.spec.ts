import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTop10PlacesComponent } from './home-top10-places.component';

describe('HomeTop10PlacesComponent', () => {
  let component: HomeTop10PlacesComponent;
  let fixture: ComponentFixture<HomeTop10PlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTop10PlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTop10PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
