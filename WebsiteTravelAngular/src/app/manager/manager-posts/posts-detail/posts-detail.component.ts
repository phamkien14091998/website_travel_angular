import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ManagerPostService } from "../../share/manager_post.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {

  dataDetailPost: any = {};
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private postService: ManagerPostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getPostId(params['post_id']);
      })
  }
  getPostId(post_id: string) {

    this.postService.getPostById(
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
