import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMemberPostComponent } from './detail-member-post.component';

describe('DetailMemberPostComponent', () => {
  let component: DetailMemberPostComponent;
  let fixture: ComponentFixture<DetailMemberPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMemberPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMemberPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
