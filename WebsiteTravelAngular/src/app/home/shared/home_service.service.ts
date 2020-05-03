import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class HomeService {
    constructor(private http: HttpClient) {

    }

    // lấy ra 9 bài post đã duyệt
    public getAllPostDuyet(): Observable<any> {
        return this.http.get(`/api/post/list-approved`);
    }

    // lấy ra 8 dia diem đã duyệt
    public getAll8Place(): Observable<any> {
        return this.http.get(`/api/place/list-home`);
    }

    // lấy ra danh post by id   
    public getPostById(post_id: any): Observable<any> {
        return this.http.get(`/api/post/detail/` + post_id);
    }



    // // lấy ra 16 sản phẩm mới nhất 
    // public getListProductNew(): Observable<any> {

    //     return this.http.get(/api/product/list-product-new);
    // }
    // // lấy ra sản phẩm theo thể loại id
    // public searchByPortfolio_id(portfolio_id: string): Observable<any> {
    //     return this.http.get('/api/product/search-by-portfolio_id/' + portfolio_id);
    // }
    // // chi tiết sản phẩm theo id
    // public getDetailProductById(product_id: string): Observable<any> {

    //     return this.http.get('/api/product/detail-product/' + product_id);
    // }



}