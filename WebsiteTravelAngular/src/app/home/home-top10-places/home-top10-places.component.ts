import { Component, OnInit } from '@angular/core';
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-top10-places',
  templateUrl: './home-top10-places.component.html',
  styleUrls: ['./home-top10-places.component.css']
})
export class HomeTop10PlacesComponent implements OnInit {

  dataTopPlace: any = []
  myDate = new Date();

  domain = environment.API_URL

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.getTop10Place();
  }

  getTop10Place() {
    this.homeService.getTop10Place().subscribe(
      (data) => {

        this.dataTopPlace = data.map(p => {
          p.images = p.images.split("|")
          return p;

        }
        )
      })
  }



}
