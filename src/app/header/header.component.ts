import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    // styles: 'header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription

    constructor(private dataStorageService: DataStorageService, private authSercice: AuthService) {

    }
    collapsed = true;

    ngOnInit() {
        this.userSub = this.authSercice.user.subscribe(user => {
            this.isAuthenticated = !!user
        })
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
        console.log("hello")
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authSercice.logout()
    }

    ngOnDestroy() {
        this.userSub.unsubscribe()
    }
}