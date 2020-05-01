import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlacesDetailComponent } from './home-places-detail.component';

describe('HomePlacesDetailComponent', () => {
  let component: HomePlacesDetailComponent;
  let fixture: ComponentFixture<HomePlacesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePlacesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePlacesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
