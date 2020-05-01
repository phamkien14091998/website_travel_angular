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




const routes: Routes = [
    {
        path: 'member', component: MemberManagerComponent, canActivate: [AuthGuardService],
        children: [
            {
                path: 'post/list', component: ListMemberPostComponent
            },
            {
                path: 'post/new', component: CreateMemberPostComponent
            },
            {
                path: 'post/update', component: UpdateMemberPostComponent
                // path: 'post/update/:post_id', component: UpdateMemberPostComponent
            },
            {
                path: 'post/detail', component: DetailMemberPostComponent
                // path: 'post/detail/:post_id', component: DetailMemberPostComponent
            },

            {
                path: 'schedule/new', component: CreateScheduleComponent
            },
            {
                path: 'schedule/detail', component: DetailScheduleComponent
            },
            // {
            //     path: ':id/edit', component: FilmUpdateComponent 
            // }

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
        MemberCollectionService

    ]
})
export class MemberManagerModule { }
