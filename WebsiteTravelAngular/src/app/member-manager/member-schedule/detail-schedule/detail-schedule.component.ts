import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";



@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.css']
})
export class DetailScheduleComponent implements OnInit {
  dataListProvince: any = [];
  getPlaceForm: FormGroup;
  dataListPlace: any = [];
  province_name: any;
  domain = environment.API_URL;
  famous_place_arr: any = []
  // data_place: any = []
  // data_place_arr: any = []
  addPlaceForm: FormGroup;
  // tạo form và khởi tạo array để lưu giá trị checkbox
  arrayForm: FormGroup
  dataArrayPlace: any = []
  data: any = [] // lưu dữ liệu danh sách địa điểm đã chọn

  createDetailTripForm: FormGroup // tao form submit detail place
  time_to: any = ''
  time_stay: any = ''
  vehicle: any = ''


  // biến lưu vô localstore
  province_i: any = localStorage.getItem('province_id')
  trip_name = localStorage.getItem('trip_name');
  description = localStorage.getItem('description');
  day_start = localStorage.getItem('day_start');
  day_end = localStorage.getItem('day_end');

  day_number_new: any = [];
  dataTimeHour = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ];
  dataTimeMinute = [
    '0', '10', '20', '30', '40', '50', '60'
  ];

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getListProvince();
    this.initForm();

  }

  // get ra all tỉnh
  getListProvince() {
    this.scheduleService.getProvince().subscribe(
      (data) => {
        this.dataListProvince = data;
      }
    )
  }
  initForm() {
    this.getPlaceForm = this.fb.group({
      province_id: ['']
    });
    this.arrayForm = this.fb.group({
      checkArray: this.fb.array([])
    });
    this.createDetailTripForm = this.fb.group({
      time_to_h: ['0'],
      time_to_p: ['0'],
      time_stay_h: ['0'],
      time_stay_p: ['0'],
      tau_hoa: [''],
      bus: [''],
      taxi: [''],
      xe_dap: [''],
      tau_thuy: [''],
      may_bay: [''],
      xe_may: [''],
      di_bo: [''],
      note: ['']

    });

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
    this.dataArrayPlace = checkArray.value
    console.log(this.dataArrayPlace);
    // truyền aray_place_id xuống để lấy lên các địa điểm đã chọn
    this.scheduleService.getPlaceById(
      this.dataArrayPlace
    ).subscribe(
      (data) => {
        console.log(data);
        this.data = data
      }
    )
  }

  // submit form checkbox để lấy ra tập giá trị đã check
  submitFormArray() {
  }

  // get place by province (danh sách địa điểm)
  getPlaceByProvince() {
    // lưu tỉnh vào localstore
    localStorage.setItem('province_id', this.getPlaceForm.value.province_id)
    this.scheduleService.getPlaceByProvinceId(
      this.getPlaceForm.value
    ).subscribe(
      (data) => {
        this.dataListPlace = data
          .map(p => {
            p.images = p.images.split("|")
            return p;
          });

        this.province_name = data[0].province_name
      }
    )
  }

  // thêm chi tiết cho địa điểm đó
  createDetailTrip() {

    if (this.createDetailTripForm.value.tau_hoa == true) {
      console.log('vo tau');
      console.log(this.createDetailTripForm.value);

      this.createDetailTripForm.value.tau_hoa = "Tàu hỏa"
    }
    if (this.createDetailTripForm.value.bus == true) {
      console.log('vo bus');
      this.createDetailTripForm.value.bus = "Bus"
    }
    if (this.createDetailTripForm.value.taxi == true) {
      console.log('vo taxi');
      this.createDetailTripForm.value.taxi = "Taxi/Car"
    }
    if (this.createDetailTripForm.value.xe_dap == true) {
      this.createDetailTripForm.value.xe_dap = "Xe đạp"
    }
    if (this.createDetailTripForm.value.tau_thuy == true) {
      this.createDetailTripForm.value.tau_thuy = "Tàu thủy"
    }
    if (this.createDetailTripForm.value.may_bay == true) {
      this.createDetailTripForm.value.may_bay = "Máy bay"
    }
    if (this.createDetailTripForm.value.xe_may == true) {
      this.createDetailTripForm.value.xe_may = "Xe máy"
    }
    if (this.createDetailTripForm.value.di_bo == true) {
      this.createDetailTripForm.value.di_bo = "Đi bộ"
    }

    this.time_to = this.createDetailTripForm.value.time_to_h + this.createDetailTripForm.value.time_to_p
    this.time_stay = this.createDetailTripForm.value.time_stay_h + this.createDetailTripForm.value.time_stay_p
    this.vehicle = this.createDetailTripForm.value.tau_hoa + '|' + this.createDetailTripForm.value.bus + '|' +
      this.createDetailTripForm.value.taxi + '|' + this.createDetailTripForm.value.xe_dap + '|' +
      this.createDetailTripForm.value.tau_thuy + '|' + this.createDetailTripForm.value.may_bay + '|' +
      this.createDetailTripForm.value.xe_may + '|' + this.createDetailTripForm.value.di_bo


    console.log(this.time_to);
    console.log(this.time_to);
    console.log(this.vehicle);



    // console.log(this.createDetailTripForm.value);
    // lưu vào localstore
    // localStorage.setItem('detail-trip',this.createDetailTripForm.value);
    // console.log(localStorage.getItem('detail-trip'));

  }

}
