import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from "../../../authentication.service";
import { MemberScheduleService } from "../../share/member_schedule_service.service";

@Component({
  selector: 'app-list-schedule-before',
  templateUrl: './list-schedule-before.component.html',
  styleUrls: ['./list-schedule-before.component.css']
})
export class ListScheduleBeforeComponent implements OnInit {

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
  // get all collection
  getListScheduleByUser() {
    const user_id = {
      'user_id': this.user.user_id
    }

    this.scheduleService.getListScheduleByUserBefore(
      user_id
    ).subscribe(
      (data) => {
        this.dataListSchedule = data.map(p => {
          if (p.friends == null) {
            p.friends = ''
          } else {
            p.friends = p.friends.split("|") // trả về array user_id
            var arr_user_id = {
              'arr_user_id': p.friends
            }
            // hàm truyền aray xuống và lấy lên user_name theo id đó
            this.scheduleService.getUserNameById(arr_user_id).subscribe(
              (data) => {
                p.friends = data
              }
            )
          }
          return p;
        })
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

