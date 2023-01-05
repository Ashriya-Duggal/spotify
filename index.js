var button = document.querySelectorAll(".play");
let playing = true;
let masterPlay = document.getElementById("master");
let previous = document.getElementById("previous");
let forward = document.getElementById("forward");
let songplay = [];
let seekUpdate =[];
function audiofunc(h) {
  audio = new Audio(h + ".mp3");
  audio.play();
  document.querySelector("#gif").style.display = "inline-block";
  // update seekbar
  audio.addEventListener("timeupdate", () => {
    var progress = parseInt((audio.currentTime / audio.duration) * 100);
    var pro = document.getElementById("myRange");
    pro.value = progress;
  });
  var seekbar = document.getElementById("myRange");
  seekbar.addEventListener("change", () => {
    audio.currentTime = (seekbar.value * audio.duration) / 100;
  });}
// play/pause on click
if (songplay.length <= 1) {
  previous.style.opacity = 0.1;
}
if (songplay.length == 0) {
  forward.style.opacity = 0.1;
}
button.forEach((i) => {
  i.addEventListener("click", (e) => {
    var info = e.target.parentNode.previousElementSibling.textContent;
    document.getElementById("song-info").textContent = info;  
    var id = e.target.id;
    let newId = document.getElementById(id);
    if (playing == true && songplay.length == 0) {
      songplay.push(id);
      audiofunc(id);
      seekUpdate.push(audio);
      newId.style.backgroundImage = "url(pausec.png)";
      masterPlay.style.backgroundImage = "url(pausec.png)";
      playing = false;
    } else if (playing == true && songplay.length != 0) {
      audio.pause();
      document.querySelector("#gif").style.display = "none";
      var sign = document.getElementById(songplay[0]);
      sign.style.backgroundImage = "url(playc.png)";
      songplay = [];
      songplay.push(id);
      audiofunc(id);
      newId.style.backgroundImage = "url(pausec.png)";
      masterPlay.style.backgroundImage = "url(pausec.png)";
      playing = false;
    } else if (songplay[0] == id) {
      audio.pause();
      document.querySelector("#gif").style.display = "none";
      newId.style.backgroundImage = "url(playc.png)";
      masterPlay.style.backgroundImage = "url(playc.png)";
      playing = true;
    } else {
      audio.pause();
      document.querySelector("#gif").style.display = "none";
      var sign = document.getElementById(songplay[0]);
      sign.style.backgroundImage = "url(playc.png)";
      songplay = [];
      newId.style.backgroundImage = "url(pausec.png)";
      songplay.push(id);
      audiofunc(id);
      playing = true;
    }
    if (id == 1) {
      previous.style.opacity = 0.1;
    }
    if (id >= 1 && id <= 9) {
      forward.style.opacity = 1;
    }
    if (id == 10) {
      forward.style.opacity = 0.1;
    }
    if (id >=2 && id <= 10) {
      previous.style.opacity = 1;
    }
  });});

// Master play button functioning
masterPlay.addEventListener("click", () => {
  var di = 1;
  if (playing == true && songplay.length == 0) {
    var info = document.getElementById(di).parentNode.previousElementSibling.textContent;
    document.getElementById("song-info").textContent = info;  
    audiofunc(di);
    masterPlay.style.backgroundImage = "url(pausec.png)";
    playing = false;
    songplay.push(di);
    let sign = document.getElementById(songplay[0]);
    sign.style.backgroundImage = "url(pausec.png)";
    forward.style.opacity = 1;
  } else if (playing == true && songplay.length >= 1 && songplay.length <= 9) {
    audio.pause();
    let sign = document.getElementById(songplay[0]);
    sign.style.backgroundImage = "url(playc.png)";
    document.querySelector("#gif").style.display = "none";
    audio.play();
    document.querySelector("#gif").style.display = "inline-block";
    masterPlay.style.backgroundImage = "url(pausec.png)";
    sign.style.backgroundImage = "url(pausec.png)";
    playing = false;
  } else {
    audio.pause();
    document.querySelector("#gif").style.display = "none";
    masterPlay.style.backgroundImage = "url(playc.png)";
    let sign = document.getElementById(songplay[0]);
    sign.style.backgroundImage = "url(playc.png)";
    playing = true;
  }
});

// previous button functioning
previous.addEventListener("click", () => {
  if (songplay.length >= 1 && previous.style.opacity == 1) {
    let sign = document.getElementById(songplay[0]);
    sign.style.backgroundImage = "url(playc.png)";
    audio.pause();
    let game = songplay[0] - 1;
    audiofunc(game);
    var info = document.getElementById(game).parentNode.previousElementSibling.textContent;
    document.getElementById("song-info").textContent = info;  
    masterPlay.style.backgroundImage = "url(pausec.png)";
    songplay = [];
    var op = document.getElementById(game);
    op.style.backgroundImage = "url(pausec.png)";
    songplay.push(game);
  }
  if (songplay[0] <= 1) {
    previous.style.opacity = 0.1;
  }});
// forward button functioning
forward.addEventListener("click", () => {
  if (songplay.length >= 1 && forward.style.opacity == 1) {
    var sign = document.getElementById(songplay[0]);
    sign.style.backgroundImage = "url(playc.png)";
    audio.pause();
    var try1 = parseInt(songplay[0]);
    let gam = try1 + 1;
    audiofunc(gam);
    masterPlay.style.backgroundImage = "url(pausec.png)";
    var info = document.getElementById(gam).parentNode.previousElementSibling.textContent;
    document.getElementById("song-info").textContent = info;  
    songplay = [];
    var op = document.getElementById(gam);
    op.style.backgroundImage = "url(pausec.png)";
    songplay.push(gam);
  }
  if (try1 == 9) {
    forward.style.opacity = 0.1;
  }
  if (try1 <= 8) {
    forward.style.opacity = 1;
  }
  if (try1 == 1 && try1<=9) {
    previous.style.opacity = 1;
  }});
