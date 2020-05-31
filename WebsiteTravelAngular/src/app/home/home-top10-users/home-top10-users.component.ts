import { Component, OnInit } from '@angular/core';
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-top10-users',
  templateUrl: './home-top10-users.component.html',
  styleUrls: ['./home-top10-users.component.css']
})
export class HomeTop10UsersComponent implements OnInit {
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

        this.dataTopUser = data
      }
    )
  }

}
