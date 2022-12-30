const Person = {
  init(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    return this;
  },

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  communicate() {
    console.log('Communicating');
  },

  eat() {
    console.log('Eating');
  },

  sleep() {
    console.log('Sleeping');
  },
};

const Doctor = {
  init(firstName, lastName, age, gender, specialization) {
    Person.init.call(this, firstName, lastName, age, gender);
    this.specialization = specialization;
    return this;
  },

  diagnose() {
    console.log('Diagnosing');
  },
};

Object.setPrototypeOf(Doctor, Person);

const Student = {
  init(firstName, lastName, age, gender, degree) {
    Person.init.call(this, firstName, lastName, age, gender);
    this.degree = degree;
    return this;
  },

  study() {
    console.log('Studying');
  },
};

Object.setPrototypeOf(Student, Person);

const GraduateStudent = {
  firstName: 'Jimmy',
  lastName: 'Neutron',
  age: 12,
  gender: 'Male',
  degree: 'BS Scence',
  graduateDegree: 'MS Science',

  init(firstName, lastName, age, gender, degree, graduateDegree) {
    Student.init.call(this, firstName, lastName, age, gender, degree);
    this.graduateDegree = graduateDegree;
    return this;
  },

  research() {
    console.log('Research');
  },
};

Object.setPrototypeOf(GraduateStudent, Student);

const person = Object.create(Person).init('foo', 'bar', 21, 'gender');
console.log(Person.isPrototypeOf(person));     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

const doctor = Object.create(Doctor).init('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(Person.isPrototypeOf(doctor));     // logs true
console.log(Doctor.isPrototypeOf(doctor));     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

const graduateStudent = Object.create(GraduateStudent);
// logs true for next three statements
console.log(Person.isPrototypeOf(graduateStudent));
console.log(Student.isPrototypeOf(graduateStudent));
console.log(GraduateStudent.isPrototypeOf(graduateStudent));
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'