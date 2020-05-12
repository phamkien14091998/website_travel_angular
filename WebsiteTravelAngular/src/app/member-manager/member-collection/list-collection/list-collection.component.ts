import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from "../../../authentication.service";
import { MemberCollectionService } from "../../share/member_collection_service.service";



@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css']
})
export class ListCollectionComponent implements OnInit {
  dataListCollection: any = [];
  domain = environment.API_URL;
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';
  //delete
  postDeleteIndex: number;

  constructor(
    private collectionService: MemberCollectionService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.getListCollectionByUser();
  }

  // get all collection
  getListCollectionByUser() {
    // console.log(this.user.user_id);

    this.collectionService.getListCollectionByUser(
      this.user.user_id
    ).subscribe(
      (data) => {

        this.dataListCollection = data
      }, err => { console.log(err) }
    );
  }

  //delete collection
  deleteCollection(collection_id: string) {
    this.collectionService.deleteCollection(collection_id).subscribe(
      () => {
        this.dataListCollection.splice(this.postDeleteIndex, 1);
        this.postDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa Bộ Sưu Tập');

      }, () => {
        this.toastr.error('thất bại', 'Xóa Bộ Sưu Tập');
      }
    )
  }


}
