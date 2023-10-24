import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MultiSelectDirective } from './multi-select.directive';

@Component({
  template: `<div>
    <select
      taMultiSelect
      [options]="['Option 1', 'Option 2', 'Option 3']"
    ></select>
  </div>`,
})
class TestComponent {}

describe('MultiSelectDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MultiSelectDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    const directive = new MultiSelectDirective(divEl, renderer);
    expect(directive).toBeTruthy();
  });

  it('should create checkboxes for each option', () => {
    fixture.detectChanges();
    const checkboxes = divEl.queryAll(By.css('input[type="checkbox"]'));
    expect(checkboxes.length).toBe(3);
  });
});
