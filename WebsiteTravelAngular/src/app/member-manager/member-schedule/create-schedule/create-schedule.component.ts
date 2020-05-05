import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberScheduleService } from "../../share/member_schedule_service.service";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  dataCollection: any = [];
  createScheduleForm: FormGroup;

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.createScheduleForm = this.fb.group({
      trip_name: ['', Validators.required],
      description: ['', Validators.required],
      day_number: ['', Validators.required]

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

  createSchedule() {

    // lưu trữ tạm thời
    localStorage.setItem('trip_name', this.createScheduleForm.value.trip_name);
    localStorage.setItem('description', this.createScheduleForm.value.description);
    localStorage.setItem('day_number', this.createScheduleForm.value.day_number);

    // chuyển tới trang trip-detail
    this.router.navigateByUrl('/member/schedule/detail');
  }

}
