import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class MemberPostService {
    constructor(private http: HttpClient) {

    }

    // lấy ra danh sách tỉnh   
    public getProvince(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }

    //get địa điểm theo mã tỉnh
    public getPlaceByProvinceId(province_id: any): Observable<any> {
        console.log(province_id);
        return this.http.post(`/api/place/search-place-by-province-id`, province_id);
    }

    // // thêm post mới
    public createPost(post_data: any): Observable<any> {
        console.log(post_data);

        return this.http.post(`/api/post/new`, post_data);
    }

    // // tìm post
    public searchPost(post: any): Observable<any> {
        console.log(post);

        return this.http.post(`/api/post/search-post`, post);
    }

    // get post đã duyệt (ở ngoài trang home)
    public getPostDuyet(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }



}
