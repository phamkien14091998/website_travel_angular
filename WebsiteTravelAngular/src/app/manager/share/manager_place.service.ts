import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ManagerPlaceService {
    constructor(private http: HttpClient) {

    }

    // lấy ra tất cả danh sách địa điểm
    public getListPlace(): Observable<any> {
        return this.http.get(`/api/place/list`);
    }
    // Lấy ra tất cả tỉnh 
    public getProvince(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }
    // chi tiết địa điểm theo id
    public getDetailPlaceById(famous_place_id: string): Observable<any> {

        return this.http.get('/api/place/detail/' + famous_place_id);
    }
    // thêm địa điểm mới
    public createPlace(place_data: any): Observable<any> {
        return this.http.post(`/api/place/new`, place_data);
    }
    //update place by id
    public updatePlace(famous_place_id: string, placeData: any): Observable<any> {
        return this.http.post('/api/place/update/' + famous_place_id, placeData);
    }
    //xóa địa điểm theo id
    public deletePlace(famous_place_id: string): Observable<any> {
        return this.http.delete('/api/place/delete/' + famous_place_id);
    }
    // tìm kiếm địa điểm theo title hoạc province_id
    public searchPlaceByTitleAndProvinId(place: any): Observable<any> {
        return this.http.post(`/api/place/search`, place);
    }


}