import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-list-places',
  templateUrl: './home-list-places.component.html',
  styleUrls: ['./home-list-places.component.css']
})
export class HomeListPlacesComponent implements OnInit {

  dataListPlace: any = [];
  dataProvinceName: any = '';
  numberOfPlace: any = 0;
  domain = environment.API_URL; 

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getListPlaceByProvinceId(params['province_id']);
      })
  }

  getListPlaceByProvinceId(province_id: string) {
    this.homeService.getListPlaceByProvinceId(
      province_id
    ).subscribe(
      (data) => {
        this.dataListPlace = data.map(p => {
            this.dataProvinceName = p.province_name
            this.numberOfPlace += 1
            p.images = p.images.split("|")
            return p;
        })
        console.log(this.dataListPlace);
    }, err => { console.log(err) }
    );
  }
}

