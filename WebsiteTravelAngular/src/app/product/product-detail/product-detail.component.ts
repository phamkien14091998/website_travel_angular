import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../shared/product.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  data_detailProduct: any = {};
  data_portfolio: any = [];
  selectedItem: any;
  totalOfCart: number = 0;
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getDetailProduct(params['product_id']);
      })
    this.getProductPortfolio();
  }
  getDetailProduct(product_id: string) {

    this.productService.getDetailProductById(
      product_id
    ).subscribe(
      (data) => {
        data.images = data.images.split('|')
        this.data_detailProduct = data
        console.log(this.data_detailProduct);

      }, err => { console.log(err) }
    );
  }

  addToCart(product_id) {
    this.productService.addToCart(
      product_id
    ).subscribe(
      (data) => {
        this.totalOfCart = data;
        this.router.navigateByUrl('/product');
        console.log(this.totalOfCart);
      },
      err => {
        this.toastr.error('Thất Bại ', 'Thêm giỏ hàng');
      }
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