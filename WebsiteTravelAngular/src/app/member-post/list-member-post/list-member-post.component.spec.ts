import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberPostComponent } from './list-member-post.component';

describe('ListMemberPostComponent', () => {
  let component: ListMemberPostComponent;
  let fixture: ComponentFixture<ListMemberPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMemberPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMemberPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
