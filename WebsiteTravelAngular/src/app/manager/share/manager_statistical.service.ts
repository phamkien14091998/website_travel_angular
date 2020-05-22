import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ManagerstatisticalService {
    constructor(private http: HttpClient) {

    }

    // lấy ra top 10 địa điểm có số điểm đánh giá cao nhất tháng vừa qua
    public getTop10Place(): Observable<any> {
        return this.http.get(`/api/place/top-10`);
    }
    // lấy ra doanh thu bán theo tháng
    public getStatisticsRevenue(): Observable<any> {
        return this.http.get(`/api/product/statistics-revenue`);
    }


}