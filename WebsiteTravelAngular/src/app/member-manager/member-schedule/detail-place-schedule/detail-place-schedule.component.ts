import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberScheduleService } from "../../share/member_schedule_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-detail-place-schedule',
  templateUrl: './detail-place-schedule.component.html',
  styleUrls: ['./detail-place-schedule.component.css']
})
export class DetailPlaceScheduleComponent implements OnInit {
  dataDetailSchedule: any = [];
  domain = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: MemberScheduleService
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
          p.vehicle = p.vehicle.split('|')
          p.images = p.images.split('|')
          return p
        })

        // console.log(this.dataDetailSchedule);

      }, err => { console.log(err) }
    );

  }

}
