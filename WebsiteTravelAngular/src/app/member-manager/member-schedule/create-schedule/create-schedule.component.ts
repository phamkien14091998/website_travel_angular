import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment'
import { formatDate } from '@angular/common';

import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  dataCollection: any = [];
  createScheduleForm: FormGroup;
  today = new Date();
  jstoday = '';
  user: any = '';
  dataUser: any = [];
  domain = environment.API_URL;
  // tạo form và khởi tạo array để lưu giá trị checkbox
  arrayForm: FormGroup
  dataArrayUser: any = [];

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService,
  ) {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.initForm();
    this.getAllUser();

  }

  initForm() {
    this.arrayForm = this.fb.group({
      checkArray: this.fb.array([])
    });
    this.createScheduleForm = this.fb.group({
      trip_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      day_start: ['', Validators.required],
      day_end: ['', Validators.required],
      user: new FormArray([])
    });
  }

  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createScheduleForm.controls[fieldName].invalid &&
      (this.createScheduleForm.controls[fieldName].dirty || this.createScheduleForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createScheduleForm.controls[fieldName].errors.required;
  }
  // kiểm tra min ký tự 
  min(fieldName): boolean {
    return this.createScheduleForm.controls[fieldName].errors.minlength;
  }
  // kiểm tra max ký tự 
  max(fieldName): boolean {
    return this.createScheduleForm.controls[fieldName].errors.maxlength;
  }
  // get all user
  getAllUser() {
    var user_id = {
      'user_id': this.user.user_id
    }
    this.scheduleService.getAllUser(user_id).subscribe(
      (data) => {
        this.dataUser = data
      }
    )
  }
  // xử lý thay đổi khi người dùng checkbox vào
  onCheckboxChange(e) {

    const checkArray: FormArray = this.arrayForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.dataArrayUser = checkArray.value
    // console.log(this.dataArrayUser);

  }

  createSchedule() {

    var dataUse = this.dataArrayUser.join("|");

    // lưu trữ tạm thời   
    localStorage.setItem('trip_name', this.createScheduleForm.value.trip_name);
    localStorage.setItem('description', this.createScheduleForm.value.description);
    localStorage.setItem('day_start', this.createScheduleForm.value.day_start);
    localStorage.setItem('day_end', this.createScheduleForm.value.day_end);
    localStorage.setItem('friends', dataUse);

    var a = moment(localStorage.getItem('day_start'));
    var b = moment(localStorage.getItem('day_end'));
    var today = moment(this.jstoday);

    var number_day = b.diff(a, 'days') // số ngày
    var check_day_current = a.diff(today, 'days') // ngày bắt đầu trừ ngày hiện tại


    if (check_day_current < 0) {
      this.toastr.error(' ', 'Ngày bắt đầu phải lớn hơn ngày hiện tại');
      return;
    }

    if (number_day <= 0) {
      this.toastr.error(' ', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
      return;
    }

    else if (number_day > 0 && check_day_current >= 0) {
      // chuyển tới trang trip-detail
      this.router.navigateByUrl('/member/schedule/detail');
    }

  }

}
