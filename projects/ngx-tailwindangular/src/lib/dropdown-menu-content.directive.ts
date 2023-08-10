import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[taDropdownMenuContent]',
})
export class DropdownMenuContentDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Hide the content initially
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }
}
