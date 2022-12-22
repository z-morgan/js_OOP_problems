/*
school object:
- students array

- create student - returns a student object, takes name and year
- add student - creates new student and adds them to students array
    - takes name and year
    - ensures year is valid
    - if not valid, logs 'invalid year'

- enroll student - enrolls a student in a course, takes course object

- add grade - takes a student name, course code, and grade, and adds a 
    grade property to that course object for the student

- get report card - takes a student name, and logs their grade in each class
   - if no grade for a class, logs 'in progress'

- course report - takes a course name, and logs the grades for all students in that course who
    have a grade in that course
    - also logs the average of the grades
    - if no students have grades, return undefined



*/

let school = {
  students: {},
  createStudent(name, year) {
    return {
      name,
      year,
      courses: [],
      info() {
        console.log(`${this.name} is a ${this.year} year student`);
      },
  
      listCourses() {
        console.log(this.courses);
      },
  
      addCourse(course) {
        this.courses.push(course);
      },
  
      addNote(code, text) {
        let course = this.courses.find(course => course.code === code);
        
        if (course.notes) {
          course.notes += `; ${text}`;
        } else {
          course.notes = text;
        }
      },
  
      viewNotes() {
        this.courses.forEach(course => {
          if (course.notes) {
            console.log(`${course.name}: ${course.notes}`);
          }
        });
      },
  
      updateNote(code, text) {
        let course = this.courses.find(course => course.code === code);
        course.notes = text;
      },
    };
  },

  addStudent(name, year) {
    const validYears = '1st 2nd 3rd 4th 5th'.split(' ');

    if (validYears.includes(year)) {
      let student = this.createStudent(name, year);
      this.students[name] = student;
    } else {
      console.log('invalid year');
    }
  },

  enrollStudent(name, course) {
    this.students[name].addCourse(course);
  },

  addGrade(name, code, grade) {
    this.students[name].courses
                       .find(course => course.code === code)
                       .grade = grade;
  },

  getReportCard(name) {
    this.students[name].courses.forEach(course => {
      if (course.grade !== undefined) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport(name) {
    let studentsWithGrade = Object.values(this.students).filter(student => {
      return student.courses.some(course => course.name === name && course.grade !== undefined);
    });

    if (studentsWithGrade.length === 0) {
      console.log(undefined);
      return;
    }

    studentsWithGrade = studentsWithGrade.map(student => {
      let grade = student.courses.find(course => course.name === name)
                                 .grade;
      return [student.name, grade];
    });

    let sumOfGrades = studentsWithGrade.reduce((sum, student) => sum + student[1] , 0);
    let average = sumOfGrades / studentsWithGrade.length;

    console.log(`=${name} Grades=`);
    studentsWithGrade.forEach(student => console.log(`${student[0]}: ${student[1]}`));
    console.log(`Course Average ${average}`);
  },
};

let math = { name: 'Math', code: 101};
let advMath = { name: 'Advanced Math', code: 102 };
let physics = { name: 'Physics', code: 202 };

school.addStudent('foo', '3rd');
school.enrollStudent('foo', Object.assign({}, math));
school.enrollStudent('foo', Object.assign({}, advMath));
school.enrollStudent('foo', Object.assign({}, physics));
school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

school.addStudent('bar', '1st');
school.enrollStudent('bar', Object.assign({}, math));
school.addGrade('bar', 101, 91);

school.addStudent('qux', '2nd');
school.enrollStudent('qux', Object.assign({}, math));
school.enrollStudent('qux', Object.assign({}, advMath));
school.addGrade('qux', 101, 93);
school.addGrade('qux', 102, 90);

// console.log(school.students.foo.courses);
// console.log(school.students.bar.courses);
// console.log(school.students.qux.courses);

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
