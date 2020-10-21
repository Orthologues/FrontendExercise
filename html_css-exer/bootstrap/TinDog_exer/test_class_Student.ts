// use 'tsc *.ts' in terminal to compile a typescript file into a .js file

class Student {
  polite_title: string;
  constructor(
    public if_married: boolean,
    public sex: string,
    public surname: string
  ) {
    if (sex === "M") {
      this.polite_title = " Mr." + surname;
    } else if (sex === "F" && if_married === true) {
      this.polite_title = " Mrs." + surname;
    } else if (sex === "F" && if_married === false) {
      this.polite_title = " Miss." + surname;
    } else if (sex === "F") {
      this.polite_title = " Ms." + surname;
    } else {
      this.polite_title = " However, you have to give either M or F as your sex!";
    }
  }
}

interface Person {
  polite_title: string;
}

function greeter(person: Person) {
  return "Hi!" + person.polite_title;
}

let student_1 = new Student(null, "F", "Lopez");
let student_2 = new Student(false, "F", "Garcia");
let student_3 = new Student(true, "F", "Koizumi");
let student_4 = new Student(null, "M", "Perez");
let student_5 = new Student(true, "Unknown", "Svesson");
let students = [student_1, student_2, student_3, student_4, student_5];

for (let student of students) {
  console.log(greeter(student));
}
