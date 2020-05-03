import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberPostService } from "../../share/member_post_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-detail-member-post',  
  templateUrl: './detail-member-post.component.html',
  styleUrls: ['./detail-member-post.component.css']
})
export class DetailMemberPostComponent implements OnInit {

  dataDetailPost: any = {};
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private post_service: MemberPostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getPostId(params['post_id']);
      })
  }

  getPostId(post_id: string) {

    this.post_service.getPostById(
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
