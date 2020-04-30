import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { MemberPostService } from "../../share/member_post_service.service";


@Component({
  selector: 'app-list-member-post',
  templateUrl: './list-member-post.component.html',
  styleUrls: ['./list-member-post.component.css']
})
export class ListMemberPostComponent implements OnInit {

  dataListPost: any = [];   
  searchPostForm: FormGroup;

  constructor(
    private postService: MemberPostService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {   
    this.initForm();
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
    this.postService.searchPost(
      this.searchPostForm.value
    ).subscribe(
      (data) => {       
        this.dataListPost = data
      }, err => { console.log(err) }
    );
  }

}   
