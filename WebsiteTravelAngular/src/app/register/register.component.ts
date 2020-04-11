import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload, UserDetails } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    credentials: TokenPayload = {
        user_id: '',
        user_name: '',
        email: '',
        password: '',
        full_name: '',
        avatar: 'assets/img/img_user.PNG',
        date_of_birth: null,
        gender: 0,
        hometown: '',
        hobbies: '',


    }
    constructor(private auth: AuthenticationService, private router: Router) {

    }
    register() {
        this.auth.register(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/profile')
            },
            err => {
                console.error(err)
            }
        )
    }


}

