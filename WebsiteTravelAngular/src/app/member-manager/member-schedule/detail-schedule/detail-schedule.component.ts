import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  }

  // get ra all tỉnh
  getListProvince() {
    this.scheduleService.getProvince().subscribe(
      (data) => {
        this.dataListProvince = data;
        console.log(data);

      }
    )

  }
  initForm() {
    this.getPlaceForm = this.fb.group({
      province_id: ['']

    });
  }
  // get place by province
  getPlaceByProvince() {
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



}
