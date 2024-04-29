# ngx-TailwindAngular

A UI library with directives for Angular projects, styled using TailwindCSS. Homepage on [TailwindAngular.com](https://tailwindangular.com). Maintained by [Otto Coster](https://ottocoster.com)

## Directives

### taDropdownMenu

```html
<button taDropdownMenu>Toggle Menu</button>
<div taDropdownMenuContent>
  <p>Menu Item 1</p>
  <p>Menu Item 2</p>
</div>
```

### taTagFormControl

```html
<div taTagFormControl [formControl]="control"></div>
```

### taMultiSelect

```html
<select taMultiSelect [options]="['Option 1', 'Option 2', 'Option 3']"></select>
```

### Badge

```html
<ta-badge>Badge</ta-badge>
```

## Code scaffolding

Run `ng generate component component-name --project ngx-tailwindangular` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-tailwindangular`.

> Note: Don't forget to add `--project ngx-tailwindangular` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-tailwindangular` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-tailwindangular`, go to the dist folder `cd dist/ngx-tailwindangular` and run `npm publish`.

## Running unit tests

Run `ng test ngx-tailwindangular` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
