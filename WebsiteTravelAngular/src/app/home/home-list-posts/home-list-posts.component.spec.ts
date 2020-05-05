import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListPostsComponent } from './home-list-posts.component';

describe('HomeListPostsComponent', () => {
  let component: HomeListPostsComponent;
  let fixture: ComponentFixture<HomeListPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
