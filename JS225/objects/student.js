/*
factory: student object:
  - name - string
  - year - string
  - courseList - array

  methods:
  - info - name is a year year student (string)
  - list courses - logs the courses array
  - add course - adds a course object to courses
    - course objects:
      - name
      - code (integer)

  - add note - adds 'note' property to course (by code) with a string
             - if course has not already, appned note
  - update note - rplace note with new note for that course
  - view Notes - prints all notes for student, with each course on it's own line and
   multiple notes
        delimted by ';'


*/

function createStudent(name, year) {
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
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"