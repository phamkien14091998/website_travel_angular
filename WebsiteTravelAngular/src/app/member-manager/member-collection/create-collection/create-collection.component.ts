import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
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
  arrayForm: FormGroup
  dataArrayPlace: any = []

  domain = environment.API_URL;
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';
  data: any = [] // lưu các địa điểm đã được chọn và lấy lên

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
    this.arrayForm = this.fb.group({
      checkArray: this.fb.array([])
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
    this.collectionService.getPlaceById(
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
    // console.log(this.arrayForm.value)
  }

  // tao collection
  createCollection() {
    const formData = new FormData();
    formData.append('collection_name', this.createCollectionForm.controls['collection_name'].value);
    formData.append('user_id', this.user.user_id);
    formData.append('famous_place_id_array', this.dataArrayPlace);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.collectionService.createCollection(
      formData
    ).subscribe(
      () => {
        this.toastr.success('thành công', 'Thêm Bộ Sưu Tập');
        this.router.navigateByUrl('/member/collection/list');
      },
      err => {
        this.toastr.error('đã tồn tại ', 'Tên Bộ Sưu tập');
      }
    )
  }


}
