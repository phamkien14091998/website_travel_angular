import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "./../auth-guard.service";

import { ManagerComponent } from './manager.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PostsComponent } from './posts/posts.component';

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

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        AuthGuardService

    ]
})
export class ManagerModule { }
