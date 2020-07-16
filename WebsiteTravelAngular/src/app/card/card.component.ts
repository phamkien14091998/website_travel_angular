import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "./shared/cart.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "../authentication.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  dataProduct: any = [];
  dataTotal: any = 0;
  dataSoLuongTon: any = [];
  domain = environment.API_URL;
  user: any = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)
    this.route.params.subscribe(
      (params) => {
        this.getAllProductForCart();
        this.getTotalCart();
        //this.deleteProductCart(params['product_id']);
      })
    // this.getSoLuongTonKho();
  }

  getAllProductForCart() {
    var data = {
      'user_id': this.user?.user_id
    }

    this.cartService.getAllProductForCart(data
    ).subscribe(
      (data) => {
        if (data != null) {
          this.dataProduct = data.map
            (p => {
              p.images = p.images.split("|")
              return p;
            })
          console.log(this.dataProduct);
        }
        else {
          this.dataProduct = null;
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
    var data = {
      'user_id': this.user?.user_id
    }
    this.cartService.getTotalCart(data
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

    if (this.dataProduct == null) {
      this.toastr.error(' ', 'Bạn chưa có sản phẩm nào trong giỏ hàng !');
      return;
    }

    if (this.user != null) {
      this.router.navigateByUrl('/payment');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  // getSoLuongTonKho() {
  //   this.cartService.getSoLuongTonKho(
  //   ).subscribe(
  //     (data) => {
  //       this.dataSoLuongTon = data;
  //       //console.log(this.dataSoLuongTon);
  //     }, err => { console.log(err) }
  //   );
  // }

}

