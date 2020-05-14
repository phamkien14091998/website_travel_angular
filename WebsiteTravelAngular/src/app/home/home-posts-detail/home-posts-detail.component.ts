import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../authentication.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-posts-detail',
  templateUrl: './home-posts-detail.component.html',
  styleUrls: ['./home-posts-detail.component.css']
})
export class HomePostsDetailComponent implements OnInit {

  dataDetailPost: any = {};
  domain = environment.API_URL;
  post_id
  dataListComment: any = []
  createCommentForm: FormGroup;
  // khai báo để lưu giá trị user đang đăng nhập 
  user: any = '';
  //delete
  commentDeleteIndex: number;

  constructor(
    private route: ActivatedRoute,
    private home_service: HomeService,
    private fb: FormBuilder,
    public auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.route.params.subscribe(
      (params) => {
        this.getPostId(params['post_id']);

      })
    this.initForm();
  }

  getPostId(post_id: string) {

    this.home_service.getPostById(
      post_id
    ).subscribe(
      (data) => {
        data.images = data.images.split('|')
        this.dataDetailPost = data
        console.log(this.dataDetailPost);
        this.getAllCommentByPostId()

      }, err => { console.log(err) }
    );

  }
  // lấy tất cả comment by post id
  getAllCommentByPostId() {
    console.log(this.dataDetailPost);

    this.post_id = this.dataDetailPost?.post_id
    //console.log(this.post_id);

    this.home_service.getAllCommentByPostId(
      this.post_id
    ).subscribe(
      (data) => {
        // console.log(data);
        this.dataListComment = data
      }
    )
  }
  initForm() {
    this.createCommentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.createCommentForm.controls[fieldName].invalid &&
      (this.createCommentForm.controls[fieldName].dirty || this.createCommentForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.createCommentForm.controls[fieldName].errors.required;
  }
  createConment() {

    var body = {
      'content': this.createCommentForm.value.content,
      'user_id': this.user.user_id,
      'post_id': this.dataDetailPost.post_id
    }

    this.home_service.createComment(
      body
    ).subscribe(
      () => {
        // this.toastr.success('Thành Công ', 'Thêm Sản Phẩm');
        this.createCommentForm.patchValue({ content: '' })
        location.reload()
        // this.router.navigateByUrl('/detail-post/' + this.dataDetailPost.post_id);
      },
      err => {
        // this.toastr.error('', 'Bạn chưa đăng nhập');
      }
    )
  }
  //delete comment
  deleteComment(comment_id: string) {
    this.home_service.deleteComment(comment_id).subscribe(
      () => {
        this.dataListComment.splice(this.commentDeleteIndex, 1);
        this.commentDeleteIndex = undefined;
        // this.toastr.success('thành công', 'Xóa sản phẩm');

      }, () => {
        // this.toastr.error('thất bại', 'Xóa sản phẩm');
      }
    )
  }



}

