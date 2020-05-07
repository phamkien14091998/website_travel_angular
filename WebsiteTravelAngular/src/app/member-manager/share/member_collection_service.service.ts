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


}
