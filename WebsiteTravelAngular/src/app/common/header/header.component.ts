import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // user_n: any = "";
  user: any = '';

  constructor(
    public auth: AuthenticationService,

  ) { }

  ngOnInit(): void {
    // this.auth.user$.subscribe(user => this.user_n = user?.user_name)
    this.auth.user$.subscribe(user => this.user = user)  // bán user = user đã được truyền lên kèm token


  }






}
