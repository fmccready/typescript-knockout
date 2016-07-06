///<reference path="../../typings/index.d.ts"/>

import * as HelloViewModel from './hello';

class Hello {
  constructor(public greeting: string) {console.log('Constructed! ' + greeting); console.dir(HelloViewModel);}

  greet() {
    return `<h1>${this.greeting}</h1>`;
  }
}
let test: Hello = new Hello("Hey hey hey!");
document.getElementById('test').innerHTML = test.greet();
