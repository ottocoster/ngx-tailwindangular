import { DropdownMenuDirective } from './dropdown-menu.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuContentDirective } from './dropdown-menu-content.directive';

@Component({
  template: `
    <button taDropdownMenu>Toggle Menu</button>
    <div></div>
    <!-- This div is a placeholder and won't be targeted -->
    <div taDropdownMenuContent>
      <p>Menu Item 1</p>
      <p>Menu Item 2</p>
    </div>
  `,
})
class TestComponent {}

describe('DropdownMenuDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElem: HTMLElement;
  let siblingElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownMenuDirective,
        DropdownMenuContentDirective,
        TestComponent,
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElem = fixture.nativeElement.querySelector('button');
    siblingElem = fixture.nativeElement.querySelector(
      '[taDropdownMenuContent]'
    );
  });

  it('should toggle menu display on button click', () => {
    fixture.detectChanges();

    // Initially, the sibling element should not be displayed
    expect(getComputedStyle(siblingElem).display).toBe('none');

    // Simulate a button click
    buttonElem.click();
    fixture.detectChanges();

    // Now, the sibling element should be displayed
    expect(getComputedStyle(siblingElem).display).toBe('block');

    // Simulate another button click
    buttonElem.click();
    fixture.detectChanges();

    // The sibling element should be hidden again
    expect(getComputedStyle(siblingElem).display).toBe('none');
  });
});
