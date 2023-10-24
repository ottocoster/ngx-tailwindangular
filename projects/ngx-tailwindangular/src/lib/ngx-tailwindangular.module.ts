import { NgModule } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownMenuContentDirective } from './dropdown-menu-content.directive';
import { TagFormControlDirective } from './tag-form-control.directive';
import { MultiSelectDirective } from './multi-select.directive';

@NgModule({
  declarations: [
    DropdownMenuDirective,
    DropdownMenuContentDirective,
    TagFormControlDirective,
    MultiSelectDirective,
  ],
  imports: [],
  exports: [
    DropdownMenuDirective,
    DropdownMenuContentDirective,
    TagFormControlDirective,
    MultiSelectDirective,
  ],
})
export class NgxTailwindAngularModule {}
