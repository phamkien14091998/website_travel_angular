import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-place-schedule',
  templateUrl: './detail-place-schedule.component.html',
  styleUrls: ['./detail-place-schedule.component.css']
})
export class DetailPlaceScheduleComponent implements OnInit {
  dataDetailSchedule: any = [];
  domain = environment.API_URL;

  //delete
  postDeleteIndex: number;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: MemberScheduleService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getScheduleId(params['trip_id']);
      })
  }
  getScheduleId(trip_id: string) {

    this.scheduleService.getScheduleById(
      trip_id
    ).subscribe(
      (data) => {
        console.log(data);

        this.dataDetailSchedule = data.map(p => {
          if (p.vehicle != null) {
            p.vehicle = p.vehicle.split('|')
          }
          p.images = p.images.split('|')
          return p
        })

        // console.log(this.dataDetailSchedule);

      }, err => { console.log(err) }
    );

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



}
