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
    // // tìm kiếm sản phẩm theo id thể loại
    // public searchProductbyPortfolioId(product_name: any): Observable<any> {
    //     return this.http.post(`/api/product/search-product-portfolio`, product_name);
    // }
    // chi tiết sản phẩm theo id
    public getDetailProductById(product_id: string): Observable<any> {

        return this.http.get('/api/product/detail-product/' + product_id);
    }

    //   public getPhimById(filmId: string): Observable<any> {
    //     return this.http.get(environment.API_URL+'/api/v1/films/'+ filmId); 

    //   }

    //   public getFilms(): Observable<any> {
    //     return this.http.get(environment.API_URL+'/api/v1/films'); 

    //   }

    //   public getFilmsByTenPhim(tenPhim: string): Observable<any> {
    //     return this.http.get(environment.API_URL+`/api/v1/films?tenPhim=${tenPhim}`);

    //   }


    //   public getFilmManager(): Observable<any>{
    //     return this.http.get(environment.API_URL+'/api/v1/films/manage');
    //   }

    //   public deleteFilm(filmId: string): Observable<any>{
    //     return this.http.delete(environment.API_URL+`/api/v1/films/${filmId}`);
    //   }

    //   public updateFilm(filmId: string,filmData: any): Observable<any>{
    //     return this.http.patch(environment.API_URL+`/api/v1/films/${filmId}`,filmData);
    //   }

}