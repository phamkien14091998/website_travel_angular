import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ManagerPlaceService } from "../../share/manager_place.service";

@Component({
  selector: 'app-create-places',
  templateUrl: './create-places.component.html',
  styleUrls: ['./create-places.component.css']
})
export class CreatePlacesComponent implements OnInit {
  options: { content: FormData };

  dataProvince: any = [];
  createPlaceForm: FormGroup;
  myFiles: string[] = [];
  file: string;
  // tạo giờ mở đóng cửa 
  date_array = [
    '0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00',
    '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
  ];

  constructor(
    private placeService: ManagerPlaceService,
    private fb: FormBuilder,   
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListProvince();
  }

  initForm() {
    this.createPlaceForm = this.fb.group({
      title: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      province_id: ['', Validators.required],
      description: [''],
      profile: ['']
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createPlaceForm.controls[fieldName].invalid &&
      (this.createPlaceForm.controls[fieldName].dirty || this.createPlaceForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createPlaceForm.controls[fieldName].errors.required;
  }

  // lấy ra danh sách các thể loại sản phẩm
  getListProvince() {
    this.placeService.getProvince().subscribe(
      (data) => {   
        this.dataProvince = data;
      }
    );

  }
  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.createPlaceForm.get('profile').setValue(this.myFiles);
    }
  }

  createPlace() {
    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('fileUpload[]', this.myFiles[i]);
    }
    formData.append('title', this.createPlaceForm.controls['title'].value);
    formData.append('date_start', this.createPlaceForm.controls['date_start'].value);
    formData.append('date_end', this.createPlaceForm.controls['date_end'].value);
    formData.append('province_id', this.createPlaceForm.controls['province_id'].value);
    formData.append('description', this.createPlaceForm.controls['description'].value);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    this.placeService.createPlace(
      formData

    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Thêm Địa Điểm');
        this.router.navigateByUrl('/manager/places');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Thêm Đại Điểm');
      }
    )
  }








}
