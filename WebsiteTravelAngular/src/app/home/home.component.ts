import { Component } from "@angular/core";
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { HomeService } from "./shared/home_service.service";
import { StarRatingComponent } from 'ng-starrating';
import { AuthenticationService } from "../authentication.service";


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    dataListPost: any = [];
    dataListProvince: any = [];
    domain = environment.API_URL;
    currentRate = 1;

    searchPlaceForm: FormGroup;
    dataSearchPlace: any = []
    title = ''

    dataStatistical = []


    constructor(
        private homeService: HomeService,
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        public auth: AuthenticationService
    ) { }

    ngOnInit(): void {

        this.getAllPost();
        this.getAllProvince();
        this.initForm();
        this.getStatistical();
    }
    // get 9 bài viết đã duyệt giamr dần theo số rating đánh giá
    getAllPost() {
        this.homeService.getAllPostDuyet().subscribe(
            (data) => {
                console.log(data);

                this.dataListPost = data.map(p => {
                    p.images = p.images.split("|")
                    return p;
                })
            },
            err => { console.log(err) }
        );
    }
    // get 8 tỉnh thành 
    getAllProvince() {
        this.homeService.getAll8PProvince().subscribe(
            (data) => {
                this.dataListProvince = data
                // (p => {
                //     p.images = p.images.split("|")
                //     return p; 
                // })
            },
            err => { console.log(err) }
        );
    }

    onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
        alert(`Old Value:${$event.oldValue}, 
          New Value: ${$event.newValue}, 
          Checked Color: ${$event.starRating.checkedcolor}, 
          Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    }

    initForm() {
        this.searchPlaceForm = this.fb.group({
            title: [''],
        });
    }
    searchPlace() {
        var title = {
            'title': this.searchPlaceForm.value.title
        }

        this.homeService.searchPlaceByTitle(
            title
        ).subscribe(
            (data) => {
                this.title = this.searchPlaceForm.value.title
                this.dataSearchPlace = data.map(p => {
                    p.images = p.images.split("|")
                    return p;
                })
                this.searchPlaceForm.patchValue({ 'title': '' });

            },
            (err) => {

            }
        )
    }
    // thống kê tất cả 
    getStatistical() {
        this.homeService.getStatistical().subscribe(
            (data) => {
                this.dataStatistical = data
            }
        )
    }


}
