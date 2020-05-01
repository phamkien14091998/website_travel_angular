import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostsDetailComponent } from './home-posts-detail.component';

describe('HomePostsDetailComponent', () => {
  let component: HomePostsDetailComponent;
  let fixture: ComponentFixture<HomePostsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePostsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
