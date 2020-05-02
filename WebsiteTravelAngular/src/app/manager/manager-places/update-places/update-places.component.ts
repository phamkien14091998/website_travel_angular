import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ManagerPlaceService } from "../../share/manager_place.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-places',
  templateUrl: './update-places.component.html',
  styleUrls: ['./update-places.component.css']
})
export class UpdatePlacesComponent implements OnInit {
  dataDetailPlace: any = {};
  dataProvince: any = [];
  domain = environment.API_URL;

  options: { content: FormData };
  updatePlaceForm: FormGroup;
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
    private route: ActivatedRoute,
    private placeService: ManagerPlaceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getListProvince();
    this.route.params.subscribe(
      (params) => {
        this.getDetailPlace(params['famous_place_id']);
      })
  }
  // chi tiết địa điểm
  getDetailPlace(famous_place_id: string) {
    this.placeService.getDetailPlaceById(
      famous_place_id
    ).subscribe(
      (data) => {
        console.log(data);

        data.images = data.images.split('|')
        this.dataDetailPlace = data

        this.updatePlaceForm.patchValue(this.dataDetailPlace)

      }, err => { console.log(err) }
    );
  }
  // lấy ra danh sách các thể loại sản phẩm
  getListProvince() {
    this.placeService.getProvince().subscribe(
      ($data) => {
        this.dataProvince = $data;
      }
    );
  }
  initForm() {
    this.updatePlaceForm = this.fb.group({
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
    return this.updatePlaceForm.controls[fieldName].invalid &&
      (this.updatePlaceForm.controls[fieldName].dirty || this.updatePlaceForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updatePlaceForm.controls[fieldName].errors.required;
  }

  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.updatePlaceForm.get('profile').setValue(this.myFiles);
    }
  }

  updatePlace() {

    const formData = new FormData();
    // kiểm tra nếu có chọn file
    if (this.myFiles.length) {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('fileUpload[]', this.myFiles[i]);
      }
    } else {
      formData.append('images', this.dataDetailPlace.images);
    }
    // kiểm tra nếu có theoo tác trong form hay không
    // if (!this.updatePlaceForm.controls['title'].value) {
    //   formData.append('title', this.dataDetailPlace.title);
    // } else {
    formData.append('title', this.updatePlaceForm.controls['title'].value);
    formData.append('date_start', this.updatePlaceForm.controls['date_start'].value);
    formData.append('date_end', this.updatePlaceForm.controls['date_end'].value);
    formData.append('province_id', this.updatePlaceForm.controls['province_id'].value);
    formData.append('description', this.updatePlaceForm.controls['description'].value);

    formData.append('famous_place_id', this.dataDetailPlace.famous_place_id);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    console.log(formData);

    this.placeService.updatePlace(
      this.dataDetailPlace?.famous_place_id,
      formData
    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Sửa Địa Điểm');
        this.router.navigateByUrl('/manager/places');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Sửa Địa Điểm');
      }
    )
  }




}
