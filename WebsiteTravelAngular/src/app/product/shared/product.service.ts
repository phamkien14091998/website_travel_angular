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

    // // lấy ra tất cả danh sách sản phẩm
    // public getListProduct(): Observable<any> {
    //     // console.log(product_search);   

    //     return this.http.get(`/api/product/list-product`);
    // }
    // // tìm kiếm sản phẩm theo tên sản phẩm
    // public searchProductbyNameOrPortfolioId(product: any): Observable<any> {
    //     return this.http.post(`/api/product/search-product`, product);
    // }
    // // chi tiết sản phẩm theo id
    // public getDetailProductById(product_id: string): Observable<any> {

    //     return this.http.get('/api/product/detail-product/' + product_id);
    // }



}