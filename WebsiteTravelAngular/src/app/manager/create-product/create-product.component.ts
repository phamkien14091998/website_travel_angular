import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { ManagerProductService } from "../share/manager_product.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  options: { content: FormData };

  data_portfolio: any = {};
  createProductForm: FormGroup;

  myFiles: string[] = [];

  file: string;

  constructor(
    private product_service: ManagerProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  // hàm khi vô component chạy đầu tiên
  ngOnInit(): void {
    this.initForm();
    this.getListProductPortfolio();
  }
  initForm() {
    this.createProductForm = this.fb.group({
      product_name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      portfolio_id: ['', Validators.required],
      profile: ['']
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createProductForm.controls[fieldName].invalid &&
      (this.createProductForm.controls[fieldName].dirty || this.createProductForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createProductForm.controls[fieldName].errors.required;
  }

  createProduct() {
    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('fileUpload[]', this.myFiles[i]);
    }
    formData.append('product_name', this.createProductForm.controls['product_name'].value);
    formData.append('price', this.createProductForm.controls['price'].value);
    formData.append('description', this.createProductForm.controls['description'].value);
    formData.append('quantity', this.createProductForm.controls['quantity'].value);
    formData.append('portfolio_id', this.createProductForm.controls['portfolio_id'].value);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    this.product_service.createProduct(
      formData

    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Thêm Sản Phẩm');
        this.router.navigateByUrl('/manager/product');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Thêm Sản Phẩm');
      }
    )
  }

  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.createProductForm.get('profile').setValue(this.myFiles);
    }
  }

  // lấy ra danh sách các thể loại sản phẩm
  getListProductPortfolio() {
    this.product_service.getProductPortfolio().subscribe(
      ($data) => {
        this.data_portfolio = $data;
      }
    );

  }



}
