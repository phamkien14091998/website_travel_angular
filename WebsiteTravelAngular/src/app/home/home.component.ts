import { Component } from "@angular/core";
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { HomeService } from "./shared/home_service.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    dataListPost: any = [];
    dataListPlace: any = [];
    domain = environment.API_URL;

    constructor(
        private homeService: HomeService,
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {

        this.getAllPost();
        this.getAllPlace();
    }
    // get 9 bài viết đã duyệt
    getAllPost() {
        this.homeService.getAllPostDuyet().subscribe(
            (data) => {
                this.dataListPost = data.map(p => {
                    p.images = p.images.split("|")
                    return p;
                })
            },
            err => { console.log(err) }
        );
    }
    // get 8 địa điểm 
    getAllPlace() {
        this.homeService.getAll8Place().subscribe(
            (data) => {
                this.dataListPlace = data.map(p => {
                    p.images = p.images.split("|")
                    return p;
                })
            },
            err => { console.log(err) }
        );
    }

}



