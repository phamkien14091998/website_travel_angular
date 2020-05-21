import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { empty } from 'rxjs';
import { count } from 'rxjs/operators';
import * as moment from 'moment'



@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.css']
})
export class DetailScheduleComponent implements OnInit {
  options: { content: FormData };

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

  ///////////////////
  dataVehicle: any[] = []; // lưu danh sách xe lấy lên
  place_id_luu_arr: any = ''
  dataDetail_trip: any = []

  ///////////////////
  createForm: FormGroup  // form để lưu tất cả giá trị
  data_detail: any = ''

  //////////////////
  form: FormGroup;
  array: any = []


  // biến lưu vô localstore
  province_i: any = localStorage.getItem('province_id')
  trip_name = localStorage.getItem('trip_name');
  description = localStorage.getItem('description');
  day_start = localStorage.getItem('day_start');
  day_end = localStorage.getItem('day_end');

  number_day

  day_number_new: any = [];
  dataTimeHour = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ];
  dataTimeMinute = [
    '0', '10', '20', '30', '40', '50', '60'
  ];

  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';
  arrayVehicleForm: FormGroup;

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.diffDay();
    this.getListProvince();
    this.getListVehicle();
    this.initForm();
    // console.log(this.createDetailTripForm.value)
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
  }

  diffDay() {
    var a = moment(this.day_start);
    var b = moment(this.day_end);
    this.number_day = b.diff(a, 'days') // 1 
    console.log(this.number_day);
    

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
      time_to_h: ['0h'],
      time_to_p: ['0' + "'"],
      time_stay_h: ['0h'],
      time_stay_p: ['0' + "'"],
      note: [''],
      id_place: [this.place_id_luu_arr],
      vehicle: new FormArray([])
    });
    this.arrayVehicleForm = this.fb.group({
      checkArray: this.fb.array([])
    });
    // form lưu toàn bô giá trị
    this.createForm = this.fb.group({

    })

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
      let detail = this.dataDetail_trip.findIndex(d => d.famous_place_id == e.target.value)
      if (detail != -1) {
        this.dataDetail_trip.splice(detail, 1);
      }
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

    this.time_to = this.createDetailTripForm.value.time_to_h + this.createDetailTripForm.value.time_to_p
    this.time_stay = this.createDetailTripForm.value.time_stay_h + this.createDetailTripForm.value.time_stay_p
    let array = []
    for (let i = 0; i < this.createDetailTripForm.value.vehicle.length; i++) {
      if (this.createDetailTripForm.value.vehicle[i] == true) {
        array.push(this.dataVehicle[i].title);
      }
    }

    // lấy được và lưu nó thành thành object
    this.data_detail = {
      'time_to': this.time_to,
      'time_stay': this.time_stay,
      'note': this.createDetailTripForm.value.note,
      'vehicle': array.join('|'),
      'famous_place_id': this.place_id_luu_arr
    }

    let detail = this.dataDetail_trip.findIndex(d => d.famous_place_id == this.place_id_luu_arr)
    if (detail != -1) {
      this.dataDetail_trip.splice(detail, 1);
    }

    this.dataDetail_trip.push(this.data_detail);

    // lưu xong sau đó set cho form nó rỗng


    console.log(this.dataDetail_trip); // dữ liệu ở form detail và thêm vô mảng

    // set false 
    //  this.dataVehicle.forEach(el => {
    //   el.check = false;
    // })
    // console.log(this.dataVehicle);


  }
  // lấy ra danh sách vehicle
  getListVehicle() {
    this.scheduleService.getListVehicle().subscribe(
      (data) => {
        this.dataVehicle = data;

        this.dataVehicle.forEach((vehice, i) => {

          const control = new FormControl(false); // if first item set to true, else false
          (this.createDetailTripForm.controls.vehicle as FormArray).push(control);
        });


      })
  }
  // onCheckboxChangeVehicle(e) {
  //   const checkArray: FormArray = this.arrayVehicleForm.get('checkArray') as FormArray;

  //   if (e.target.checked) {

  //     checkArray.push(new FormControl(e.target.name));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.name) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }


  // }

  getIdModel(e) {
    let formArr = this.createDetailTripForm.controls['vehicle'] as FormArray;
    console.log(formArr);

    this.place_id_luu_arr = e.target.value

    let detail = this.dataDetail_trip.find(d => d.famous_place_id == e.target.value)
    if (detail) {
      let d_to = detail.time_to.split('h')
      let d_stay = detail.time_stay.split('h')

      this.createDetailTripForm.patchValue({ 'time_to_h': d_to[0] + 'h' })
      this.createDetailTripForm.patchValue({ 'time_to_p': d_to[1] })
      this.createDetailTripForm.patchValue({ 'time_stay_h': d_stay[0] + 'h' })
      this.createDetailTripForm.patchValue({ 'time_stay_p': d_stay[1] })
      this.createDetailTripForm.patchValue({ 'note': detail.note })
    } else {
      this.createDetailTripForm.patchValue({ 'time_to_h': '0h' })
      this.createDetailTripForm.patchValue({ 'time_to_p': "0'" })
      this.createDetailTripForm.patchValue({ 'time_stay_h': '0h' })
      this.createDetailTripForm.patchValue({ 'time_stay_p': "0'" })
      this.createDetailTripForm.patchValue({ 'note': '' })
    }
    for (let i = 0; i < formArr.length; ++i) {
      if (detail) {
        let vehicles = detail.vehicle.split('|')
        console.log(this.dataVehicle[i]['title']);

        if (vehicles.includes(this.dataVehicle[i]['title'])) {
          formArr.controls[i].setValue(true)
        } else {
          formArr.controls[i].setValue(false)
        }
      } else {
        formArr.controls[i].setValue(false)
      }
    }
    console.log(this.data);


  }

  //////////////////////
  // lưu toàn bộ giá trị xuống
  create() {

    const body = {
      'dataDetail_trip': this.dataDetail_trip,
      'trip_name': this.trip_name,
      'description': this.description,
      'day_start': this.day_start,
      'day_end': this.day_end,
      'user_id': this.user.user_id,
      'email': this.user.email
    }

    this.scheduleService.createSchedule(
      body
    ).subscribe(
      (data) => {
        this.toastr.success('Thành Công ', 'Thêm Lịch Trình');
        this.router.navigateByUrl('/member/schedule/list');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Thêm Lịch Trình');
      }
    )
  }



}
