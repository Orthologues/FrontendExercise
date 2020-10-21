// this .js file corresponds to ~/js_exer_basic/DrumKit_DOM_exer/index.html

// button press
var num_button = document.querySelectorAll(".drum").length;
for (var i = 0; i < num_button; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function(evt) {
    console.log(evt.type);
    let keyLetter = this.textContent;
    key2audio(keyLetter);
    key_pressed_animation(keyLetter);
  });
}

// keyboard press
document.addEventListener("keydown", function(evt) {
  console.log(evt.keyCode);
  // convert ASCII code(evt.keyCode) to capitalized letter
  let keyLetter = String.fromCharCode(evt.keyCode);
  key2audio(keyLetter);
  key_pressed_animation(keyLetter);
});

function key2audio(key) {
  let keyLetter = key.toLowerCase();
  switch (keyLetter) {
    case "w":
      var audio = new Audio(src = "sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio(src = "sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio(src = "sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio(src = "sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio(src = "sounds/crash.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio(src = "sounds/kick-bass.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio(src = "sounds/snare.mp3");
      audio.play();
      break;
    default:
      console.log("wrong button pressed!");
  }
}

function key_pressed_animation(key) {
  try {
    let button = document.querySelector("." + key.toLowerCase());
    button.className += " pressed";
    setTimeout(button_back_default, 150, button);
  } catch (err) {
    console.log(err.type);
  }
}

function button_back_default(button) {
  // define a regex expression that ends with " pressed"
  let pressed_re = /\s{1}pressed$/;
  // cancel 'pressed' css mode of a button
  button.className = button.className.replace(pressed_re, '');
  console.log(button.className);
}
