import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from "../authentication.service";
import { AuthGuardService } from "./../auth-guard.service";

import { ListMemberPostComponent } from './list-member-post/list-member-post.component';
import { UpdateMemberPostComponent } from './update-member-post/update-member-post.component';
import { CreateMemberPostComponent } from './create-member-post/create-member-post.component';
import { MemberPostComponent } from './member-post.component';
import { MemberService } from "./share/member_service.service";

// import { MemberComponent } from './member.component';
// import { ListMemberComponent } from './list-member/list-member.component';
// import { CreateMemberComponent } from './create-member/create-member.component';


const routes: Routes = [
    {
        path: 'member-posts', component: MemberPostComponent,
        children: [
            {
                path: 'list', component: ListMemberPostComponent, canActivate: [AuthGuardService],
            },
            {
                path: 'new', component: CreateMemberPostComponent, canActivate: [AuthGuardService]
            },
            // {
            //     path: 'product/detail/:product_id', component: DetailProductComponent
            // },
            // {
            //     path: 'product/update', component: UpdateProductComponent
            // },
            // {
            //     path: 'posts', component: PostsComponent
            // },
            // {
            //     path: 'posts/detail', component: PostsDetailComponent
            // },
            // {
            //     path: ':id/edit', component: FilmUpdateComponent
            // }

        ]
    }


]

@NgModule({
    declarations: [
        MemberPostComponent,
        ListMemberPostComponent,
        UpdateMemberPostComponent,
        CreateMemberPostComponent,

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
        MemberService,

    ]
})
export class MemberPostModule { }
