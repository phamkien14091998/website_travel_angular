import { Component, OnInit } from '@angular/core';
import { ProductService } from "../shared/product.service";
import { environment } from "../../../environments/environment";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-sell',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {
  dataProduct: any = [];
  data_portfolio: any = [];
  domain = environment.API_URL;
  selectedItem: any;


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getListProductNew();
    this.getProductPortfolio();


  }

  getListProductNew() {
    this.productService.getListProductNew().subscribe(
      (data) => {

        this.dataProduct = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })

      }, err => { console.log(err) }
    );
  }
  getProductPortfolio() {
    this.productService.getProductPortfolio().subscribe(
      (data) => {
        this.data_portfolio = data;
      }
    );
  }
  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
  }

}
