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
  data_place: any = []
  data_place_arr: any = []
  total_place: any = '';
  addPlaceForm: FormGroup;
  // tạo form và khởi tạo array để lưu giá trị checkbox
  arrayForm: FormGroup
  dataArrayPlace: any = []
  data: any = []


  // biến lưu vô localstore
  province_i: any = localStorage.getItem('province_id')
  trip_name = localStorage.getItem('trip_name');
  description = localStorage.getItem('description');
  day_number = localStorage.getItem('day_number');

  day_number_new: any = [];

  constructor(
    private scheduleService: MemberScheduleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getDayNumber();
    this.getListProvince();
    this.initForm();
    // this.getPlace();
  }

  getDayNumber() {
    // console.log(Number(this.day_number));
    for (let i = 1; i <= Number(this.day_number); i++) {
      this.day_number_new.push(i);
    }
    // console.log(this.day_number_new);
  }

  congNgay(event: any) {

    console.log("vo");
    let d = event.target.value;
    console.log(d);
    // this.day_number_new.setDate(d.getDate + 1)
    // console.log(this.day_number_new);

  }
  // get ra all tỉnh
  getListProvince() {
    this.scheduleService.getProvince().subscribe(
      (data) => {
        this.dataListProvince = data;
        // console.log(data);
      }
    )
  }
  initForm() {
    this.getPlaceForm = this.fb.group({
      province_id: ['']
    });
    this.arrayForm = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  ////////////////////////
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
    // for(var i=0;i< this.dataArrayPlace.length ; i++ ){
    this.scheduleService.getPlaceById(
      this.dataArrayPlace
    ).subscribe(
      (data) => {
        // console.log(data);
        this.data = data
        for (var i = 0; i < data.length; i++) {
          this.data_place = data[i]
        }
        this.data_place_arr.push(this.data_place)
        console.log(this.data);

        // console.log(this.data_place_arr);
      }
    )
    // }

  }
  // submit form checkbox để lấy ra tập giá trị đã check
  submitFormArray() {

  }
  ////////////////////////
  // get place by province (danh sách địa điểm)
  getPlaceByProvince() {
    // luư tỉnh vào localstore
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
  // getPlace(){
  //   for(var i=0;i< this.dataArrayPlace.length ; i++ ){
  //     this.scheduleService.getPlaceById(
  //       this.dataArrayPlace[i]
  //       ).subscribe(
  //       (data)=>{
  //         this.data_place = data.map(p => {
  //           p.images = p.images.split("|")
  //           return p;
  //         });
  //         this.data_place_arr.push(data)
  //         console.log(this.data_place_arr);
  //       }
  //     )
  //   }
  // }




}
