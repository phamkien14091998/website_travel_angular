import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../shared/home_service.service";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../authentication.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-places-detail',
  templateUrl: './home-places-detail.component.html',
  styleUrls: ['./home-places-detail.component.css']
})
export class HomePlacesDetailComponent implements OnInit {

  dataListPost: any = [];
  dataProvinceName: any = '';
  dataPlaceName: any = '';
  dataDescription: any = '';
  domain = environment.API_URL;
  dataDetailPlace: any = {};
  dataListPlacebyProvince: any = []
  currenRating = 4 // số rating mặc định
  // khai báo để lưu giá trị user đang đăng nhập 
  user: any = '';

  // số sao bài viết
  currentRate = 0;
  currentNew = 0  // số đánh giá mà user mới đánh giá
  dataListrate: any = [] // danh sách tất cả đánh giá
  // 

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    public auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    this.route.params.subscribe(
      (params) => {
        this.getListPostByPlaceId(params['famous_place_id']);
        this.getDetailPlace(params['famous_place_id']);
      })

  }

  getListPostByPlaceId(famous_place_id: any) {
    this.homeService.getListPostByPlaceId(
      famous_place_id
    ).subscribe(
      (data) => {
        console.log(data);

        this.dataListPost = data.map(p => {
          this.dataProvinceName = p.province_name
          this.dataPlaceName = p.place_title
          this.dataDescription = p.description
          p.images = p.images.split("|")
          return p;
        })
        console.log(this.dataListPost);
      }, err => { console.log(err) }
    );
  }
  // get chi tiết place
  getDetailPlace(famous_place_id: any) {
    this.homeService.getDetailPlaceHome(
      famous_place_id
    ).subscribe(
      (data) => {

        data.images = data.images.split('|')
        this.dataDetailPlace = data
        // lấy tất cả địa điểm của tỉnh thành đó 
        this.getAllPlaceByProvince();

        this.checkUserRatingPlace(); // kiểm tra xem user đã đánh giá địa điểm chưa và đưa ngược lên để hiển thị
        this.getAllRatingPlace();  // lấy ra tất cả đánh giá về địa điểm

      }, err => { console.log(err) }
    );
  }

  getAllPlaceByProvince() {
    var body = {
      'province_id': this.dataDetailPlace?.province_id,
      'famous_place_id': this.dataDetailPlace?.famous_place_id
    }

    this.homeService.getListPlaceByProvinceIdNew(
      body
    ).subscribe(
      (data) => { 
        console.log(data);

        this.dataListPlacebyProvince = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
      }
    )

  }

  /////////////////
  // đánh giá các địa điểm
  onRate(e) {
    console.log('aaaaaaaaaaa');
  }

  rate(e) {
    console.log('ccccccccccc');
  }
  // gửi sao lên lưu
  submitRating() {
    var body = {
      'point': this.currentRate,
      'famous_place_id': this.dataDetailPlace?.famous_place_id,
      'user_id': this.user.user_id
    }
    console.log(body);
    this.homeService.createRatingPlace(
      body
    ).subscribe(
      (data) => {
        // console.log(data);
        this.currentNew = data.point // khi gửi sao lên thì sẽ lấy đc point và gán lại để button bên view nó ẩn

        this.dataListrate.unshift(data);
        this.toastr.success('thành công ', 'Đánh giá  bài viết');
      }, () => {
        this.toastr.success('', 'Chọn số sao trước khi đánh giá');
      }
    )
  }
  // sửa đánh giá của user cho bài viết 
  updateRating() {
    var body = {
      'point': this.currentNew,
      'famous_place_id': this.dataDetailPlace?.famous_place_id,
      'user_id': this.user.user_id
    }
    this.homeService.updateRatingPlace(
      body
    ).subscribe(
      (data) => {
        this.dataListrate.splice(data, 1);
        this.dataListrate.unshift(data);
        this.toastr.success('thành công ', 'Sửa đánh giá địa điểm');
      }, () => {

      }
    )
  }
  // kiểm ta xem user đang đăng nhập đã đánh giá bài viết đó hay chưa 
  // (nếu đánh giá rồi thì hiển ra kết qua đánh giá và ẩn cái nút thêm đánh giá thôi)
  checkUserRatingPlace() {
    // lấy đc id địa điểm và user_id đang đăng nhập để gửi xuống kiếm tra
    var body = {
      'famous_place_id': this.dataDetailPlace.famous_place_id,
      'user_id': this.user?.user_id
    }
    this.homeService.checkUserRatingPlace(body).subscribe(
      (data) => {
        if (data == 0) {
          this.currentNew = 0
        }
        if (data.point) {
          this.currentNew = data.point
        }
      }
    )
  }
  // lấy ra tất cả đánh giá
  getAllRatingPlace() {
    var famous_place_id = this.dataDetailPlace?.famous_place_id
    var body = {
      'famous_place_id': famous_place_id
    }
    this.homeService.getAllRatingPlace(
      body
    ).subscribe(
      (data) => {
        this.dataListrate = data;
        console.log(this.dataListrate);

      }
    )

  }

  ////////////////////////

}