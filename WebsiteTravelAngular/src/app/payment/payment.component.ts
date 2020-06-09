import { Component, OnInit } from '@angular/core';
import { PaymentService } from "./shared/payment.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "../authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  dataUser: any = {};
  dataTotal: any = 0;
  user: any = '';
  dataPaymentCash: any = [];
  dataPaymentPaypal: any = [];
  domain = environment.API_URL;

  options: { content: FormData };
  paymentForm: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.auth.user$.subscribe(user => this.user = user)
    this.getUserByUserId();
    this.getTotalCart();
    this.getAllProductForPayment();
    //this.thanhToan();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      formOfDelivery: ['', Validators.required],
      methods: ['', Validators.required],
      note: [''],
    });
  }

  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.paymentForm.controls[fieldName].invalid &&
      (this.paymentForm.controls[fieldName].dirty || this.paymentForm.controls[fieldName].touched)
  }

  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.paymentForm.controls[fieldName].errors.required;
  }

  getUserByUserId() {
    this.paymentService.getUserByUserId(
      this.user.user_id
    ).subscribe(
      (data) => {
        this.dataUser = data
        console.log(this.dataUser);
      }, err => { console.log(err) }
    );
  }

  getAllProductForPayment() {
    this.paymentService.getAllProductForPayment(
    ).subscribe(
      (data) => {
        this.dataPaymentCash = data
        console.log(this.dataPaymentCash);
      }, err => { console.log(err) }
    );
  }

  getTotalCart() {
    this.paymentService.getTotalCart(
    ).subscribe(
      (data) => {
        this.dataTotal = data;
      }, err => { console.log(err) }
    );
  }

  thanhToan() {
    const body = {
      'shipfee': this.paymentForm.controls['formOfDelivery'].value,
      'methods': this.paymentForm.controls['methods'].value,
      'note': this.paymentForm.controls['note'].value,
      'email': this.user?.email
    }

    if (body.methods == "" || body.shipfee == "") {
      this.toastr.error('Mời nhập đầy đủ thông tin', 'Thanh toán');
    } else {
      // thanh toán bằng tiền mặt
      if (body.methods == "tienmat") {
        this.paymentService.paymentCash(
          this.user?.user_id,
          body
        ).subscribe(
          () => {
            this.toastr.success('Thành Công ', 'Thanh toán tiền mặt');
            this.router.navigateByUrl('/product');
          },
          err => {
            this.toastr.error('Thất bại', 'Thanh toán tiền mặt');
          }
        )
      } else { //thanh toán bằng paypal
        this.paymentService.paymentPaypal(
          this.user?.user_id,
          body
        ).subscribe(
          (data) => {
            this.dataPaymentPaypal = data;
            window.open(
              this.dataPaymentPaypal.url,
              '_blank' // <- This is what makes it open in a new window.
            );
            console.log(this.dataPaymentPaypal);
          }
        );
      }
    }
  }

}
