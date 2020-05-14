import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-places-detail',
  templateUrl: './home-places-detail.component.html',
  styleUrls: ['./home-places-detail.component.css']
})
export class HomePlacesDetailComponent implements OnInit {

  dataListPost: any = [];
  dataProvinceName: any = '';
  dataPlaceName: any = '';
  dataDescription: any = '';
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getListPostByPlaceId(params['famous_place_id']);
      })
  }

  getListPostByPlaceId(famous_place_id: any) {
    this.homeService.getListPostByPlaceId(
      famous_place_id
    ).subscribe( 
      (data) => {
        this.dataListPost = data.map(p => {
          this.dataProvinceName = p.province_name
          this.dataPlaceName = p.place_title
          this.dataDescription = p.description
          p.images = p.images.split("|")
          return p;
        })
        console.log(this.dataListPost);
      }, err => { console.log(err) }
    );
  }
}