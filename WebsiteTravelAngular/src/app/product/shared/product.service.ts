import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {

    }
    // lấy ra 16 sản phẩm mới nhất
    public getListProductNew(): Observable<any> {
        return this.http.get(`/api/product/list-product-new`);
    }
    // lấy ra danh sách thể loại
    public getProductPortfolio(): Observable<any> {
        return this.http.get(`/api/product/list-portfolio`);
    }
    // lấy ra sản phẩm theo thể loại id
    public searchByPortfolio_id(portfolio_id: string): Observable<any> {
        return this.http.get('/api/product/search-by-portfolio_id/' + portfolio_id);
    }
    // chi tiết sản phẩm theo id
    public getDetailProductById(product_id: string): Observable<any> {

        return this.http.get('/api/product/detail-product/' + product_id);
    }
    // chi tiết sản phẩm theo id
    public addToCart(data: any): Observable<any> {
        return this.http.post('/api/cart/add', data);
    }

    // lấy ra user by user name
    public callFunctionPayment(data: any): Observable<any> {
        return this.http.post(`/api/paypal/payment/`, data);
    }
    // lấy ra 16 sản phẩm bán chạy nhất
    public getListProductRevenue(): Observable<any> {
        return this.http.get(`/api/product/list-revenue`);
    }
    // tim kiem san pham theo ten
    public searchProductByName(product_name: any): Observable<any> {

        return this.http.post('/api/product/search-name', product_name);
    }

    // chi tiết sản phẩm theo id
    public getAllProductForCart(product_id: string): Observable<any> {
        return this.http.get('/api/cart/add/' + product_id);
    }

    // get soo lương san pham gio hang
    public getCountGioHang(data: any): Observable<any> {
        return this.http.post('/api/cart/getCount', data);
    }




}
