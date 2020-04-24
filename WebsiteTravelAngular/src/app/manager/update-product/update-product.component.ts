import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ManagerProductService } from "../share/manager_product.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  data_detailProduct: any = {};
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private product_service: ManagerProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getDetailProduct(params['product_id']);
      })

  }
  getDetailProduct(product_id: string) {

    this.product_service.getDetailProductById(
      product_id
    ).subscribe(
      (data) => {

        data.images = data.images.split('|')
        this.data_detailProduct = data
        console.log(this.data_detailProduct);

      }, err => { console.log(err) }
    );

  }

}
