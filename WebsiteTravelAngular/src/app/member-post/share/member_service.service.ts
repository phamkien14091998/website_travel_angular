import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class MemberService {
    constructor(private http: HttpClient) {

    }

    // lấy ra danh sách thể loại
    // public getProductPortfolio(): Observable<any> {
    //     return this.http.get(`/api/product/list-portfolio`);
    // }
    // // thêm sản phẩm mới
    // public createProduct(product_data: any): Observable<any> {
    //     return this.http.post(`/api/product/new`, product_data);
    // }
    // // lấy ra tất cả danh sách sản phẩm
    // public getListProduct(): Observable<any> {
    //     // console.log(product_search);

    //     return this.http.get(`/api/product/list-product`);
    // }
    // // tìm kiếm sản phẩm theo tên sản phẩm
    // public searchProductbyNameOrPortfolioId(product: any): Observable<any> {
    //     return this.http.post(`/api/product/search-product`, product);
    // }



}
