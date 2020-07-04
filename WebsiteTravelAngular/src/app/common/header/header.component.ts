import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // user_n: any = "";
  user: any = '';

  domain = environment.API_URL
  count_user_id
  listNotify

  constructor(
    public auth: AuthenticationService,

  ) { }

  ngOnInit(): void {
    // this.auth.user$.subscribe(user => this.user_n = user?.user_name)
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token
    // lấy ra tất cả thông báo của user đang đăng nhập 
    this.getNotify();
    this.getCountNotify();
  }

  // lấy ra tổng số thông báo
  getCountNotify() {
    var data = {
      'user_id': this.user?.user_id
    }
    this.auth.getCountNotify(
      data
    ).subscribe(
      (data) => {
        this.count_user_id = data[0].count_user_id
      }
    )

  }


  getNotify() {
    var data = {
      'user_id': this.user?.user_id
    }
    this.auth.getNotify(
      data
    ).subscribe(
      (data) => {
        this.listNotify = data
      }
    )

  }

  closeNotity(url) {

    var data = {
      'user_id': this.user?.user_id,
      'url': url
    }
    this.auth.closeNotity(
      data
    ).subscribe(
      (data) => {
        this.count_user_id = data[0].count_user_id
        this.listNotify = data
      }
    )
  }





}
