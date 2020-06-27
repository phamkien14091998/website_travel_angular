import { Component, OnInit } from '@angular/core';

import { ProductService } from './shared/product.service';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataInsert: any = [];
  user: any = '';

  constructor(
    private productService: ProductService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)
    // thanh toán xong nó gọi hàm này nè //
    this.callFunctionPayment();
  }

  callFunctionPayment() {
    const data = {
      'email': this.user?.email
    };

    this.productService.callFunctionPayment(data).subscribe(
      (data) => {
        this.dataInsert = data;
        console.log(this.dataInsert);
      }, err => { console.log(err) }
    );
  }

}
