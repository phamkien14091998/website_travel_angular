import { Component } from "@angular/core";
import { AuthenticationService, UserDetails } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    details: UserDetails

    constructor(private auth: AuthenticationService, private router: Router) {

    }
    ngOnInit() {
        this.auth.profile().subscribe( // trả về success / 
            users => {
                this.details = users
            },
            err => {
                console.error(err)
            }
        )
    }


}

