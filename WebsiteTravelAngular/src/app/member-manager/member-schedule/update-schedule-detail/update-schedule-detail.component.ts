import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-schedule-detail',
  templateUrl: './update-schedule-detail.component.html',
  styleUrls: ['./update-schedule-detail.component.css']
})
export class UpdateScheduleDetailComponent implements OnInit {
  dataScheduleDetail: any = {};
  time_to: any = []
  time_stay: any = []
  data: any = ''

  domain = environment.API_URL;
  updateScheduleDetailForm: FormGroup;

  dataTimeHour = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ];
  dataTimeMinute = [
    '0', '10', '20', '30', '40', '50', '60'
  ];

  dataVehicle: any = []
  arrayVehicleForm: FormGroup
  dataArrayVehicle: any = []
  vehi: any = ""


  constructor(
    private route: ActivatedRoute,
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.getListProductPortfolio();
    this.route.params.subscribe(
      (params) => {
        this.getScheduleDetail(params['trip_detail_id']);
      })
    this.getListVehicle(); // laays danh sachs xe leen

  }

  // lấy ra danh sách vehicle
  getListVehicle() {
    this.scheduleService.getListVehicle().subscribe(
      (data) => {

        this.dataVehicle = data;
        console.log(this.dataVehicle);

      }
    )
  }
  initForm() {
    this.updateScheduleDetailForm = this.fb.group({
      time_to_h: ['0h'],
      time_to_p: ['0' + "'"],
      time_stay_h: ['0h'],
      time_stay_p: ['0' + "'"],
      note: [''],
    });
    this.arrayVehicleForm = this.fb.group({
      checkArray: this.fb.array([])
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.updateScheduleDetailForm.controls[fieldName].invalid &&
      (this.updateScheduleDetailForm.controls[fieldName].dirty || this.updateScheduleDetailForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updateScheduleDetailForm.controls[fieldName].errors.required;
  }
  // chi tiết lich trình
  getScheduleDetail(trip_id: string) {
    this.scheduleService.getTripDetail(
      trip_id
    ).subscribe(
      (data) => {

        data.vehicle = data.vehicle.split('|')
        this.dataVehicle = data.vehicle
        data.time_to = data.time_to.split('h')
        data.time_stay = data.time_stay.split('h')
        // this.time_to = data.time_to
        // this.time_stay = this.time_stay

        this.dataScheduleDetail = data

        this.updateScheduleDetailForm.patchValue({ 'time_to_h': this.dataScheduleDetail.time_to[0] + 'h' })
        this.updateScheduleDetailForm.patchValue({ 'time_to_p': this.dataScheduleDetail.time_to[1] })
        this.updateScheduleDetailForm.patchValue({ 'time_stay_h': this.dataScheduleDetail.time_stay[0] + 'h' })
        this.updateScheduleDetailForm.patchValue({ 'time_stay_p': this.dataScheduleDetail.time_stay[1] })
        this.updateScheduleDetailForm.patchValue({ 'note': this.dataScheduleDetail.note })

        this.arrayVehicleForm.patchValue(this.dataVehicle)
        console.log(this.arrayVehicleForm);


      }, err => { console.log(err) }
    );

  }

  onCheckboxChangeVehicle(e) {
    const checkArray: FormArray = this.arrayVehicleForm.get('checkArray') as FormArray;

    if (e.target.checked) {

      checkArray.push(new FormControl(e.target.name));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.name) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.dataArrayVehicle = checkArray.value

    console.log(this.dataArrayVehicle);

  }
  submitFormArrayVehicle() {

  }

  updateScheduleDetail() {
    this.time_to = this.updateScheduleDetailForm.value.time_to_h + this.updateScheduleDetailForm.value.time_to_p
    this.time_stay = this.updateScheduleDetailForm.value.time_stay_h + this.updateScheduleDetailForm.value.time_stay_p


    this.vehi = this.dataArrayVehicle.join('|')
    // lấy được và lưu nó thành thành object
    const body = {
      'time_to': this.time_to,
      'time_stay': this.time_stay,
      'note': this.updateScheduleDetailForm.value.note,
      'vehicle': this.vehi
    }

    this.scheduleService.updateScheduleDetail(
      this.dataScheduleDetail?.trip_detail_id,
      body
    ).subscribe(
      (data) => {
        this.toastr.success('Thành Công ', 'Cập Nhật Lịch Trình');
        this.router.navigateByUrl('/member/schedule/list');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Cập Nhật Lịch Trình');
      }
    )


  }



}
