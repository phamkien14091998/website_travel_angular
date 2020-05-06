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

    // lấy ra user by user name
    public getUserByUserName(user_name: String): Observable<any> {
        return this.http.get(`/api/member/username/` + user_name);
    }

    // lấy ra user by user id
    public getUserByUserId(user_id: String): Observable<any> {
        return this.http.get(`/api/member/userid/` + user_id);
    }

    //update product by product_id
    public updateUser(user_id: string, userData: any): Observable<any> {
        return this.http.post(`/api/member/update/` + user_id, userData);
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



}