import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {

  }

  // lấy ra user by user id
  public getUserByUserId(user_id: any): Observable<any> {
    return this.http.get(`/api/member/userid/` + user_id);
  }

  // lấy ra all sản phẩm cho trang payment
  public getAllProductForPayment(data: any): Observable<any> {
    return this.http.post(`/api/cart/get-all`, data);
  }

  //get tổng tiền cho trnag payment
  public getTotalCart(data: any): Observable<any> {
    return this.http.post(`/api/cart/total-money`, data);
  }

  //thanh toán
  public paymentCash(user_id: string, data: any): Observable<any> {
    return this.http.post(`/api/bill/paymentCash/` + user_id, data);
  }

  public paymentPaypal(user_id: string, data: any): Observable<any> {
    return this.http.post(`/api/bill/paymentPaypal/` + user_id, data);
  }
}

