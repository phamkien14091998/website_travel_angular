import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { empty } from 'rxjs';
import { count } from 'rxjs/operators';



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
  dataVehicle: any = []; // lưu danh sách xe lấy lên
  arrayVehicleForm: FormGroup
  dataArrayVehicle: any = []
  dataVehicleArr: any = [] // lưu dữ liệu danh xe đã chọn
  place_id_luu_arr: any = ''
  dataDetail_trip: any = []

  ///////////////////
  createForm: FormGroup  // form để lưu tất cả giá trị
  data_detail: any = ''

  //////////////////


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

  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';

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
    this.getListVehicle();
    this.initForm();
    // console.log(this.createDetailTripForm.value)
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
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
      id_place: [this.place_id_luu_arr]
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

    // lấy được và lưu nó thành thành object
    this.data_detail = {
      'time_to': this.time_to,
      'time_stay': this.time_stay,
      'note': this.createDetailTripForm.value.note,
      'vehicle': this.dataArrayVehicle.join('|'),
      'famous_place_id': this.place_id_luu_arr
    }
    // nếu mà không nhập giá trị trong data_detail (chưa xong)
    // if (empty(this.data_detail)) {
    //   this.data_detail = {
    //     'time_to': '',
    //     'time_stay': '',
    //     'note': '',
    //     'vehicle': '',
    //     'famous_place_id': this.place_id_luu_arr
    //   }

    // }

    this.dataDetail_trip.push(this.data_detail);

    // lưu xong sau đó set cho form nó rỗng
    this.createDetailTripForm.patchValue({ 'time_to_h': '0h' })
    this.createDetailTripForm.patchValue({ 'time_to_p': "0'" })
    this.createDetailTripForm.patchValue({ 'time_stay_h': '0h' })
    this.createDetailTripForm.patchValue({ 'time_stay_p': "0'" })
    this.createDetailTripForm.patchValue({ 'note': '' })

    console.log(this.dataDetail_trip); // dữ liệu ở form detail và thêm vô mảng
    // sau khi lấy đc vehicle thì set null cho nó
    // this.arrayVehicleForm.reset();
    // this.arrayVehicleForm.get('checkArray').patchValue([{}])

    // for (let i = 0; i < this.dataArrayVehicle.length; i++) {
    //   this.arrayVehicleForm.clearAsyncValidators;
    //   console.log(this.dataArrayVehicle.removeAt(i));

    // }

    // const dataArrayVehicle = (<FormArray>this.arrayVehicleForm.get('checkArray'));
    // for (let i = 0; i < dataArrayVehicle.length; i++) {
    //   dataArrayVehicle.removeAt(i);
    // }
    // // this.arrayVehicleForm.get('checkArray').setValue(this.dataArrayVehicle);


  }
  // lấy ra danh sách vehicle
  getListVehicle() {
    this.scheduleService.getListVehicle().subscribe(
      (data) => {
        this.dataVehicle = data;
      }
    )
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

  getIdModel(e) {

    this.place_id_luu_arr = e.target.value;
    console.log(this.place_id_luu_arr);

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
      'user_id': this.user.user_id
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
