import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPostComponent } from './member-post.component';

describe('MemberPostComponent', () => {
  let component: MemberPostComponent;
  let fixture: ComponentFixture<MemberPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
