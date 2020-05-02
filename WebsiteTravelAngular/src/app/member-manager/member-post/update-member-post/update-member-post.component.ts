import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberPostService } from "../../share/member_post_service.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-member-post',
  templateUrl: './update-member-post.component.html',
  styleUrls: ['./update-member-post.component.css']
})
export class UpdateMemberPostComponent implements OnInit {

  dataDetailPost: any = [];
  domain = environment.API_URL;

  options: { content: FormData };
  updatePostForm: FormGroup;
  myFiles: string[] = [];
  file: string;

  date_array = [
    '0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00',
    '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
  ];

  constructor(
    private route: ActivatedRoute,
    private postService: MemberPostService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        this.getDetailPostById(params['post_id']);
      })
  }


  // chi tiết sản phẩm
  getDetailPostById(post_id: string) {
    this.postService.getPostById(
      post_id
    ).subscribe(
      (data) => {
        // this.updateProductForm.controls['product_name'].setValue(this.data_detailProduct['product_name']);
        data.images = data.images.split('|')
        this.dataDetailPost = data

        this.updatePostForm.patchValue(this.dataDetailPost)

        console.log(this.dataDetailPost);

      }, err => { console.log(err) }
    );

  }

  initForm() {
    this.updatePostForm = this.fb.group({
      post_title: ['', Validators.required],
      location: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      duration: ['', Validators.required],
      fare: ['', Validators.required],
      profile: [''],
      famous_place_id: ['', Validators.required],
      gaits: [''],
      items: [''],
      home_stay: [''],
      visits: [''],
      activitis: [''],
      note: ['']
    });
  }



  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.updatePostForm.get('profile').setValue(this.myFiles);
    }
  }

  updatePost() {

    const formData = new FormData();
    // kiểm tra nếu có chọn file
    if (this.myFiles.length) {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('fileUpload[]', this.myFiles[i]);
      }
    } else {
      formData.append('images', this.dataDetailPost.images);
    }
    // kiểm tra nếu có theoo tác trong form hay không
    // if (!this.updatePostForm.controls['title'].value) {
    //   formData.append('title', this.dataDetailPost.post_title);
    // } else {
    formData.append('title', this.updatePostForm.controls['post_title'].value);
    formData.append('date_start', this.updatePostForm.controls['date_start'].value);
    formData.append('date_end', this.updatePostForm.controls['date_end'].value);
    formData.append('fare', this.updatePostForm.controls['fare'].value);
    formData.append('duration', this.updatePostForm.controls['duration'].value);
    formData.append('gaits', this.updatePostForm.controls['gaits'].value);
    formData.append('items', this.updatePostForm.controls['items'].value);
    formData.append('home_stay', this.updatePostForm.controls['home_stay'].value);
    formData.append('visits', this.updatePostForm.controls['visits'].value);
    formData.append('activitis', this.updatePostForm.controls['activitis'].value);
    formData.append('note', this.updatePostForm.controls['note'].value);

    formData.append('post_id', this.dataDetailPost.post_id);

    console.log(this.dataDetailPost.post_id);


    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    console.log(formData);

    this.postService.updatePost(
      this.dataDetailPost?.post_id,
      formData
    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Sửa Bài Đăng');
        this.router.navigateByUrl('/member/post/list');
      },
      err => {
        this.toastr.error('Thất Bại ', 'Sửa Bài Đăng');
      }
    )
  }

}