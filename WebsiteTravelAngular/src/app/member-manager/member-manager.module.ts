import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from "../authentication.service";
import { AuthGuardService } from "./../auth-guard.service";
import { MemberPostService } from "./share/member_post_service.service";
import { MemberScheduleService } from "./share/member_schedule_service.service";
import { MemberCollectionService } from "./share/member_collection_service.service";

import { MemberManagerComponent } from "./member-manager.component";
import { ListMemberPostComponent } from "./member-post/list-member-post/list-member-post.component";
import { CreateMemberPostComponent } from "./member-post/create-member-post/create-member-post.component";
import { DetailMemberPostComponent } from './member-post/detail-member-post/detail-member-post.component';
import { UpdateMemberPostComponent } from "./member-post/update-member-post/update-member-post.component";

import { ListCollectionComponent } from './member-collection/list-collection/list-collection.component';
import { CreateCollectionComponent } from './member-collection/create-collection/create-collection.component';

import { CreateScheduleComponent } from './member-schedule/create-schedule/create-schedule.component';
import { DetailScheduleComponent } from './member-schedule/detail-schedule/detail-schedule.component';
import { DetailMemberInfoComponent } from './member-info/detail-member-info/detail-member-info.component';
import { UpdateMemberInfoComponent } from './member-info/update-member-info/update-member-info.component';
import { ListScheduleComponent } from './member-schedule/list-schedule/list-schedule.component';
import { MemberService } from './share/member_service.service';




const routes: Routes = [
    {
        path: 'member', component: MemberManagerComponent, canActivate: [AuthGuardService],
        children: [
            {
                path: 'info/detail/:user_id', component: DetailMemberInfoComponent
                // path: 'post/detail/:post_id', component: DetailMemberInfoComponent
            },
            {
                path: 'post/list', component: ListMemberPostComponent
            },
            {
                path: 'post/new', component: CreateMemberPostComponent
            },
            {
                //path: 'post/update', component: UpdateMemberPostComponent
                path: 'post/update/:post_id', component: UpdateMemberPostComponent
            },
            {
                //path: 'post/detail', component: DetailMemberPostComponent
                path: 'post/detail/:post_id', component: DetailMemberPostComponent
            },
            {
                path: 'schedule/list', component: ListScheduleComponent
            },
            {
                path: 'schedule/new', component: CreateScheduleComponent
            },
            {
                path: 'schedule/detail', component: DetailScheduleComponent
            },
            {
                //path: 'info/update', component: UpdateMemberInfoComponent
                path: 'info/update/:user_id', component: UpdateMemberInfoComponent
            },
            {
                path: 'collection/list', component: ListCollectionComponent
            },
            {
                path: 'collection/new', component: CreateCollectionComponent
            },


        ]
    }


]

@NgModule({
    declarations: [
        MemberManagerComponent,
        ListMemberPostComponent,
        UpdateMemberPostComponent,
        CreateMemberPostComponent,
        ListCollectionComponent,
        CreateCollectionComponent,
        DetailMemberPostComponent,
        CreateScheduleComponent,
        DetailScheduleComponent,
        DetailMemberInfoComponent,
        UpdateMemberInfoComponent,
        ListScheduleComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        BrowserAnimationsModule,
        ToastrModule,


    ],
    providers: [
        AuthGuardService,
        AuthenticationService,
        MemberPostService,
        MemberScheduleService,
        MemberCollectionService,
        MemberService

    ]
})
export class MemberManagerModule { }