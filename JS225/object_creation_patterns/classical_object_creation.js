// function Person(first, last, age, gender) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.gender = gender;
// }

// Person.prototype.fullName = function () {
//   return this.firstName + ' ' + this.lastName;
// };

// Person.prototype.communicate = function () {
//   console.log('hello');
// };

// Person.prototype.eat = function () { console.log('I am eating') };

// Person.prototype.sleep = function () { console.log('I am sleeping') };

// function Doctor(first, last, age, gender, specialization) {
//   Object.setPrototypeOf(Doctor.prototype, Person.prototype);
//   Person.call(this, first, last, age, gender);
//   this.specialization = specialization;
// }

// Doctor.prototype.diagnose = function () { console.log('is diagnosing') };

// function Professor(first, last, age, gender, subject) {
//   Object.setPrototypeOf(Professor.prototype, Person.prototype);
//   Person.call(this, first, last, age, gender);
//   this.subject = subject;
// }

// Professor.prototype.teach = function () { console.log('Teaching') };

// function Student(first, last, age, gender, degree) {
//   Object.setPrototypeOf(Student.prototype, Person.prototype);
//   Person.call(this, first, last, age, gender);
//   this.degree = degree;
// }

// Student.prototype.study = function () { console.log('studying') };

// function GraduateStudent(first, last, age, gender, degree, graduateDegree) {
//   Object.setPrototypeOf(GraduateStudent.prototype, Student.prototype);
//   Student.call(this, first, last, age, gender, degree);
//   this.graduateDegree = graduateDegree;
// }

// GraduateStudent.prototype.research = function () { console.log('Researching') };



// ES6 class syntax
class Person {
  constructor(first, last, age, gender) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  communicate() { console.log('Communicating') }

  eat() { console.log('Eating') }

  sleep() { console.log('Sleeping') }
}

class Doctor extends Person {
  constructor(first, last, age, gender, specialization) {
    super(first, last, age, gender);
    this.specialization = specialization;
  }

  diagnose() { console.log('Diagnosing') }
}

let Professor = class extends Person {
  constructor(first, last, age, gender, subject) {
    super(first, last, age, gender);
    this.subject = subject;
  }

  teach() { console.log('Teaching') }
};

class Student extends Person {
  constructor(first, last, age, gender, degree) {
    super(first, last, age, gender);
    this.degree = degree;
  }

  study() {
    console.log('Studying');
  }
}

class GraduateStudent extends Student {
  constructor(first, last, age, gender, degree, graduateDegree) {
    super(first, last, age, gender, degree);
    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log('Research');
  }
}

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'