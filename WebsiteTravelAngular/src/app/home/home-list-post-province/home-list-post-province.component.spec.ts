import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListPostProvinceComponent } from './home-list-post-province.component';

describe('HomeListPostProvinceComponent', () => {
  let component: HomeListPostProvinceComponent;
  let fixture: ComponentFixture<HomeListPostProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListPostProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListPostProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
