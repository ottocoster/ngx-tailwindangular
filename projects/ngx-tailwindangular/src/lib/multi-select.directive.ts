import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[taMultiSelect]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectDirective),
      multi: true,
    },
  ],
})
export class MultiSelectDirective
  implements AfterViewInit, ControlValueAccessor
{
  @Input() options: string[] = [];
  private select!: HTMLElement;
  private dropdown!: HTMLElement;
  private input!: HTMLInputElement;
  private onChange = (value: any) => {};
  private onTouched = () => {};
  private _value: string[] = [];
  private listeners: (() => void)[] = [];
  private textContent!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.init();
  }

  private init() {
    // Create select element
    this.select = this.renderer.createElement('div');
    this.select.id = 'multi-select-container';
    this.renderer.addClass(this.select, 'form-select');
    this.renderer.addClass(this.select, 'w-50');

    // Create text container for selected options
    this.textContent = this.renderer.createElement('div');
    this.textContent.id = 'text-content';
    this.textContent.innerText = 'Select platforms...';

    // Toggle dropdown on click
    this.renderer.listen(this.select, 'click', (event) => {
      if (
        (event.target as HTMLElement).id !== 'multi-select-container' &&
        (event.target as HTMLElement).id !== 'text-content'
      ) {
        return;
      }

      const display = getComputedStyle(this.dropdown).getPropertyValue(
        'display'
      );

      if (display === 'block') {
        this.renderer.setStyle(this.dropdown, 'display', 'none');
        this.renderer.setStyle(this.textContent, 'display', 'block');

        return;
      }

      this.renderer.setStyle(this.dropdown, 'display', 'block');

      const textContentDisplay = getComputedStyle(
        this.textContent
      ).getPropertyValue('display');

      this.renderer.setStyle(this.textContent, 'display', 'none');
    });

    // Create dropdown container
    this.dropdown = this.renderer.createElement('div');
    this.renderer.setStyle(this.dropdown, 'display', 'none');
    this.renderer.addClass(this.dropdown, 'multi-select');

    // Create input element for search
    this.input = this.renderer.createElement('input');
    this.renderer.addClass(this.input, 'mt-1');
    this.renderer.addClass(this.input, 'mb-2');
    this.renderer.addClass(this.input, 'form-control');
    this.renderer.setProperty(this.input, 'placeholder', 'Search platforms...');
    this.renderer.listen(this.input, 'input', () => this.filterOptions());

    // Append input to dropdown
    this.renderer.appendChild(this.dropdown, this.input);

    // Get all option elements after view is initialized
    // Create checkboxes for each option
    this.createCheckboxes();
  }

  private createCheckboxes() {
    this.options.forEach((option, index) => {
      const checkboxWrapper = this.renderer.createElement('div');
      const checkbox = this.renderer.createElement('input');
      const label = this.renderer.createElement('label');

      this.renderer.setProperty(checkbox, 'type', 'checkbox');
      this.renderer.setProperty(checkbox, 'value', option);
      this.renderer.setProperty(checkbox, 'id', `checkbox-${index}`);
      this.renderer.addClass(checkbox, 'form-check-input');
      this.renderer.setProperty(label, 'innerHTML', option);
      this.renderer.setProperty(label, 'htmlFor', `checkbox-${index}`);
      this.renderer.addClass(label, 'form-label');
      this.renderer.addClass(label, 'ms-2');

      this.renderer.listen(checkbox, 'change', (event) => {
        this.toggleOption(event);
      });

      this.renderer.appendChild(checkboxWrapper, checkbox);
      this.renderer.appendChild(checkboxWrapper, label);
      this.renderer.appendChild(this.dropdown, checkboxWrapper);
    });

    // Append dropdown to parent of native select and hide native select
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.select);
    this.renderer.appendChild(this.select, this.textContent);
    this.renderer.appendChild(this.select, this.dropdown);

    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  ngAfterViewInit() {
    this.listeners.push(
      this.renderer.listen(this.input, 'blur', () => {
        this.onTouched();
      })
    );
  }

  private toggleOption(event: any) {
    const checkbox = event.target;
    const optionValue = checkbox.value;

    if (checkbox.checked) {
      this._value.push(optionValue);
    } else {
      this._value = this._value.filter((val) => val !== optionValue);
    }

    // Update text content
    this.textContent.innerText = this._value.join(', ');

    // Emit the new value to the parent form
    this.onChange(this._value);
  }

  private sortOptions() {
    const wrappers = Array.from(this.dropdown.querySelectorAll('div'));
    wrappers.sort((a, b) => {
      const aValue = a.querySelector('input')?.value!;
      const bValue = b.querySelector('input')?.value!;
      const aChecked = this._value.includes(aValue);
      const bChecked = this._value.includes(bValue);
      return aChecked === bChecked ? 0 : aChecked ? -1 : 1;
    });
    wrappers.forEach((wrapper) => this.dropdown.appendChild(wrapper));
  }

  private filterOptions() {
    const searchText = this.input.value.toLowerCase();
    Array.from(this.dropdown.querySelectorAll('div')).forEach(
      (wrapper, index) => {
        const label = wrapper.querySelector('label');
        if (label && label.innerHTML.toLowerCase().includes(searchText)) {
          this.renderer.setStyle(wrapper, 'display', 'block');
        } else {
          this.renderer.setStyle(wrapper, 'display', 'none');
        }
      }
    );
  }

  writeValue(value: string | string[]): void {
    if (Array.isArray(value)) {
      value.forEach((v: string) => this.writeValue(v));
      return;
    }

    if (value && !this._value.includes(value)) {
      this._value.push(value);
    }

    const input = this.el.nativeElement;

    if (input) {
      this.renderer.setProperty(input, 'value', '');
    }

    // Update text content
    if (this._value.length > 0) {
      this.textContent.innerText = this._value.join(', ');
    }

    // Update checkboxes according to the new value
    this.dropdown
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox: Element) => {
        (checkbox as HTMLInputElement).checked = this._value.includes(
          (checkbox as HTMLInputElement).value
        );
      });

    this.sortOptions();

    // Emit the new value to the parent form
    this.onChange(this._value);
  }

  setDisabledState?(isDisabled: boolean): void {
    // handle disabled state here
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
