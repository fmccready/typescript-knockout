/// <reference path="hello.ts" />
class Hello {
  constructor(public greeting: string) {}
  greet() {
    return `<h1>$(greeting)</h1>`;
  }
}
let test: Hello = new Hello("Testing Reload");
