// test

function calculateBMI(weight: number, height: number): string {
    let prefix: string = "Your BMI is:";
    return `${prefix} ${(weight / Math.pow(height / 100, 2)).toFixed(2)}`;
}

console.log(calculateBMI(82, 188));