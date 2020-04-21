import { Component, OnInit } from '@angular/core';

import { ManagerProductService } from "../share/manager_product.service";
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  data_listProduct: any = [];
  constructor(private product_service: ManagerProductService) { }

  ngOnInit(): void {
    this.getListProduct();
  }

  getListProduct() {
    this.product_service.getListProduct().subscribe(
      (data) => {
        this.data_listProduct = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
        // console.log(this.data_listProduct);
        // this.data_listProduct = $data;
      },err=>{console.log(err)}
    );

  }

}
