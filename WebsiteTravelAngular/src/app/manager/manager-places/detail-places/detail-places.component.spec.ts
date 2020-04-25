import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlacesComponent } from './detail-places.component';

describe('DetailPlacesComponent', () => {
  let component: DetailPlacesComponent;
  let fixture: ComponentFixture<DetailPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
