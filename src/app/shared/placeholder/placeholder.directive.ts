import { Directive, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "src/app/shared/alert/alert.component";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    constructor(public viewContainerRef: ViewContainerRef,) {

    }
}