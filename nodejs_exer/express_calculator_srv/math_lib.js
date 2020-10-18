//server-side mathematical part
function calculate_BMI(height, weight){
  height = Number(height) / 100;
  let BMI = Number(weight) / Math.pow(height, 2);
  // if height or weight isn't a number, then BMI isn't a number, throw err
  if (isNaN(BMI)) {
    throw new Error('Invalid input. Your input should be number!');
  } else {
    // round BMI to 2 numbers after dot
    return "Your BMI is " + BMI.toFixed(2).toString();
  }
}

exports.calculateBMI = calculate_BMI;
