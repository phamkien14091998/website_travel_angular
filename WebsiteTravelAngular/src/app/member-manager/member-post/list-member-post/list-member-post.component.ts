import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberPostService } from "../../share/member_post_service.service";
import { AuthenticationService } from "../../../authentication.service";

@Component({
  selector: 'app-list-member-post',
  templateUrl: './list-member-post.component.html',
  styleUrls: ['./list-member-post.component.css']
})
export class ListMemberPostComponent implements OnInit {
  options: { content: FormData };

  dataListPost: any = [];
  searchPostForm: FormGroup;

  //delete
  postDeleteIndex: number;

  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';

  constructor(
    private postService: MemberPostService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.searchPost();
  }

  initForm() {
    this.searchPostForm = this.fb.group({
      bai_duyet: [''],
      bai_chua_duyet: [''],
      bai_huy: ['']
    });
  }

  searchPost() {
    const formData = new FormData();

    formData.append('user_id', this.user.user_id);
    formData.append('bai_duyet', this.searchPostForm.value.bai_duyet);
    formData.append('bai_chua_duyet', this.searchPostForm.value.bai_chua_duyet);
    formData.append('bai_huy', this.searchPostForm.value.bai_huy);
    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    this.postService.searchPost(
      formData
    ).subscribe(
      (data) => {
        this.dataListPost = data
      }, err => { console.log(err) }
    );
  }

  //delete post
  deletePost(post_id: string) {
    this.postService.deletePost(post_id).subscribe(
      () => {
        this.dataListPost.splice(this.postDeleteIndex, 1);
        this.postDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa bài viết');

      }, () => {
        this.toastr.error('thất bại', 'Xóa bài viết');
      }
    )
  }

}   
