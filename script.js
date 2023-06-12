const play = document.querySelector(".btn1");
const reset = document.querySelector(".btn2");
// const btn = document.querySelector(".btn");
const audio = document.querySelector(".audio");
const clock = document.querySelector("p");
const bg = document.querySelector("body");
const audioBody = document.getElementsByClassName("audio");

//? The following are global

let min = 0;
let sec = 0;
let mSec = 0;
let run = false;
let timer;
let colorChanging; // Renk değişimi durumu

const watchTimer = () => {
  mSec++;
  if (mSec == 100) {
    sec++;
    mSec = 0;
  }
  if (sec == 60) {
    min++;
    sec = 0;
  }

  min = String(min).length < 2 ? "0" + min : min;
  sec = String(sec).length < 2 ? "0" + sec : sec;
  mSec = String(mSec).length < 2 ? "0" + mSec : mSec;

  clock.textContent = `${min}:${sec}:${mSec}`;
};

play.addEventListener("click", () => {
  run = !run; //! run başlangıç değeri false idi ben bunu değerini true olarak değiştirdim
  if (run) {
    startColor();
    audioBody.currentTime = 20; // Ses dosyasını 20 saniye sonra başlatır

    audio.play();
    timer = setInterval(watchTimer, 5);
    play.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
  } else {
    stopColor();
    audio.pause();
    clearInterval(timer);
    play.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
  }
});

reset.addEventListener("click", () => {
  audio.pause();
  clearInterval(timer);
  //? asagidaki min , sec , mSec degelerini ; resetleme yaotigi zaman tekrar sifirdan baslamasi icin , yani kaldigi yerden devam etmemesi icin yaptim.
  min = 0;
  sec = 0;
  mSec = 0;
  clock.textContent = "00:00:00";
  play.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
  run = false;
  stopColor();
});

play.onmouseover = function () {
  play.style.color = "red";
  play.style.transform = "scale(1.4, 1.4)";
};
play.onmouseout = function () {
  play.style.color = "black";
  play.style.transform = "scale(1, 1)";
};
reset.onmouseover = function () {
  reset.style.color = "red";
  reset.style.transform = "scale(1.4, 1.4)";
};
reset.onmouseout = function () {
  reset.style.color = "black";
  reset.style.transform = "scale(1, 1)";
};

const colors = [
  "crimson",
  "darkmagenta",
  "darkhaki",
  "darkolivegreen",
  "lightseagreen",
  "darksalmon",
  "cadetblue",
  "ivory",
  "maroon",
  "gold",
  "indigo",
  "darkorange",
];

const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const bgColor = () => {
  bg.style.backgroundColor = randomColor();
};

const startColor = () => {
  colorChanging = setInterval(bgColor, 2000);
};

const stopColor = () => {
  clearInterval(colorChanging);
};
