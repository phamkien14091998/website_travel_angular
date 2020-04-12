import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ManagerComponent } from './manager.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';



const routes: Routes = [
    {
        path: 'manager', component: ManagerComponent,
        children: [
            {
                path: '', component: ListProductComponent
            },
            {
                path: 'new', component: CreateProductComponent
            },
            // {
            //     // path: ':id', component: FilmDetailComponent
            // },
            // {
            //     // path: ':tenPhim/homes', component: FilmSearchComponent
            // },
            // {
            //     // path: 'ves/:id', component: FilmDetailBookingIdComponent
            // },
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

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    providers: [


    ],
    bootstrap: [ManagerComponent]
})
export class ManagerModule { }
