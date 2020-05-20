import { Component, OnInit } from '@angular/core';
import { ProductService } from "../shared/product.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

  }




}
