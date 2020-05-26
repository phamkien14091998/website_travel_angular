import { Component, OnInit } from '@angular/core';

import { ProductService } from './shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataInsert: any = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.callFunctionPayment();
  }

  callFunctionPayment() {
    this.productService.callFunctionPayment().subscribe(
      (data) => {
        this.dataInsert = data;
        console.log(this.dataInsert);
      }, err => { console.log(err) }
    );
  }

}
