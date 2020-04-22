import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from "../authentication.service";
import { AuthGuardService } from "./../auth-guard.service";

import { ManagerComponent } from './manager.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PostsComponent } from './posts/posts.component';
import { ManagerProductService } from "./share/manager_product.service";
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
    {
        path: 'manager', component: ManagerComponent,
        children: [
            {
                path: 'product', component: ListProductComponent, canActivate: [AuthGuardService],
            },
            {
                path: 'product/new', component: CreateProductComponent
            },
            {
                path: 'product/detail', component: DetailProductComponent
            },
            {
                path: 'product/update', component: UpdateProductComponent
            },
            {
                path: 'posts', component: PostsComponent
            },
            // {
            //     // path: ':id/edit', component: FilmUpdateComponent
            // }

        ]
    }


]

@NgModule({
    declarations: [
        ManagerComponent,
        CreateProductComponent,
        ListProductComponent,
        DetailProductComponent,
        UpdateProductComponent,
        PostsComponent,
        PostDetailComponent,

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
        ManagerProductService

    ]
})
export class ManagerModule { }
