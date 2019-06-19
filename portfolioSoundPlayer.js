function playSound(file){
  console.log("playing sound");
  var audio = document.getElementById("myAudio");
  audio.src = "sounds/"+file
  audio.play();
}
