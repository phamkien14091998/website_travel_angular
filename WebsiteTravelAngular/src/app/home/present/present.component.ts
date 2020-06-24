import { Component, OnInit } from '@angular/core';
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css']
})
export class PresentComponent implements OnInit {

  dataTopUser: any = []
  myDate = new Date();
  domain = environment.API_URL

  constructor(
    private home_service: HomeService,
  ) {
  }
  ngOnInit(): void {
    this.getTop10User();
  }
  getTop10User() {
    this.home_service.getTop10User().subscribe(
      (data) => {
        console.log(data);

        this.dataTopUser = data
      }
    )
  }


}
