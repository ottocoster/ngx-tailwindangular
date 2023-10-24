import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TagFormControlDirective } from './tag-form-control.directive';

@Component({
  template: `<div taTagFormControl [formControl]="control"></div>`,
})
class TestHostComponent {
  control = new FormControl();
}

describe('TagFormControlDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagFormControlDirective, TestHostComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('div[appTagFormControlDirective]'));
    fixture.detectChanges();
    inputEl = el.nativeElement.children[1] as HTMLInputElement;
  });

  it('should add class names to the host element on initialization', () => {
    expect(el.nativeElement.classList.contains('d-flex')).toBeTruthy();
    expect(el.nativeElement.classList.contains('gap-1')).toBeTruthy();
    expect(el.nativeElement.classList.contains('overflow-hidden')).toBeTruthy();
  });

  it('should add an input element on initialization', () => {
    expect(inputEl).toBeTruthy();
    expect(inputEl.classList.contains('tag-input')).toBeTruthy();
    expect(inputEl.type).toEqual('text'); // default type
  });
});
