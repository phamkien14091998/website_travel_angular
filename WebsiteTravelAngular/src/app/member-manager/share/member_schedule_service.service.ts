import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class MemberScheduleService {
    constructor(private http: HttpClient) {

    }

    // lấy ra danh sách tỉnh
    public getProvince(): Observable<any> {
        return this.http.get(`/api/place/province`);
    }
    // lấy ra danh list place by province_id
    public getPlaceByProvinceId(province_id: any): Observable<any> {
        // console.log(province_id);
        return this.http.post(`/api/place/search-place-by-province-id`, province_id);
    }
    // lấy ra địa điểm theo id
    public getPlaceById(famous_place_id_arr: any): Observable<any> {
        // console.log(famous_place_id);
        return this.http.post(`/api/place/get-famous-id`, famous_place_id_arr);
    }

    // lấy tất cả vehicle  list-vehicle
    public getListVehicle(): Observable<any> {
        return this.http.get(`/api/schedule/list-vehicle`);
    }

    // create lịch trình
    public createSchedule(schedule_data: any): Observable<any> {

        return this.http.post(`/api/schedule/new`, schedule_data);
    }
    // lấy ra tất cả lịch trình của user đang dăng nhập    
    public getListScheduleByUser(user_id: any): Observable<any> {
        console.log(user_id);
        return this.http.post(`/api/schedule/list`, user_id);
    }
    // get chi tiết lịch trình theo id
    public getScheduleById(trip_id: any): Observable<any> {
        return this.http.get(`/api/schedule/detail/` + trip_id);
    }
    // cập nhật schedule by id
    public updateSchdule(trip_id: string, tripData: any): Observable<any> {
        return this.http.post(`/api/schedule/update/` + trip_id, tripData);
    }

    // Xóa schedule by id
    public deleteSchedule(trip_id: string): Observable<any> {
        return this.http.delete(`/api/schedule/delete/` + trip_id);
    }
    // get chi tiết bảng trip
    public getDetailTrip(trip_id: any): Observable<any> {
        // console.log(famous_place_id);
        return this.http.get(`/api/schedule/detail-trip/` + trip_id);
    }

    // Xóa shcedule-detail by trip_detail_id
    public deleteScheduleDetail(trip_detail_id: string): Observable<any> {
        return this.http.delete(`/api/schedule/delete-detail/` + trip_detail_id);
    }
    // get chi tiết bảng trip-detail
    public getTripDetail(trip_detail_id: any): Observable<any> {

        return this.http.get(`/api/schedule/trip-detail/` + trip_detail_id);
    }
    // cập nhật schedule-detail by id
    public updateScheduleDetail(trip_detail_id: string, body: any): Observable<any> {
        console.log(body);

        return this.http.post(`/api/schedule/update-trip-detail/` + trip_detail_id, body);
    }


}
