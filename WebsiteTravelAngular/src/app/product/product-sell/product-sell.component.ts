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

  dataProductPage1: any = [];
  dataProductPage2: any = [];
  dataProductPage3: any = [];
  dataProductPage4: any = [];

  dataProductPage1Array: any = [];
  dataProductPage2Array: any = [];
  dataProductPage3Array: any = [];
  dataProductPage4Array: any = [];

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

        // for tất cả array
        for (let i = 0; i < this.dataProduct.length; i++) {
          if (i < 4) { // kiểm tra xem nếu i<4 thì lấy ra 4 tk đó , sau đó thêm nó vô mảng mới
            this.dataProductPage1 = this.dataProduct[i];
            this.dataProductPage1Array.push(this.dataProductPage1);
          } else if (i >= 4 && i < 8) {
            this.dataProductPage2 = this.dataProduct[i];
            this.dataProductPage2Array.push(this.dataProductPage2);
          }
          else if (i >= 8 && i < 12) {
            this.dataProductPage3 = this.dataProduct[i];
            this.dataProductPage3Array.push(this.dataProductPage3);
          }
          else if (i >= 12 && i < 16) {
            this.dataProductPage4 = this.dataProduct[i];
            this.dataProductPage4Array.push(this.dataProductPage4);
          }
        }

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