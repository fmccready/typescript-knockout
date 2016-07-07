///<reference path="../../typings/index.d.ts"/>
import * as ko from 'knockout';
import sayHi from './hello';

class Greeting {
  constructor(public greeting: string) {console.log('Greeting constructed! ' + greeting);}

  greet() {
    return `<h1>${this.greeting}</h1>`;
  }
}
class Person {
  firstName: string
  lastName: string

  constructor(firstName: string, lastName: string){
    this.firstName = firstName;
    this.lastName = lastName;
  };
}
class PeopleViewModel {
  people: KnockoutObservableArray<Person>
  constructor(p: Person[]){
    this.people = ko.observableArray<Person>(p);
  }
}


let personArray: Person[] = [
  new Person('Test', 'Testerson'),
  new Person('Nick', 'Kane'),
  new Person('Frank', 'McCready'),
  new Person('Mila', 'Korshunov'),
  new Person('Carol', 'Smith'),
  new Person('James', 'Dalton'),
  new Person('Katie', 'Hughes'),
  new Person('Elizabeth', 'Ha'),
  new Person('Alec', 'Brodsky'),
  new Person('Yvonne', 'Carman'),
  new Person('Alex', 'Bernsin'),
  new Person('Chip', 'Brown'),
  new Person('Scott', 'Nearman'),
  new Person('Carrie', 'Holden')
];


ko.applyBindings(new PeopleViewModel(personArray), document.getElementById('ppl'));
ko.applyBindings(new sayHi("TypeScript", "Knockout"), document.getElementById('hi'));

let hey: Greeting = new Greeting("Hey hey hey!");
document.getElementById('hey').innerHTML = hey.greet();
