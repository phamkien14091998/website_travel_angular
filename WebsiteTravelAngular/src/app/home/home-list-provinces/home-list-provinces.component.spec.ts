import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListProvincesComponent } from './home-list-provinces.component';

describe('HomeListProvincesComponent', () => {
  let component: HomeListProvincesComponent;
  let fixture: ComponentFixture<HomeListProvincesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListProvincesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
