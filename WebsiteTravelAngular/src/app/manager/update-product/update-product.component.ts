import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ManagerProductService } from "../share/manager_product.service";
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  data_detailProduct: any = {};
  data_portfolio: any = [];
  domain = environment.API_URL;

  options: { content: FormData };
  updateProductForm: FormGroup;
  myFiles: string[] = [];
  file: string;

  constructor(
    private route: ActivatedRoute,
    private product_service: ManagerProductService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListProductPortfolio();
    this.route.params.subscribe(
      (params) => {
        this.getDetailProduct(params['product_id']);
      })
  }

  // chi tiết sản phẩm
  getDetailProduct(product_id: string) {
    this.product_service.getDetailProductById(
      product_id
    ).subscribe(
      (data) => {
        data.images = data.images.split('|')
        this.data_detailProduct = data
        this.updateProductForm.patchValue(this.data_detailProduct)

        //this.updateProductForm.controls['product_name'].setValue(this.data_detailProduct.product_name)
      }, err => { console.log(err) }
    );

  }
  // lấy ra danh sách các thể loại sản phẩm
  getListProductPortfolio() {
    this.product_service.getProductPortfolio().subscribe(
      ($data) => {
        this.data_portfolio = $data;
      }
    );
  }
  initForm() {
    this.updateProductForm = this.fb.group({
      product_name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      portfolio_id: ['', Validators.required],
      profile: ['']
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.updateProductForm.controls[fieldName].invalid &&
      (this.updateProductForm.controls[fieldName].dirty || this.updateProductForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updateProductForm.controls[fieldName].errors.required;
  }

  updateProduct() {

    const formData = new FormData();
    // kiểm tra nếu có chọn file
    if (this.myFiles.length) {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('fileUpload[]', this.myFiles[i]);
      }
    } else {
      formData.append('images', this.data_detailProduct.images);
    }
    // // kiểm tra nếu có theoo tác trong form hay không
    // if (!this.updateProductForm.controls['product_name'].value) {
    //   formData.append('product_name', this.data_detailProduct.product_name);
    // } else {
    //   formData.append('product_name', this.updateProductForm.controls['product_name'].value);
    // }
    // if (!this.updateProductForm.controls['price'].value) {
    //   formData.append('price', this.data_detailProduct.price);
    // } else {
    //   formData.append('price', this.updateProductForm.controls['price'].value);
    // }
    // if (!this.updateProductForm.controls['quantity'].value) {
    //   formData.append('quantity', this.data_detailProduct.quantity);
    // } else {
    //   formData.append('quantity', this.updateProductForm.controls['quantity'].value);
    // }
    // if (!this.updateProductForm.controls['portfolio_id'].value) {
    //   formData.append('portfolio_id', this.data_detailProduct.portfolio_id);
    // } else {
    //   formData.append('portfolio_id', this.updateProductForm.controls['portfolio_id'].value);
    // }
    // if (this.updateProductForm.controls['description'].value || this.updateProductForm.controls['description']) {
    //   formData.append('description', this.updateProductForm.controls['description'].value);
    // } else {
    //   formData.append('description', this.data_detailProduct.description);
    // }

    formData.append('product_id', this.data_detailProduct.product_id);

    formData.append('product_name', this.updateProductForm.controls['product_name'].value);
    formData.append('price', this.updateProductForm.controls['price'].value);
    formData.append('description', this.updateProductForm.controls['description'].value);
    formData.append('quantity', this.updateProductForm.controls['quantity'].value);
    formData.append('portfolio_id', this.updateProductForm.controls['portfolio_id'].value);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    console.log(formData);

    this.product_service.updateProduct(
      this.data_detailProduct?.product_id,
      formData
    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Sửa Sản Phẩm');
        this.router.navigateByUrl('/manager/product/detail/'+this.data_detailProduct?.product_id);
      },
      err => {
        this.toastr.error('Thất Bại ', 'Sửa Sản Phẩm');
      }
    )
  }
  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.updateProductForm.get('profile').setValue(this.myFiles);
    }
  }




}
