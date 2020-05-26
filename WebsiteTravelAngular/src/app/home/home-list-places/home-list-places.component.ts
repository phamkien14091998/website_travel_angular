import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from '../../authentication.service';
import { MemberCollectionService } from "../../member-manager/share/member_collection_service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-list-places',
  templateUrl: './home-list-places.component.html',
  styleUrls: ['./home-list-places.component.css']
})
export class HomeListPlacesComponent implements OnInit {

  dataListPlace: any = [];
  dataProvinceName: any = '';
  numberOfPlace: any = 0;
  domain = environment.API_URL;
  addPlaceCollectionForm: FormGroup

  // luuw danh sach collection cuar usser
  dataListCollection: any = [];
  // khai báo để lưu giá trị user đang đăng nhập
  user: any = '';
  place_id // lưu id địa điểm

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    public auth: AuthenticationService,
    private collectionService: MemberCollectionService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        this.getListPlaceByProvinceId(params['province_id']);
      })
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.getListCollectionByUser();
  }
  initForm() {
    this.addPlaceCollectionForm = this.fb.group({
      collection_id: [''],
      // famous_place_id: ['']
    });
  }

  getListPlaceByProvinceId(province_id: string) {
    this.homeService.getListPlaceByProvinceId(
      province_id
    ).subscribe(
      (data) => {
        this.dataListPlace = data.map(p => {
          this.dataProvinceName = p.province_name
          this.numberOfPlace += 1
          p.images = p.images.split("|")
          return p;
        })
        console.log(this.dataListPlace);  
      }, err => { console.log(err) }
    );
  }

  getListCollectionByUser() {
    this.collectionService.getListCollectionByUser(
      this.user?.user_id
    ).subscribe(
      (data) => {
        // console.log(data);
        this.dataListCollection = data
      }, err => { console.log(err) }
    );

  }
  layid(e) {
    this.place_id = e.target.name

  }
  addPlaceCollection() {
    // collection_id 
    console.log(this.addPlaceCollectionForm.value);
    var body = {
      'collection_id': this.addPlaceCollectionForm.value.collection_id,
      'famous_place_id': this.place_id
    }
    console.log(body);
    this.collectionService.addPlaceIntoCollection(
      body
    ).subscribe(
      () => {
        this.toastr.success('thành công ', 'Thêm địa điểm vào bộ sưu tập');
      },
      err => {
        this.toastr.error('trong bộ sưu tập ', 'Địa điểm tồn tại');
      }
    )



  }



}

