import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberCollectionService } from "../../share/member_collection_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  options: { content: FormData };

  dataListProvince: any = [];
  province_name: any;
  dataListPlace: any = [];
  getPlaceForm: FormGroup;
  createCollectionForm: FormGroup

  domain = environment.API_URL;
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';

  constructor(
    private collectionService: MemberCollectionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getListProvince();
    this.initForm();
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
  }

  // get ra all tỉnh
  getListProvince() {
    this.collectionService.getProvince().subscribe(
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
    this.createCollectionForm = this.fb.group({
      collection_name: ['', Validators.required],
      famous_place_id: ['']
    })
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createCollectionForm.controls[fieldName].invalid &&
      (this.createCollectionForm.controls[fieldName].dirty || this.createCollectionForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createCollectionForm.controls[fieldName].errors.required;
  }
  // get place by province
  getPlaceByProvince() {

    this.collectionService.getPlaceByProvinceId(
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

  // lấy ra các id địa điểm đã chọn và đẩy vào mảng
  getIdPlace(event) {
    console.log(event.target.name);


  }

  // taoj collection
  createCollection() {
    const formData = new FormData();
    formData.append('collection_name', this.createCollectionForm.controls['collection_name'].value);
    formData.append('user_id', this.user.user_id);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

  }



}
