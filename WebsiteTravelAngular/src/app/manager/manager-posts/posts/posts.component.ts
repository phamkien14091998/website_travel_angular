import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { ManagerPostService } from "../../share/manager_post.service";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  dataListPost: any = [];

  constructor(
    private postService: ManagerPostService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllPostChuaDuyet();
  }
  // get all post chua duyet
  getAllPostChuaDuyet() {
    this.postService.getAllPostChuaDuyet().subscribe(
      (data) => {
        this.dataListPost = data;

      }, err => { console.log(err) }
    );
  }

}
