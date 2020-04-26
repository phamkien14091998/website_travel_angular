import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberPostComponent } from './update-member-post.component';

describe('UpdateMemberPostComponent', () => {
  let component: UpdateMemberPostComponent;
  let fixture: ComponentFixture<UpdateMemberPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMemberPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemberPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
