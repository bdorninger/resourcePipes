import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{ name }}!</h1>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class HelloComponent {
  private _name =''
  @Input() set name (name: string) {
    console.log(`name set to ${name}`)
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  constructor() {
    console.log('Hello constructed');
  }
}
