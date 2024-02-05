setTimeout(function () {
  document.body.classList.add("loaded");
}, 122);

function alternateEmojis() {
  const emojiIcon = document.getElementById("emoji-icon");
  if (emojiIcon) {
    if (emojiIcon.textContent === "😂") {
      emojiIcon.textContent = "💩 ";
    } else {
      emojiIcon.textContent = "😂";
    }
  }
}

function getRandomJoke() {
  fetch(
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.type === "single") {
        document.getElementById("joke").innerHTML = data.joke;
      } else {
        document.getElementById(
          "joke"
        ).innerHTML = `${data.setup}<br><br>${data.delivery}`;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la blague :", error);
    });
  alternateEmojis();
}
getRandomJoke();

setInterval(getRandomJoke, 7500);

/*****************/

// Déclare une variable pour stocker l'instance d'animation
var currentAnimation;

function ASCIIAnimation(animArray, speed, DOMtarget) {
  var currentFrame = 0;
  for (var i = 0; i < animArray.length; i++) {
    animArray[i] = animArray[i].replace(/ /g, "&nbsp;");
    animArray[i] = "<pre>" + animArray[i] + "</pre>";
  }
  DOMtarget.innerHTML = animArray[0];
  currentFrame++;
  this.animation = setInterval(function () {
    DOMtarget.innerHTML = animArray[currentFrame];
    currentFrame++;
    if (currentFrame >= animArray.length) currentFrame = 0;
  }, speed);
  this.getCurrentFrame = function () {
    return currentFrame;
  };
}

ASCIIAnimation.prototype.stopAnimation = function () {
  clearInterval(this.animation);
};

function startNewAnimation(animArray, speed, DOMtarget) {
  // Arrête l'animation en cours s'il y en a une
  if (currentAnimation) {
    currentAnimation.stopAnimation();
    clearInterval(currentAnimation.animation);
  }

  // Crée une nouvelle instance d'animation
  currentAnimation = new ASCIIAnimation(animArray, speed, DOMtarget);
}

var targetDiv = document.getElementById("ascii-anim"); // Obtient la div existante avec l'id "ascii-anim"
var animArray1 = [
  ".(^o^)'",
  "-(^.^)-",
  "'(^o^).",
  "-(^.^)-",
  ".(^o^)'",
  "-(^.^)-",
  "'(^o^).",
  "-(^.^)-",
];

var animArray0 = [
  ".(^-^)'",
  "-(^-^)-",
  "'(^-^).",
  "-(^o^)-",
  ".(^-^)'",
  "-(^-^)-",
  "'(^-^).",
  "-(^-^)-",
];

startNewAnimation(animArray0, 500, targetDiv);

const audio = document.querySelector("audio");

audio.addEventListener("play", () => {
  console.log("Lecture en cours");
  startNewAnimation(animArray1, 500, targetDiv);
});

audio.addEventListener("pause", () => {
  console.log("Lecture en pause");
  startNewAnimation(animArray0, 500, targetDiv);
});

function stswd_afficherHeure() {
  const maintenant = new Date();
  const heures = maintenant.getHours().toString().padStart(2, "0");
  const minutes = maintenant.getMinutes().toString().padStart(2, "0");
  const secondes = maintenant.getSeconds().toString().padStart(2, "0");

  const heureActuelle = `${heures}:${minutes}:${secondes}`;

  document.getElementById("clock").innerText = heureActuelle;

  setTimeout(stswd_afficherHeure, 1000);
}

stswd_afficherHeure();

// Utiliser un service d'API pour récupérer l'ip, exemple avec ipinfo.io
const h1Element = document.querySelector("h1 strong");

fetch("https://api64.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Adresse IP : ", data.ip);
    // Utiliser un service tiers pour récupérer la ville depuis l'IP
    fetch("https://ipapi.co/" + data.ip + "/json/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Ville : ", data.city);
        h1Element.innerText = data.city;
      })
      .catch((error) => console.error("Erreur : ", error));
  })
  .catch((error) => console.error("Erreur : ", error));

/********* Test *****/
navigator.getBattery().then(function (battery) {
  const infosBatterie = {
    niveau: battery.level * 100, // En pourcentage
    chargeEnCours: battery.charging,
    tempsRestant: battery.dischargingTime, // En secondes
  };

  console.log(infosBatterie);
});
const infosEquipement = {
  appName: navigator.appName,
  appVersion: navigator.appVersion,
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  colorDepth: window.screen.colorDepth,
  cookiesEnabled: navigator.cookieEnabled,
  language: navigator.language,
  javaEnabled: navigator.javaEnabled(),
  orientation: window.screen.orientation.type,
  mouvement: "DeviceMotionEvent" in window,
  orientationMouvement: "DeviceOrientationEvent" in window,
  performances: window.performance
    ? window.performance.toJSON()
    : "Non supporté",
  gestionnaireTâches: navigator.scheduling
    ? navigator.scheduling.isInputPending()
    : "Non supporté",
};

console.log(infosEquipement);
