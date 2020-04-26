import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberPostComponent } from './create-member-post.component';

describe('CreateMemberPostComponent', () => {
  let component: CreateMemberPostComponent;
  let fixture: ComponentFixture<CreateMemberPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemberPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
