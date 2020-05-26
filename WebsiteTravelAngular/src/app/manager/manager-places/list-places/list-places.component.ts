import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { ManagerPlaceService } from "../../share/manager_place.service";

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})
export class ListPlacesComponent implements OnInit {
  dataListPlace: any = [];
  dataProvince: any = [];
  domain = environment.API_URL;
  searchPlaceForm: FormGroup;

  //delete
  placeDeleteIndex: number;

  constructor(
    private placeService: ManagerPlaceService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListPlace();
    this.getProvince();
  }

  initForm() {
    this.searchPlaceForm = this.fb.group({
      title: [''],
      province_id: [''],
    });
  }
  // get all place
  getListPlace() {
    this.placeService.getListPlace().subscribe(
      (data) => {
        this.dataListPlace = data

      }, err => { console.log(err) }
    );
  }
  // get all provinces
  getProvince() {
    this.placeService.getProvince().subscribe(
      (data) => {
        this.dataProvince = data;
      }
    );
  }
  //delete product 
  deletePlace(famous_place_id: string) {
    this.placeService.deletePlace(famous_place_id).subscribe(
      () => {
        this.dataListPlace.splice(this.placeDeleteIndex, 1);
        this.placeDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa địa điểm');

      }, () => {
        this.toastr.error('thất bại', 'Xóa địa điểm');
      }
    )
  }

  searchPlace() {
    this.placeService.searchPlaceByTitleAndProvinId(
      this.searchPlaceForm.value

    ).subscribe(
      (data) => {
        this.dataListPlace = data
        // .map(p => {
        //   p.images = p.images.split("|")
        //   return p;
        // })
      }, err => { console.log(err) }
    );

  }

}
