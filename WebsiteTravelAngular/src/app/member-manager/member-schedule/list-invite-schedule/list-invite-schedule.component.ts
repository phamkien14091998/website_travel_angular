import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from "../../../authentication.service";
import { MemberScheduleService } from "../../share/member_schedule_service.service";

@Component({
  selector: 'app-list-invite-schedule',
  templateUrl: './list-invite-schedule.component.html',
  styleUrls: ['./list-invite-schedule.component.css']
})
export class ListInviteScheduleComponent implements OnInit {
  dataListSchedule: any = [];
  domain = environment.API_URL;
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';
  //delete
  postDeleteIndex: number;
  friends

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

  getListScheduleByUser() {
    const user_id = {
      'user_id': this.user.user_id
    }

    this.scheduleService.getInvateSchedule(
      user_id
    ).subscribe(
      (data) => {
        this.dataListSchedule = data
        console.log(this.dataListSchedule);


      }, err => { console.log(err) }
    );
  }
  //delete schedule
  deleteSchedule(trip_id: string) {
    this.scheduleService.deleteSchedule(trip_id).subscribe(
      () => {
        this.dataListSchedule.splice(this.postDeleteIndex, 1);
        this.postDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa lịch trình');

      }, () => {
        this.toastr.error('thất bại', 'Xóa lịch trình');
      }
    )
  }

}
