import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { ManagerProductService } from "../share/manager_product.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  data_listProduct: any = [];
  data_portfolio: any = [];
  domain = environment.API_URL;
  searchProductForm: FormGroup;

  //delete
  productDeleteIndex: number;

  constructor(
    private product_service: ManagerProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListProduct();
    this.getProductPortfolio();

  }
  initForm() {
    this.searchProductForm = this.fb.group({
      product_name: [''],
      portfolio_id: [''],
    });
  }

  // get all product
  getListProduct() {
    this.product_service.getListProduct().subscribe(
      (data) => {

        this.data_listProduct = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })

      }, err => { console.log(err) }
    );
  }
  getProductPortfolio() {
    this.product_service.getProductPortfolio().subscribe(
      (data) => {
        this.data_portfolio = data;
      }
    );
  }
  // search product theo product_name hoạc theo portfolio_id hoac k search thì lấy hết danh sách product
  searchProduct() {
    this.product_service.searchProductbyNameOrPortfolioId(
      this.searchProductForm.value

    ).subscribe(
      (data) => {

        this.data_listProduct = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
      }, err => { console.log(err) }
    );
  }

  //delete product
  deleteProduct(product_id: string) {
    this.product_service.deleteProduct(product_id).subscribe(
      () => {
        this.data_listProduct.splice(this.productDeleteIndex, 1);
        this.productDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa sản phẩm');

      }, () => {
        this.toastr.error('thất bại', 'Xóa sản phẩm');
      }
    )
  }


}
