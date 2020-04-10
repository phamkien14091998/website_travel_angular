import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: TokenPayload = {
        user_id: '',
        user_name: '',
        email: '',
        password: '',
        full_name: '',
        avatar: '',
        date_of_birth: null,
        gender: 0,
        hometown: '',
        hobbies: '',


    }
    constructor(private auth: AuthenticationService, private router: Router) {

    }
    login() {
        this.auth.login(this.credentials).subscribe(
            () => {
                // this.router.navigateByUrl('/profile')
                this.router.navigateByUrl('/home')

            },
            err => {
                console.error(err)
            }
        )
    }


}

