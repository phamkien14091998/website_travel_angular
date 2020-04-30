import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ManagerPlaceService } from "../../share/manager_place.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-detail-places',
  templateUrl: './detail-places.component.html',
  styleUrls: ['./detail-places.component.css']
})
export class DetailPlacesComponent implements OnInit {
  dataDetailPlace: any = {};
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private placeService: ManagerPlaceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getDetailPlace(params['famous_place_id']);
      })
  }

  getDetailPlace(famous_place_id: string) { 

    this.placeService.getDetailPlaceById(
      famous_place_id
    ).subscribe(
      (data) => {

        // this.dataDetailPlace = data
        data.images = data.images.split('|')
        this.dataDetailPlace = data

      }, err => { console.log(err) }
    );

  }

}
  