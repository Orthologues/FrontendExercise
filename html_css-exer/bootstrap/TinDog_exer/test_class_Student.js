// this file was compiled by using 'tsc test_class_Student.ts' under the same subdirectory
var Student = /** @class */ (function () {
    function Student(if_married, sex, surname) {
        this.if_married = if_married;
        this.sex = sex;
        this.surname = surname;
        if (sex === "M") {
            this.polite_title = " Mr." + surname;
        }
        else if (sex === "F" && if_married === true) {
            this.polite_title = " Mrs." + surname;
        }
        else if (sex === "F" && if_married === false) {
            this.polite_title = " Miss." + surname;
        }
        else if (sex === "F") {
            this.polite_title = " Ms." + surname;
        }
        else {
            this.polite_title = " However, you have to give either M or F as your sex!";
        }
    }
    return Student;
}());
function greeter(person) {
    return "Hi!" + person.polite_title;
}
var student_1 = new Student(null, "F", "Lopez");
var student_2 = new Student(false, "F", "Garcia");
var student_3 = new Student(true, "F", "Koizumi");
var student_4 = new Student(null, "M", "Perez");
var student_5 = new Student(true, "Unknown", "Svesson");
var students = [student_1, student_2, student_3, student_4, student_5];
for (var _i = 0, students_1 = students; _i < students_1.length; _i++) {
    var student = students_1[_i];
    console.log(greeter(student));
}
