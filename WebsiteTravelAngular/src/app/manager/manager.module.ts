import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from "../authentication.service";
import { AuthGuardService } from "./../auth-guard.service";
import { ManagerProductService } from "./share/manager_product.service";
import { ManagerPlaceService } from "./share/manager_place.service";

import { ManagerComponent } from './manager.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PostsComponent } from './manager-posts/posts/posts.component';
import { PostsDetailComponent } from './manager-posts/posts-detail/posts-detail.component';
import { ListPlacesComponent } from './manager-places/list-places/list-places.component';
import { CreatePlacesComponent } from './manager-places/create-places/create-places.component';
import { DetailPlacesComponent } from './manager-places/detail-places/detail-places.component';
import { UpdatePlacesComponent } from './manager-places/update-places/update-places.component';

const routes: Routes = [
    {
        path: 'manager', component: ManagerComponent, canActivate: [AuthGuardService],
        children: [
            {
                path: 'product', component: ListProductComponent,
            },
            {
                path: 'product/new', component: CreateProductComponent
            },
            {
                path: 'product/detail/:product_id', component: DetailProductComponent
            },
            {
                path: 'product/update/:product_id', component: UpdateProductComponent
            },
            // router post
            {
                path: 'posts', component: PostsComponent,// canActivate: [AuthGuardService],
            },
            {
                path: 'posts/detail', component: PostsDetailComponent
            },
            // router famous places
            {
                path: 'places', component: ListPlacesComponent, //canActivate: [AuthGuardService],
            },
            {
                path: 'places/new', component: CreatePlacesComponent
            },
            {
                path: 'places/detail/:famous_place_id', component: DetailPlacesComponent
            },
            {
                path: 'places/update/:famous_place_id', component: UpdatePlacesComponent
            },


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
        PostsDetailComponent,
        ListPlacesComponent,
        CreatePlacesComponent,
        DetailPlacesComponent,
        UpdatePlacesComponent,


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
        ManagerProductService,
        ManagerPlaceService

    ]
})
export class ManagerModule { }
