const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
var circleArray = [];

const color = ["#f9d5bb", "#a6b9ea", "#781526"];

var maxRadius = 35;
var minRadius = 5;
var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx; // Ajuste la vitesse horizontale
  this.dy = dy; // Ajuste la vitesse verticale
  this.radius = radius;
  this.color = color[Math.floor(Math.random() * color.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    this.draw();
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y -= this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < maxRadius
    ) {
      this.radius += 1;
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }
  };
}

function init() {
  circleArray = [];
  for (var i = 0; i < 200; i++) {
    var r = Math.floor(Math.random() * 3) + 1;
    var x = Math.random() * (innerWidth - r * 2) + r;
    var y = Math.random() * (innerHeight - r * 2) + r;
    var dx = (Math.random() - 0.5) * 1; // Ajuste la vitesse horizontale
    var dy = (Math.random() - 0.5) * 1; // Ajuste la vitesse verticale
    circleArray.push(new Circle(x, y, dx, dy, r));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
init();

/*****************/

function alternateEmojis() {
  const emojiIcon = document.getElementById("emoji-icon");
  if (emojiIcon) {
    // Utilise une variable pour suivre l'état actuel
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
  ".(^-^)'",
  "-(^-^)-",
  "'(^-^).",
  "-(^o^)-",
  ".(^-^)'",
  "-(^-^)-",
  "'(^-^).",
  "-(^-^)-",
];

var animArray0 = [
  "-(*-*)›",
  "-(*-*)-",
  "-(*-*)-",
  "-(*o*)›",
  "-(*-*)-",
  "-(*-*)-",
  "-(*-*)›",
  "-(*-*)-",
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
