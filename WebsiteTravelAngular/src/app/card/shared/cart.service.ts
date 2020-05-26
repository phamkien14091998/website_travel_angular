import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class CartService {
    constructor(private http: HttpClient) {

    }

    // lấy danh sách sản phẩm
    public getAllProductForCart(): Observable<any> {
        return this.http.get(`/api/cart/get-all`);
    }

    public deleteProductCart(product_id: any): Observable<any> {
        return this.http.get(`/api/cart/delete/` + product_id);
    }

    public getTotalCart(): Observable<any> {
        return this.http.get(`/api/cart/total-money`);
    }

    public tangSoLuongSP(product_id: any): Observable<any> {
        return this.http.get(`/api/cart/tangSoLuongSP/` + product_id);
    }

    public giamSoLuongSP(product_id: any): Observable<any> {
        return this.http.get(`/api/cart/giamSoLuongSP/` + product_id);
    }

    public getSoLuongTonKho(): Observable<any> {
        return this.http.get(`/api/cart/soLuongTon`);
    }
}
