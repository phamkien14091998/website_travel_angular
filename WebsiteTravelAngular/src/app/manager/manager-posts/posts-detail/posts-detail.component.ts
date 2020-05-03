import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ManagerPostService } from "../../share/manager_post.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {
  options: { content: FormData };

  dataDetailPost: any = {};
  domain = environment.API_URL;
  duyetOrHuyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: ManagerPostService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getPostId(params['post_id']);
      })
    this.initForm();
  }
  // chi tiet bai post
  getPostId(post_id: string) {
    this.postService.getPostById(
      post_id
    ).subscribe(
      (data) => {
        data.images = data.images.split('|')
        this.dataDetailPost = data
        console.log(this.dataDetailPost);

      }, err => { console.log(err) }
    );

  }
  initForm() {
    this.duyetOrHuyForm = this.fb.group({
      approved: [''],
      notApproved: [''],
    });
  }
  duyetOrHuy() {
    const formData = new FormData();
    formData.append('approved', this.duyetOrHuyForm.controls['approved'].value);
    formData.append('notApproved', this.duyetOrHuyForm.controls['notApproved'].value);
    formData.append('post_id', this.dataDetailPost.post_id);

    this.options = { content: formData };

    this.postService.approvedOrNotApprovedPost(
      formData
    ).subscribe(
      () => {
        this.toastr.success('', 'Thành Công');
        this.router.navigateByUrl('/manager/posts');

      }, err => {
        this.toastr.error(' ', 'Thất Bại');
      }
    );

  }

}
