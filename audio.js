// Load a bunch of audio files and make them easy to play back.
// Typical usage: audio.wave.play();

var audio = {
  "wave" : "Assets/wave.m4a",
  "gull" : "Assets/gull.m4a",
  "music" : "Assets/Synthetic.mp3",
  "plop" : "Assets/plop-splash.wav"
};

function initAudio() {
  // Replace the path to a file with an audio object.
  for (var name in audio) {
    audio[name] = new Audio(audio[name]);
  }
}
