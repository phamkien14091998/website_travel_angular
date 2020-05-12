import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CartService } from "./shared/cart.service";
import { environment } from "../../environments/environment";



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  dataProduct: any = [];
  dataTotal: any = 0;
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getAllProductForCart();
        this.getTotalCart();
        //this.deleteProductCart(params['product_id']);
      })
  }

  getAllProductForCart() {
    this.cartService.getAllProductForCart(
    ).subscribe(
      (data) => {
        //data.images = data.images.split('|');
        this.dataProduct = data;
        localStorage.setItem('a', this.dataProduct);
        console.log(this.dataProduct);
      }, err => { console.log(err) }
    );
  }

  deleteProductCart(product_id: any) {
    this.cartService.deleteProductCart(
      product_id
    ).subscribe(
      (data) => {
        console.log(data);
      }, err => { console.log(err) }
    );
  }

  getTotalCart() {
    this.cartService.getTotalCart(
    ).subscribe(
      (data) => {
        this.dataTotal = data;
        console.log(this.dataTotal);
      }, err => { console.log(err) }
    );
  }


} 