import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberPostService } from "../../share/member_post_service.service";

@Component({
  selector: 'app-create-member-post',
  templateUrl: './create-member-post.component.html',
  styleUrls: ['./create-member-post.component.css']
})
export class CreateMemberPostComponent implements OnInit {

  options: { content: FormData };

  dataProvince: any = [];
  dataPlace: any = [];
  dataCollection: any = [];
  createPostForm: FormGroup;
  createProvinceForm: FormGroup;
  myFiles: string[] = [];
  file: string;

  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';

  // tạo giờ mở đóng cửa 
  date_array = [
    '0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00',
    '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
  ];

  constructor(
    private postService: MemberPostService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProvince();
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
  }

  initForm() {
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      duration: ['', Validators.required],
      fare: ['', [Validators.required, Validators.min(0)]],
      profile: [''],
      famous_place_id: ['', Validators.required],
      gaits: [''],
      items: [''],
      home_stay: [''],
      visits: [''],
      activitis: [''],
      note: ['']
    });

    this.createProvinceForm = this.fb.group({
      province_id: ['', Validators.required],
    })
  }

  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createPostForm.controls[fieldName].invalid &&
      (this.createPostForm.controls[fieldName].dirty || this.createPostForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createPostForm.controls[fieldName].errors.required;
  }
  // kiểm tra min ký tự 
  min(fieldName): boolean {
    return this.createPostForm.controls[fieldName].errors.min;
  }
  getProvince() {
    this.postService.getProvince().subscribe(
      (data) => {

        this.dataProvince = data;
      }
    )
  }

  createProvince() {
    this.postService.getPlaceByProvinceId(
      this.createProvinceForm.value
    ).subscribe(
      (data) => {

        this.dataPlace = data;
      },
      err => { console.log(err) }
    )
  }

  createPost() {
    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('fileUpload[]', this.myFiles[i]);

    }
    formData.append('title', this.createPostForm.controls['title'].value);
    formData.append('famous_place_id', this.createPostForm.controls['famous_place_id'].value);
    formData.append('duration', this.createPostForm.controls['duration'].value);
    formData.append('date_start', this.createPostForm.controls['date_start'].value);
    formData.append('date_end', this.createPostForm.controls['date_end'].value);
    formData.append('fare', this.createPostForm.controls['fare'].value);
    formData.append('gaits', this.createPostForm.controls['gaits'].value);
    formData.append('items', this.createPostForm.controls['items'].value);
    formData.append('home_stay', this.createPostForm.controls['home_stay'].value);
    formData.append('visits', this.createPostForm.controls['visits'].value);
    formData.append('activitis', this.createPostForm.controls['activitis'].value);
    formData.append('note', this.createPostForm.controls['note'].value);
    formData.append('user_id', this.user.user_id);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    this.postService.createPost(
      formData

    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Thêm Bài Viết');
        this.router.navigateByUrl('/member/post/list');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Thêm Bài Viết');
      }
    )
  }

  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.createPostForm.get('profile').setValue(this.myFiles);
    }
  }


}
