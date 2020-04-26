import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  selectedItem: any;

  constructor(private auth: AuthenticationService) {

  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }


}
