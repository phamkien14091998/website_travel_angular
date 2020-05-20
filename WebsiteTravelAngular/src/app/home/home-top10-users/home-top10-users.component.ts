import { Component, OnInit } from '@angular/core';
import { HomeService } from "../shared/home_service.service";

@Component({
  selector: 'app-home-top10-users',
  templateUrl: './home-top10-users.component.html',
  styleUrls: ['./home-top10-users.component.css']
})
export class HomeTop10UsersComponent implements OnInit {
  dataTopUser: any = []
  myDate = new Date();

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
