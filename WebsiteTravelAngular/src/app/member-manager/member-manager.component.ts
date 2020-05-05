import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberService } from "./share/member_service.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-member-manager',
  templateUrl: './member-manager.component.html',
  styleUrls: ['./member-manager.component.css']
})
export class MemberManagerComponent implements OnInit {

  dataUser: any = {};
  user: any = '';
  domain = environment.API_URL;
  user_name: any;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }

  ngOnInit(): void {
    this.user_name = this.route.firstChild.snapshot.params.user_name; //lấy params của component con
    this.route.params.subscribe(
      (params) => {
        this.getUserByUserName(this.user_name);
      })
  }

  getUserByUserName(user_name: String) {
    this.memberService.getUserByUserName(
      user_name
    ).subscribe(
      (data) => {
        //data.images = data.images.split('|')
        this.dataUser = data
        // console.log(this.dataUser);
      }, err => { console.log(err) }
    );
  }

}