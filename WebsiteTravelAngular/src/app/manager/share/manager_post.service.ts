import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ManagerPostService {
    constructor(private http: HttpClient) {

    }

    // lấy ra tất cả danh sách bài viết chưa duyệt cho trang Admin
    public getAllPostChuaDuyet(): Observable<any> {
        return this.http.get(`/api/post/list-not-approved`);
    }
    // lấy ra danh post by id   
    public getPostById(post_id: any): Observable<any> {
        return this.http.get(`/api/post/detail/` + post_id);
    }
    // // chi tiết địa điểm theo id
    // public getDetailPlaceById(famous_place_id: string): Observable<any> {

    //     return this.http.get('/api/place/detail/' + famous_place_id);
    // }
    // // thêm địa điểm mới
    // public createPlace(place_data: any): Observable<any> {
    //     return this.http.post(`/api/place/new`, place_data);
    // }
    // //update place by id
    // public updatePlace(famous_place_id: string, placeData: any): Observable<any> {
    //     return this.http.post('/api/place/update/' + famous_place_id, placeData);
    // }
    // //xóa địa điểm theo id
    // public deletePlace(famous_place_id: string): Observable<any> {
    //     return this.http.delete('/api/place/delete/' + famous_place_id);
    // }



}