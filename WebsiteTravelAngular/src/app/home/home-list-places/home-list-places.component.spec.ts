import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListPlacesComponent } from './home-list-places.component';

describe('HomeListPlacesComponent', () => {
  let component: HomeListPlacesComponent;
  let fixture: ComponentFixture<HomeListPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
