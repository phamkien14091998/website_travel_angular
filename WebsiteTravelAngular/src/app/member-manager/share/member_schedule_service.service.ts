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


}
