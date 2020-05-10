import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from "../../../authentication.service";
import { MemberScheduleService } from "../../share/member_schedule_service.service";

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {
  dataListSchedule: any = [];
  domain = environment.API_URL;
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.getListScheduleByUser();
  }


  // get all collection
  getListScheduleByUser() {
    // console.log(this.user.user_id);

    this.scheduleService.getListScheduleByUser(
      this.user.user_id
    ).subscribe(
      (data) => {
        console.log(data);


        this.dataListSchedule = data
      }, err => { console.log(err) }
    );
  }



}
