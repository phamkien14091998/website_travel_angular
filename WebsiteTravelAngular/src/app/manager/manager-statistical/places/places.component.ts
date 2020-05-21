import { Component, OnInit } from '@angular/core';
import { ManagerstatisticalService } from "../../share/manager_statistical.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  dataTopPlace: any = []
  myDate = new Date();

  domain = environment.API_URL

  constructor(
    private statisticalService: ManagerstatisticalService,
  ) { }

  ngOnInit(): void {
    this.getTop10Place();
  }

  getTop10Place() {
    this.statisticalService.getTop10Place().subscribe(
      (data) => {

        this.dataTopPlace = data.map(p => {
          p.images = p.images.split("|")
          return p;

        }
        )
      })
  }




}
