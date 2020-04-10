import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload, UserDetails } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    credentials: TokenPayload = {
        user_id: '',
        user_name: '',
        email: '',
        password: '',
        full_name: '',
        avatar: '',
        date_of_birth: null,
        gender: 1,
        hometown: '',
        hobbies: '',


    }
    constructor(private auth: AuthenticationService, private router: Router) {

    }
    register() {
        this.auth.register(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/login')
            },
            err => {
                console.error(err)
            }
        )
    }


}

