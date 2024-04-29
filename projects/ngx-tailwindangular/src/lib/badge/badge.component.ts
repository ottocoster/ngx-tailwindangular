import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ta-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class BadgeComponent {
  @Input() variant: 'default' | 'secondary' | 'destructive' | 'outline' =
    'default';
  @Input() class: string | undefined;
  @HostBinding('class') get classes() {
    let classes =
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

    if (!this.variant || this.variant === 'default') {
      classes +=
        ' bg-primary-700 hover:bg-primary-700/80 text-primary-foreground';
    }

    if (this.variant === 'secondary') {
      classes += ' bg-gray-200 hover:bg-gray-200/80 text-gray-900';
    }

    if (this.variant === 'destructive') {
      classes += ' bg-red-500 hover:bg-red-500/80 text-white';
    }

    if (this.variant === 'outline') {
      classes += ' text-gray-900';
    }

    if (
      !this.variant ||
      this.variant === 'default' ||
      this.variant === 'secondary' ||
      this.variant === 'destructive'
    ) {
      classes += ' border-transparent';
    }

    classes += ` ${this.class}`;

    return classes;
  }
}
