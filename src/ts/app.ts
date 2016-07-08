///<reference path="../../typings/index.d.ts"/>
import * as ko from 'knockout';
import sayHi from './hello';

class Greeting {
  constructor(public greeting: string) {console.log('Greeting Constructed');}
  greet() {
    return `<h1>${this.greeting}</h1>`;
  }
}

class Person {
  firstName: KnockoutObservable<string>
  lastName: KnockoutObservable<string>
  constructor(firstName: string, lastName: string){
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
  };
}

class PeopleViewModel {
  people: KnockoutObservableArray<Person>
  constructor(p: Person[]){
    this.people = ko.observableArray<Person>(p);
  }
}

let personArray: Person[] = [
  new Person('Jack', 'Wolf'),
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

ko.applyBindings(new sayHi("TypeScript", "Knockout"), document.getElementById('hi'));
ko.applyBindings(new PeopleViewModel(personArray), document.getElementById('ppl'));

let hey: Greeting = new Greeting('Hey hey!  This greeting comes from the <strong>TypeScript</strong> class <span class="code">Greeting</span>!');
document.getElementById('hey').innerHTML = hey.greet();
