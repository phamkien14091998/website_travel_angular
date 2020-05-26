import { Component, OnInit } from '@angular/core';
import { ProductService } from "../shared/product.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {
  searchProductForm: FormGroup;
  dataSearch: any = []

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm()

  }
  initForm() {
    this.searchProductForm = this.fb.group({
      product_name: ['']
    });
  }

  // tim san pham theo ten
  searchProduct() {
    this.productService.searchProductByName(
      this.searchProductForm.value

    ).subscribe(
      (data) => {

        this.dataSearch = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
      }, err => { console.log(err) }
    );
  }



}
