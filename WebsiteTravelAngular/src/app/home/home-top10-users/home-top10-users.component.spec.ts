import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTop10UsersComponent } from './home-top10-users.component';

describe('HomeTop10UsersComponent', () => {
  let component: HomeTop10UsersComponent;
  let fixture: ComponentFixture<HomeTop10UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTop10UsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTop10UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
