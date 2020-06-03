import { Component, OnInit } from '@angular/core';
import { MemberService } from "../share/member_service.service";
import { AuthenticationService } from "../../authentication.service";

@Component({
  selector: 'app-member-order',
  templateUrl: './member-order.component.html',
  styleUrls: ['./member-order.component.css']
})
export class MemberOrderComponent implements OnInit {

  dataListProduct: any = [];
  user: any = '';

  constructor(
    private memberService: MemberService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)
    this.getAllOrder();
  }

  getAllOrder() {
    this.memberService.getAllOrder(
      this.user?.user_id
    ).subscribe(
      (data) => {
        //data.images = data.images.split('|')
        this.dataListProduct = data 
        console.log(this.dataListProduct);
      }, err => { console.log(err) }
    );

  }

}
