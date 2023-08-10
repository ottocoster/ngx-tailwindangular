import { NgModule } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownMenuContentDirective } from './dropdown-menu-content.directive';

@NgModule({
  declarations: [DropdownMenuDirective, DropdownMenuContentDirective],
  imports: [],
  exports: [DropdownMenuDirective, DropdownMenuContentDirective],
})
export class NgxTailwindangularModule {}
