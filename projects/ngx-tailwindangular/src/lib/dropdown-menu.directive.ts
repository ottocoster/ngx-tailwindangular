import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[taDropdownMenu]',
})
export class DropdownMenuDirective {
  private isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  toggleDropdown() {
    this.isOpen = !this.isOpen;

    // Find the next sibling with the attribute 'taDropdownMenuContent'
    let dropdownMenuContent = this.el.nativeElement.nextElementSibling;
    while (
      dropdownMenuContent &&
      !dropdownMenuContent.hasAttribute('taDropdownMenuContent')
    ) {
      dropdownMenuContent = dropdownMenuContent.nextElementSibling;
    }

    if (!dropdownMenuContent) return; // No menu content found

    if (this.isOpen) {
      this.renderer.setStyle(dropdownMenuContent, 'display', 'block');
    } else {
      this.renderer.setStyle(dropdownMenuContent, 'display', 'none');
    }
  }
}
