// Load a bunch of audio files and make them easy to play back.
// Typical usage: audio.wave.play();

var audio = {
  "wave" : "Assets/wave.m4a",
  "gull" : "Assets/gull.m4a",
  "music" : "Assets/Synthetic.mp3",
  "plop" : "Assets/plop-splash.wav",
  "dig" : "Assets/shovel.wav",
  "packDirt" : "Assets/packDirt.wav",
  "hammer" : "Assets/hammer.wav"

};

// plop-splash sound from: https://freesound.org/people/InspectorJ/sounds/416710/
// digging sound from https://freesound.org/people/doorajar/sounds/427074/
// packing dirt from https://freesound.org/people/Joao_Janz/sounds/504347/
// hammer from https://freesound.org/people/BMacZero/sounds/96138/

function initAudio() {
  // Replace the path to a file with an audio object.
  for (var name in audio) {
    audio[name] = new Audio(audio[name]);
    if (name == "dig") {
      audio[name].volume = 0.5;
    }
  }
}
