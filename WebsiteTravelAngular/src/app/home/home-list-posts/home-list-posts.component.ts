import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-list-posts',
  templateUrl: './home-list-posts.component.html',
  styleUrls: ['./home-list-posts.component.css']
})
export class HomeListPostsComponent implements OnInit {

  dataListProvince: any = []; 
  dataList11Province: any = [];
  dataListPost: any = [];
  domain = environment.API_URL; 

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getAllProvinces();
    this.get11Provinces();
    this.getAllPosts();
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

  getAllPosts() {
    this.homeService.getAllPost(
    ).subscribe(
      (data) => {
        this.dataListPost = data
        console.log(this.dataListPost);
    }, err => { console.log(err) }
    );
  }

}
