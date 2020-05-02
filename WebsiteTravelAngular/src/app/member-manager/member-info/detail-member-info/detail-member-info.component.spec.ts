import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMemberInfoComponent } from './detail-member-info.component';

describe('DetailMemberInfoComponent', () => {
  let component: DetailMemberInfoComponent;
  let fixture: ComponentFixture<DetailMemberInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMemberInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
