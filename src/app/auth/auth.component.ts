import { Component, ComponentFactoryResolver, NgModuleRef, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "src/app/auth/auth.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceholderDirective } from "src/app/shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective

    private closeSub: Subscription


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

        let authObs: Observable<AuthResponseData>
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(resData => {
            console.log(resData)
            this.isLoading = false;
            this.router.navigate(['/recipes'])
        }, errorMessage => {
            console.log(errorMessage)

            this.error = errorMessage;
            this.showErrorAlert(errorMessage)
            this.isLoading = false;
        })
        console.log(form.value)
        form.reset()
    }

    onHandleError() {
        this.error = null
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe()
        }
    }

    private showErrorAlert(message: string) {
        // const alertCmp = new AlertComponent()
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef
        hostViewContainerRef.clear()
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

        componentRef.instance.message = message
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear()
        })


    }
}