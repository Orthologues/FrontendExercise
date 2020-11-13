"use strict";
// test
function calculateBMI(weight, height) {
    let prefix = "Your BMI is:";
    return `${prefix} ${(weight / Math.pow(height / 100, 2)).toFixed(2)}`;
}
console.log(calculateBMI(82, 188));
