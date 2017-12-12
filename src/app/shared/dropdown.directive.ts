import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    @HostBinding('class.open') isOpen: boolean;

    // listen to clicks on this element, toggle the bound class
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}
