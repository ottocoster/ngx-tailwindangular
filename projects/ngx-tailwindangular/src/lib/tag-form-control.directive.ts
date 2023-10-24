import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  forwardRef,
  Injector,
  HostListener,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Directive({
  selector: '[taTagFormControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagFormControlDirective),
      multi: true,
    },
  ],
})
export class TagFormControlDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() type: string = 'text';
  private onChange!: (value: any) => void;
  private onTouched!: () => void;
  private ngControl: NgControl | null = null;
  private _value: string[] = [];
  private listeners: (() => void)[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private injector: Injector
  ) {}

  ngOnInit() {
    // Delay the retrieval of NgControl to avoid circular reference
    this.ngControl = this.injector.get(NgControl, null);

    this.setStyleToHostElement();
    const input = this.createInput();
    const tagContainer = this.createTagContainer();

    // Order of appending matters
    this.renderer.appendChild(this.el.nativeElement, tagContainer);
    this.renderer.appendChild(this.el.nativeElement, input);
  }

  private setStyleToHostElement() {
    const styles = ['d-flex', 'gap-1', 'overflow-hidden'];
    styles.forEach((style) =>
      this.renderer.addClass(this.el.nativeElement, style)
    );
  }

  private createInput(): HTMLElement {
    const input = this.renderer.createElement('input');
    const classes = ['tag-input', 'w-100', 'flex-grow-1'];

    this.renderer.setAttribute(input, 'type', this.type);
    classes.forEach((c) => this.renderer.addClass(input, c));

    this.listeners.push(
      this.renderer.listen(input, 'blur', () => {
        this.onTouched();
      })
    );

    return input;
  }

  private createTagContainer(): HTMLElement {
    const container = this.renderer.createElement('div');
    const styles = ['tag-container', 'd-flex', 'align-items-center', 'gap-1'];

    styles.forEach((style) => this.renderer.addClass(container, style));

    return container;
  }

  @HostListener('keydown', ['$event'])
  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();

      const value = (event.target as HTMLInputElement).value;
      this.writeValue(value);
      this.onChange(this._value);
    }
  }

  removeClicked(value: string) {
    const index = this._value.indexOf(value);

    if (index > -1) {
      this._value.splice(index, 1);

      const tagContainer = this.el.nativeElement.children[0];
      const badge = tagContainer.children[index];
      this.renderer.removeChild(tagContainer, badge);
      this.onChange(this._value);
    }
  }

  writeValue(value: string | string[]): void {
    // If value is an array, loop over all values and call writeValue again
    if (Array.isArray(value)) {
      value.forEach((v: string) => this.writeValue(v));

      return;
    }

    this._value.push(value);

    const input = this.el.nativeElement.children[1];

    if (input) {
      this.renderer.setProperty(input, 'value', '');
    }

    const badge = this.createBadge(value);
    const tagContainer = this.el.nativeElement.children[0];
    this.renderer.appendChild(tagContainer, badge);
  }

  private createBadge(value: string): HTMLElement {
    const badge = this.renderer.createElement('span');
    const badgeStyles = ['badge', 'rounded-pill', 'bg-primary'];
    badgeStyles.forEach((style) => this.renderer.addClass(badge, style));

    const text = this.renderer.createText(value);
    const removeSpan = this.createRemoveIcon(value);

    this.renderer.appendChild(badge, text);
    this.renderer.appendChild(badge, removeSpan);

    return badge;
  }

  private createRemoveIcon(value: string): HTMLElement {
    const span = this.renderer.createElement('span');
    const styles = ['fa', 'fa-xmark', 'ms-2', 'cursor-pointer'];

    styles.forEach((style) => this.renderer.addClass(span, style));

    this.listeners.push(
      this.renderer.listen(span, 'click', (event) => {
        event.stopPropagation();
        this.removeClicked(value);
      })
    );

    return span;
  }

  ngOnDestroy() {
    // Cleanup event listeners to avoid memory leaks
    this.listeners.forEach((l) => l());
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
