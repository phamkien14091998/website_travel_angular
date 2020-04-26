import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchByportfolioComponent } from './product-search-byportfolio.component';

describe('ProductSearchByportfolioComponent', () => {
  let component: ProductSearchByportfolioComponent;
  let fixture: ComponentFixture<ProductSearchByportfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchByportfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchByportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
