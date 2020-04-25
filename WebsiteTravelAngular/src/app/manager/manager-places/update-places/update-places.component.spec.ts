import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlacesComponent } from './update-places.component';

describe('UpdatePlacesComponent', () => {
  let component: UpdatePlacesComponent;
  let fixture: ComponentFixture<UpdatePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
