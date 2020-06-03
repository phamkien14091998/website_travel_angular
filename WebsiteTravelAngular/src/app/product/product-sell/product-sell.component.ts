import { Component, OnInit } from '@angular/core';
import { ProductService } from "../shared/product.service";
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-sell',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {
  dataProduct: any = []; // list product new
  dataProductRevenue: any = []; // list product bán chạy
  data_portfolio: any = [];
  domain = environment.API_URL;
  selectedItem: any;
  searchProductForm: FormGroup;
  dataSearch: any = []
  search_product_name: any = ''

  // sản phẩm mới nhất
  dataProductPage1: any = [];
  dataProductPage2: any = [];
  dataProductPage3: any = [];
  dataProductPage4: any = [];

  dataProductPage1Array: any = [];
  dataProductPage2Array: any = [];
  dataProductPage3Array: any = [];
  dataProductPage4Array: any = [];

  // sản phẩm bán chạy nhất
  dataProductPage1_2: any = [];
  dataProductPage2_2: any = [];
  dataProductPage3_2: any = [];
  dataProductPage4_2: any = [];

  dataProductPage1Array_2: any = [];
  dataProductPage2Array_2: any = [];
  dataProductPage3Array_2: any = [];
  dataProductPage4Array_2: any = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListProductNew();
    this.getListProductRevenue();
    this.getProductPortfolio();


  }
  initForm() {
    this.searchProductForm = this.fb.group({
      product_name: ['']
    });
  }


  async getListProductNew() {
    await this.productService.getListProductNew().subscribe(
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
  // lấy ra  16 sản phẩm bán chạy nhất
  async getListProductRevenue() {
    await this.productService.getListProductRevenue().subscribe(
      (data) => {
        this.dataProductRevenue = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
        // for tất cả array
        for (let i = 0; i < this.dataProductRevenue.length; i++) {
          if (i < 4) { // kiểm tra xem nếu i<4 thì lấy ra 4 tk đó , sau đó thêm nó vô mảng mới
            this.dataProductPage1_2 = this.dataProductRevenue[i];
            this.dataProductPage1Array_2.push(this.dataProductPage1_2);
          } else if (i >= 4 && i < 8) {
            this.dataProductPage2_2 = this.dataProductRevenue[i];
            this.dataProductPage2Array_2.push(this.dataProductPage2_2);
          }
          else if (i >= 8 && i < 12) {
            this.dataProductPage3_2 = this.dataProductRevenue[i];
            this.dataProductPage3Array_2.push(this.dataProductPage3_2);
          }
          else if (i >= 12 && i < 16) {
            this.dataProductPage4_2 = this.dataProductRevenue[i];
            this.dataProductPage4Array_2.push(this.dataProductPage4_2);
          }
        }

      }, err => { console.log(err) }
    );
  }
  // lấy ra list thể loại
  async getProductPortfolio() {
    await this.productService.getProductPortfolio().subscribe(
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
  // tim san pham theo ten
  searchProduct() {
    this.search_product_name = this.searchProductForm.value.product_name
    this.productService.searchProductByName(
      this.searchProductForm.value
    ).subscribe(
      (data) => {
        this.dataSearch = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
        // console.log(this.dataSearch);
      }, err => { console.log(err) }
    );
  }

}