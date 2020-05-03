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
    // phê duyệt bài viết hoạc hủy bài viết
    public approvedOrNotApprovedPost(dataPost: any): Observable<any> {

        return this.http.post(`/api/post/approved-or-notapproved`, dataPost);
    }


}