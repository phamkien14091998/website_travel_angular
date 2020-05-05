import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-list-provinces',
  templateUrl: './home-list-provinces.component.html',
  styleUrls: ['./home-list-provinces.component.css']
})
export class HomeListProvincesComponent implements OnInit {

  dataListProvince: any = [];
  dataList11Province: any = [];
  domain = environment.API_URL; 

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getAllProvinces();
        this.get11Provinces();
      })
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

}
