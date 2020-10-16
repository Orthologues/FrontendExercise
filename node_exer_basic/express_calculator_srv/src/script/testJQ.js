// this file corresponds to '../../BMIcalculator.html'

$(document).ready(function() {
  console.log("JQuery is incorperated!");
});

$("#bmi-submit").click(function() {
  console.log('DOM triggered!');
  try {
    let test_audio = new Audio('/assets/sound/wrong.mp3');
    test_audio.play();
  } catch (e) {
    console.log("music not found!");
  }
});
