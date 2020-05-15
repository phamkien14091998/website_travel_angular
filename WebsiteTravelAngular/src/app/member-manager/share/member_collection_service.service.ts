import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class MemberCollectionService {
    constructor(private http: HttpClient) {

    }

    // lấy ra danh sách tỉnh
    public getProvince(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }
    // lấy ra danh list place by province_id
    public getPlaceByProvinceId(province_id: any): Observable<any> {
        console.log(province_id);
        return this.http.post(`/api/place/search-place-by-province-id`, province_id);
    }
    // thêm collection mới
    public createCollection(collection_data: any): Observable<any> {
        return this.http.post(`/api/collection/new`, collection_data);
    }
    // lấy ra tất cả bộ sưu tập của user đang dăng nhập
    public getListCollectionByUser(user_id: any): Observable<any> {
        console.log(user_id);
        return this.http.post(`/api/collection/list`, user_id);
    }
    // get chi tiết danh sách bộ sưu tập theo id
    public getCollectionById(collection_id: any): Observable<any> {
        console.log(collection_id);
        return this.http.get(`/api/collection/detail/` + collection_id);
    }
    // Xóa collection by id
    public deleteCollection(collection_id: string): Observable<any> {
        return this.http.delete(`/api/collection/delete/` + collection_id);
    }
    // get detail collection by id
    public getDetailColectionById(collection_id: any): Observable<any> {
        return this.http.get(`/api/collection/detail-id/` + collection_id);
    }
    // cập nhật collection by id
    public updateCollection(collection_id: string, data: any): Observable<any> {
        console.log(data);

        return this.http.post(`/api/collection/update/` + collection_id, data);
    }
    // thêm địa điểm vào bộ sưu tập ở trang home
    public addPlaceIntoCollection(placeData: any): Observable<any> {
        return this.http.post(`/api/collection/add-place`, placeData);
    }
    // Xóa place trong collection 
    public deletePlaceCollection(famous_place_id: string): Observable<any> {

        return this.http.delete(`/api/collection/delete-place/` + famous_place_id);
    }
    // lấy ra địa điểm theo id
    public getPlaceById(famous_place_id_arr: any): Observable<any> {
        // console.log(famous_place_id);
        return this.http.post(`/api/place/get-famous-id`, famous_place_id_arr);
    }

}
