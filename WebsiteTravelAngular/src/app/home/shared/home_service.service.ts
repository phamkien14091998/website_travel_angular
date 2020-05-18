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

    // lấy ra all bài post đã duyệt
    public getAllPost(): Observable<any> {
        return this.http.get(`/api/post/all`);
    }

    // lấy ra 8 dia diem đã duyệt
    public getAll8PProvince(): Observable<any> {
        return this.http.get(`/api/place/list-home`);
    }

    // lấy ra 11 dia diem đã duyệt cho trang place_details
    public get11Provinces(): Observable<any> {
        return this.http.get(`/api/place/11provinces`);
    }

    // lấy ra danh post by id   
    public getPostById(post_id: any): Observable<any> {
        return this.http.get(`/api/post/detail/` + post_id);
    }

    // lấy ra danh list place by province_id  
    public getListPlaceByProvinceId(province_id: any): Observable<any> {
        return this.http.get(`/api/place/search-place-by-province-id/` + province_id);
    }

    // lấy ra danh post by id   
    public getListPostByPlaceId(famous_place_id: any): Observable<any> {
        return this.http.get(`/api/post/place/detail/` + famous_place_id);
    }

    // lấy ra danh post by province id   
    public getListPostByProvinceId(province_id: any): Observable<any> {
        return this.http.get(`/api/post/province/detail/` + province_id);
    }

    // get all province
    public getAllProvinces(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }

    // lấy ra tất cả comment của bài biết đã chọn
    public getAllCommentByPostId(post_id: any): Observable<any> {
        return this.http.get(`/api/comment/list-post/` + post_id);
    }
    // thêm bình luận của user vào bài viết
    public createComment(data: any): Observable<any> {
        return this.http.post(`/api/comment/new-post`, data);
    }
    //delete comment
    public deleteComment(comment_id: string): Observable<any> {
        return this.http.delete(`/api/comment/delete/` + comment_id);
    }
    // lấy chi tiết địa điểm 
    public getDetailPlaceHome(famous_place_id: any): Observable<any> {
        return this.http.get(`/api/place/detail-home/` + famous_place_id);
    }
    // thêm đánh giá cho bài viết
    public createRating(data: any): Observable<any> {
        return this.http.post(`/api/rating/new`, data);
    }
    // kiểm tra xem bài viết đó user đang đăng nhập đã đánh giá hay chưa
    public checkUserRatingPost(data: any): Observable<any> {
        // console.log(data);
        return this.http.post(`/api/rating/check`, data);
    }
    // sửa đánh giá cho bài viết
    public updateRating(data: any): Observable<any> {
        return this.http.post(`/api/rating/update`, data);
    }
    // lấy tất cả đánh giá của bài post theo post_id
    public getAllRatingPost(post_id: any): Observable<any> {
        return this.http.post(`/api/rating/list`, post_id);
    }

}



