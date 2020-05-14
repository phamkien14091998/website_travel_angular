import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberService } from "./share/member_service.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-member-manager',
  templateUrl: './member-manager.component.html',
  styleUrls: ['./member-manager.component.css']
})
export class MemberManagerComponent implements OnInit {

  dataUser: any = {};
  user: any = '';
  domain = environment.API_URL;
  user_id: any;

  selectedItem: any;
  // khai báo để lưu giá trị user đang đăng nhập
  userLogIn: any = '';

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.userLogIn = user)  // bán user = user đã được truyền lên kèm token
    this.user_id = this.route.firstChild.snapshot.params.user_id; //lấy params của component con
    this.route.params.subscribe(
      (params) => {
        this.getUserByUserId(this.user_id);
      })
  }

  getUserByUserId(user_id: String) {
    this.memberService.getUserByUserId(
      user_id
    ).subscribe(
      (data) => {
        //data.images = data.images.split('|')
        this.dataUser = data
        // console.log(this.dataUser);
      }, err => { console.log(err) }
    );
  }
  // xử lý navbar khi click chọn
  listClick(event, newValue) {
    this.selectedItem = newValue;
  }

}