import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    constructor(private authService: AuthService) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return
        }
        const email = form.value.email
        const password = form.value.password;

        this.isLoading = true;

        if (this.isLoginMode) {

        } else {
            this.authService.signup(email, password).subscribe(resData => {
                console.log(resData)
                this.isLoading = false;
            }, errorRes => {
                console.log(errorRes)
                switch (errorRes.error.error.message) {
                    case "EMAIL_EXISTS":
                        this.error = 'This email exists already'
                }
                this.error = "An error occured!";
                this.isLoading = false;
            })
        }


        console.log(form.value)
        form.reset()
    }
}