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

  // số sao bài viết
  currentRate = 0;
  currentNew = 0  // số đánh giá mà user mới đánh giá
  dataListrate: any = [] // danh sách tất cả đánh giá
  // 
  comment_id
  content


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

        this.getAllCommentByPostId()
        this.checkUserRatingPost(); // kiểm tra xem user đã đánh giá bài viết chưa và đưa ngược lên để hiển thị
        this.getAllRatingPost();  // lấy ra tất cả đánh giá về bài post
        console.log(this.dataDetailPost);

        // update viewer xem bài viết
        this.updateViewer();

      }, err => { console.log(err) }
    );

  }
  // lấy tất cả comment by post id
  getAllCommentByPostId() {
    this.post_id = this.dataDetailPost?.post_id

    this.home_service.getAllCommentByPostId(  
      this.post_id
    ).subscribe(
      (data) => {
        console.log(data);

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
      (data) => {

        this.dataListComment.unshift(data);
        this.createCommentForm.patchValue({ content: '' })
        // location.reload()
      },
      err => {
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

  onRate(e) {

  }
  rate(e) {

  }
  // gửi sao lên lưu
  submitRating() {
    if (this.currentRate == 0) {
      this.toastr.error(' ', 'Bạn hãy đánh giá từ 1-5 sao !');
      return;
    }

    var body = {
      'point': this.currentRate,
      'post_id': this.dataDetailPost?.post_id,
      'user_id': this.user.user_id
    }

    this.home_service.createRating(
      body
    ).subscribe(
      (data) => {

        this.currentNew = data.point // khi gửi sao lên thì sẽ lấy đc point và gán lại để button bên view nó ẩn

        this.dataListrate.unshift(data);
        this.toastr.success('thành công ', 'Đánh giá  bài viết');
      }, () => {
        this.toastr.success('', 'Chọn số sao trước khi đánh giá');
      }
    )
  }
  // sửa đánh giá của user cho bài viết 
  updateRating() {
    var body = {
      'point': this.currentNew,
      'post_id': this.dataDetailPost?.post_id,
      'user_id': this.user.user_id
    }

    this.home_service.updateRating(
      body
    ).subscribe(
      (data) => {

        this.dataListrate.splice(data, 1);
        this.dataListrate.unshift(data);
        this.toastr.success('thành công ', 'Sửa đánh giá  bài viết');
      }, () => {

      }
    )
  }

  // kiểm ta xem user đang đăng nhập đã đánh giá bài viết đó hay chưa 
  // (nếu đánh giá rồi thì hiển ra kết qua đánh giá và ẩn cái nút thêm đánh giá thôi)
  checkUserRatingPost() {
    // lấy đc id bài post và user_id đang đưng nhập để gửi xuống kiếm tra
    var body = {
      'post_id': this.dataDetailPost.post_id,
      'user_id': this.user?.user_id
    }

    this.home_service.checkUserRatingPost(body).subscribe(
      (data) => {
        if (data == 0) {
          this.currentNew = 0
        }
        if (data.point) {
          this.currentNew = data.point
        }
      }
    )
  }

  // lấy ra tất cả đánh giá
  getAllRatingPost() {
    var post_id = this.dataDetailPost?.post_id
    var body = {
      'post_id': post_id
    }

    this.home_service.getAllRatingPost(
      body
    ).subscribe(
      (data) => {
        this.dataListrate = data;

      }
    )
  }
  // update viewer xem baif vieets
  updateViewer() {
    var viewer_new = this.dataDetailPost?.viewer + 1;
    console.log(viewer_new);

    var body = {
      'post_id': this.dataDetailPost?.post_id,
      'viewer': viewer_new
    }
    this.home_service.updateViewer(
      body
    ).subscribe(
      () => {

      }
    )
  }
  // update comment 1
  openUpdateComment(id, ct) {
    document.getElementById('updateConment').style.display = "block";
    this.comment_id = id
    this.content = ct
  }
  // hủy cmt
  cancel() {
    document.getElementById('updateConment').style.display = "none";
  }
  // update comment 2
  updateCMT() {
    var content = (<HTMLInputElement>document.getElementById("content")).value;
    if (content == "") {
      this.toastr.error('', 'Bình luận không được để trống');
      return;
    }
    this.comment_id
    document.getElementById('updateConment').style.display = "none";
    var body = {
      'comment_id': this.comment_id,
      'content': content,
      'post_id': this.dataDetailPost?.post_id,
    }

    this.home_service.updateCommentByid(
      body
    ).subscribe(
      (data) => {
        console.log(data)
        this.dataListComment = data;

        // location.reload()
      }
    )

  }


}

