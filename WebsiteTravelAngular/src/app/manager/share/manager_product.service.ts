import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


// export interface Products {
//     product_id: number,
//     product_name: string,
//     price: string,
//     description: string,
//     quantity: number,
//     portfolio_id: number,
//     image_1: string,
//     image_2: string,
//     imag_3: string,
// }

@Injectable()
export class ManagerProductService {
    constructor(private http: HttpClient) {

    }

    // lấy ra danh sách thể loại
    public getProductPortfolio(): Observable<any> {
        return this.http.get(`/api/product/list-portfolio`);
    }
    // thêm sản phẩm mới
    public createProduct(product_data: any): Observable<any> {
        return this.http.post(`/api/product/new`, product_data);
    }
    // lấy ra tất cả danh sách sản phẩm
    public getListProduct(): Observable<any> {
        // console.log(product_search);   

        return this.http.get(`/api/product/list-product`);
    }
    // tìm kiếm sản phẩm theo tên sản phẩm
    public searchProductbyNameOrPortfolioId(product: any): Observable<any> {
        return this.http.post(`/api/product/search-product`, product);
    }
    // chi tiết sản phẩm theo id
    public getDetailProductById(product_id: string): Observable<any> {

        return this.http.get('/api/product/detail-product/' + product_id);
    }
    //xóa sản phẩm theo product_id
    public deleteProduct(product_id: string): Observable<any> {
        return this.http.delete(`/api/product/delete/` + product_id);
    }
    //update product by product_id
    public updateProduct(product_id: string, productData: any): Observable<any> {
        return this.http.post(`/api/product/update/` + product_id, productData);
    }
    // lấy ra tất cả danh sách sản phẩm
    public getTop10Product(): Observable<any> {
        return this.http.get(`/api/product/top10`);
    }

}