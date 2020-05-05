import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-list-post-province',
  templateUrl: './home-list-post-province.component.html',
  styleUrls: ['./home-list-post-province.component.css']
}) 
export class HomeListPostProvinceComponent implements OnInit {

  dataListProvince: any = [];
  dataList11Province: any = [];
  numberOfPlace: any = 0;
  dataListPost: any = [];
  domain = environment.API_URL; 

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getAllProvinces();
    this.get11Provinces();
    this.route.params.subscribe(
      (params) => {
        this.getListPostByProvinceId(params['province_id']);
      });
  }
  
  getAllProvinces() {
    this.homeService.getAllProvinces(
    ).subscribe(
      (data) => {
        this.dataListProvince = data
        console.log(this.dataListProvince);
    }, err => { console.log(err) }
    );
  }

  get11Provinces() {
    this.homeService.get11Provinces(
    ).subscribe(
      (data) => {
        this.dataList11Province = data
        console.log(this.dataList11Province);
    }, err => { console.log(err) }
    );
  }

  getListPostByProvinceId(province_id: string) {
    this.homeService.getListPostByProvinceId(
      province_id
    ).subscribe(
      (data) => {
        this.dataListPost = data.map(p => {
            this.numberOfPlace += 1
            p.images = p.images.split("|")
            return p;
        })
        console.log(this.dataListPost);
    }, err => { console.log(err) }
    );
  }

}
