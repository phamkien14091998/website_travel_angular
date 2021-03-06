import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberService } from "../../share/member_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-detail-member-info',
  templateUrl: './detail-member-info.component.html',
  styleUrls: ['./detail-member-info.component.css']
})
export class DetailMemberInfoComponent implements OnInit {

  dataUser: any = {};
  domain = environment.API_URL;
  user_name: string;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    
  ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getUserByUserId(params['user_id']);
      })
  }

  getUserByUserId(user_id: String) {
    this.memberService.getUserByUserId(
      user_id
    ).subscribe(
      (data) => {
        //data.images = data.images.split('|')
        this.dataUser = data
        console.log(this.dataUser);
      }, err => { console.log(err) }
    );
  }

}
