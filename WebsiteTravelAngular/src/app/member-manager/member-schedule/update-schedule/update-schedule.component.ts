import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent implements OnInit {
  data_detailSchedule: any = {};

  domain = environment.API_URL;
  updateScheduleForm: FormGroup;

  today = new Date();
  jstoday = '';


  constructor(
    private route: ActivatedRoute,
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
  }

  ngOnInit(): void {
    this.initForm();
    // this.getListProductPortfolio();
    this.route.params.subscribe(
      (params) => {
        this.getDetailSchedule(params['trip_id']);
      })
  }
  initForm() {
    this.updateScheduleForm = this.fb.group({
      trip_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      day_start: ['', Validators.required],
      day_end: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.updateScheduleForm.controls[fieldName].invalid &&
      (this.updateScheduleForm.controls[fieldName].dirty || this.updateScheduleForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updateScheduleForm.controls[fieldName].errors.required;
  }
  // kiểm tra min ký tự 
  min(fieldName): boolean {
    return this.updateScheduleForm.controls[fieldName].errors.minlength;
  }
  // kiểm tra max ký tự 
  max(fieldName): boolean {
    return this.updateScheduleForm.controls[fieldName].errors.maxlength;
  }
  // chi tiết lich trình
  getDetailSchedule(trip_id: string) {
    this.scheduleService.getDetailTrip(
      trip_id
    ).subscribe(
      (data) => {

        this.data_detailSchedule = data
        this.updateScheduleForm.patchValue(this.data_detailSchedule)
        console.log(this.updateScheduleForm.value);

      }, err => { console.log(err) }
    );

  }
  updateSchedule() {

    var a = moment(this.updateScheduleForm.value.day_start);
    var b = moment(this.updateScheduleForm.value.day_end);
    var today = moment(this.jstoday);  // ngày hiện tại


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

    this.scheduleService.updateSchdule(
      this.data_detailSchedule?.trip_id,
      this.updateScheduleForm.value
    ).subscribe(
      () => {
        this.toastr.success('thành Công ', 'Sửa lịch trình');
        this.router.navigateByUrl('/member/schedule/list');
      },
      err => {
        this.toastr.error('thất Bại ', 'Sửa lịch trình');
      }
    )

  }




}
