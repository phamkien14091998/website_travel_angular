import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "./shared/cart.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  dataProduct: any = [];
  dataTotal: any = 0;
  domain = environment.API_URL;
  user: any = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getAllProductForCart();
        this.getTotalCart();
        //this.deleteProductCart(params['product_id']);
      })
    this.auth.user$.subscribe(user => this.user = user)
  }

  getAllProductForCart() {
    this.cartService.getAllProductForCart(
    ).subscribe(
      (data) => {
        if (data != null) {
          this.dataProduct = data.map
            (p => {
              p.images = p.images.split("|")
              return p;
            })
        }
      }, err => { console.log(err) }
    );
  }

  deleteProductCart(product_id: any) {
    this.cartService.deleteProductCart(
      product_id
    ).subscribe(
      (data) => {
        //console.log(data);
      }, err => { console.log(err) }
    );
  }

  getTotalCart() {
    this.cartService.getTotalCart(
    ).subscribe(
      (data) => {
        this.dataTotal = data;
        //console.log(this.dataTotal);
      }, err => { console.log(err) }
    );
  }

  tangSoLuongSP(product_id: any) {
    this.cartService.tangSoLuongSP(
      product_id
    ).subscribe(
      (data) => {
        //console.log(data);
      }, err => { console.log(err) }
    );
  }

  giamSoLuongSP(product_id: any) {
    this.cartService.giamSoLuongSP(
      product_id
    ).subscribe(
      (data) => {
        //console.log(data);
      }, err => { console.log(err) }
    );
  }

  checkLoginPayment() {
    console.log(this.user?.user_name);

    if (this.user == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/payment');
    }
  }
}