import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from "../../../authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-detail-place-schedule',
  templateUrl: './detail-place-schedule.component.html',
  styleUrls: ['./detail-place-schedule.component.css']
})
export class DetailPlaceScheduleComponent implements OnInit {
  dataDetailSchedule: any = [];
  domain = environment.API_URL;
  dataUser = []
  dataUserCreate
  user: any = '';
  createCommentForm: FormGroup;
  trip_ID
  dataListComment: any = []
  comment_id
  content

  //delete
  postDeleteIndex: number;
  //delete
  commentDeleteIndex: number;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: MemberScheduleService,
    private toastr: ToastrService,
    public auth: AuthenticationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)
    this.route.params.subscribe(
      (params) => {
        this.getScheduleId(params['trip_id']);
      })
    this.initForm();
  }
  getScheduleId(trip_id: string) {
    this.trip_ID = trip_id
    this.scheduleService.getScheduleById(
      trip_id
    ).subscribe(
      (data) => {
        this.dataDetailSchedule = data.map(p => {
          if (p.vehicle != null) {
            p.vehicle = p.vehicle.split('|')
          }
          p.images = p.images.split('|')
          return p
        })
        this.getAllCommentByTripId()
      }, err => { console.log(err) }
    );

    var trip_id_1 = {
      'trip_id': trip_id
    }
    this.scheduleService.getUserByTripId(trip_id_1).subscribe(
      (data) => {
        this.dataUser = data
        // console.log(this.dataUser);
      }
    )
    this.scheduleService.getUserCreateByTripId(trip_id_1).subscribe(
      (data) => {
        this.dataUserCreate = data[0]
        console.log(this.dataUserCreate);

      }
    )

  }

  //delete schedule-detail
  deleteScheduleDetail(trip_detail_id: string) {
    this.scheduleService.deleteScheduleDetail(trip_detail_id).subscribe(
      () => {
        this.dataDetailSchedule.splice(this.postDeleteIndex, 1);
        this.postDeleteIndex = undefined;
        this.toastr.success('thành công', 'Xóa');

      }, () => {
        this.toastr.error('thất bại', 'Xóa');
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
      'trip_id': this.trip_ID
    }

    this.scheduleService.createCommentTrip(
      body
    ).subscribe(
      (data) => {

        this.dataListComment.unshift(data);
        this.createCommentForm.patchValue({ content: '' })
      },
      err => {
      }
    )
  }
  // lấy tất cả comment by trip id
  getAllCommentByTripId() {
    var trip_id = this.trip_ID

    this.scheduleService.getAllCommentByTripId(
      trip_id
    ).subscribe(
      (data) => {
        console.log(data);

        this.dataListComment = data
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
    this.comment_id
    document.getElementById('updateConment').style.display = "none";
    var body = {
      'comment_id': this.comment_id,
      'content': content,
      'trip_id': this.trip_ID,
    }

    this.scheduleService.updateCommentTripByid(
      body
    ).subscribe(
      (data) => {
        console.log(data)
        this.dataListComment = data;

        // location.reload()
      }
    )
  } 
  deleteComment(comment_id: string) {
    this.scheduleService.deleteComment(comment_id).subscribe(
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
