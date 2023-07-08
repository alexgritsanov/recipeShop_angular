import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    // styles: 'header.component.css'
})
export class HeaderComponent {

    constructor(private dataStorageService: DataStorageService) {

    }
    collapsed = true;

    onSaveData() {
        this.dataStorageService.storeRecipes();
        console.log("hello")
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}