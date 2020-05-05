import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home-posts-detail',
  templateUrl: './home-posts-detail.component.html',
  styleUrls: ['./home-posts-detail.component.css']
})
export class HomePostsDetailComponent implements OnInit {

  dataDetailPost: any = {};
  domain = environment.API_URL; 

  constructor(
    private route: ActivatedRoute,
    private home_service: HomeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getPostId(params['post_id']);
      })
  }

  getPostId(post_id: string) {

    this.home_service.getPostById(
      post_id
    ).subscribe(
      (data) => {
        data.images = data.images.split('|')
        this.dataDetailPost = data
        console.log(this.dataDetailPost);

      }, err => { console.log(err) }
    );

  }

}

