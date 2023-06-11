
/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"


  /* ***** */
/* Variabelen */
/* ***** */

// Spelstatus
var UITLEG = 0;
var SPELEN = 1;
var GAMEOVER = 2;
var spelStatus = UITLEG;

// Score
var score = 0;

// Speler
var spelerImg;
var spelerWidth;
var spelerHeight;
var spelerX;
var spelerY;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

// Kogel
var kogelX;
var kogelY;

// Vierkanten
var vierkanten = [];
var lastVierkantTime;

// Tijd
var startTime;

/* ***** */
/* Functies */
/* ***** */

/**
 * Beweegt speler, kogel en vierkanten op basis van gebruikersinvoer en spelregels
 */
var beweegAlles = function() {
  // Beweeg speler
  // Als de linkerbeweging is ingeschakeld en de speler niet aan de linkerkant van het canvas is
  if (moveLeft && spelerX > 0) {
  spelerX -= 5; // Verplaats de speler naar links met 5 pixels
}

// Als de rechterbeweging is ingeschakeld en de speler niet aan de rechterkant van het canvas is
  if (moveRight && spelerX < width - spelerImg.width) {
  spelerX += 5; // Verplaats de speler naar rechts met 5 pixels
}

// Als de omhoogbeweging is ingeschakeld en de speler niet aan de bovenkant van het canvas is
  if (moveUp && spelerY > 0) {
  spelerY -= 5; // Verplaats de speler omhoog met 5 pixels
}

// Als de omlaagbeweging is ingeschakeld en de speler niet aan de onderkant van het canvas is
  if (moveDown && spelerY < height - spelerImg.height) {
  spelerY += 5; // Verplaats de speler omlaag met 5 pixels
}

  // Controleer botsing met blauwe ellips
  var d = dist(spelerX + spelerWidth / 2, spelerY + spelerHeight / 2, kogelX, kogelY);
  if (d < spelerWidth / 2 + 5) {
    spelStatus = GAMEOVER;
  }

  // Controleer botsing met groene vierkanten
  for (var i = vierkanten.length - 1; i >= 0; i--) {
    var vierkant = vierkanten[i];
    var vierkantCenterX = vierkant.x + 10;
    var vierkantCenterY = vierkant.y + 10;
    var d = dist(spelerX + spelerWidth / 2, spelerY + spelerHeight / 2, vierkantCenterX, vierkantCenterY); 
    if (d < spelerWidth / 2 + 10) {
      score += 10;
      vierkanten.splice(i, 1); // verdwijnt vierkant (internet)
    }
  }

  // Beweeg kogel
  kogelY -= 1;
  if (kogelY < -10) {
    kogelX = random(0, width);
    kogelY = height + 10;
  }

  // Voeg nieuwe vierkant toe
  var elapsedSeconds = (millis() - startTime) / 1000;
  if (elapsedSeconds - lastVierkantTime > 1) {
    var nieuwVierkantX = random(0, width - 20);
    var nieuwVierkantY = -20;
    var nieuwVierkant = createVector(nieuwVierkantX, nieuwVierkantY);
    vierkanten.push(nieuwVierkant); // van internet
    lastVierkantTime = elapsedSeconds;
  }

  // Beweeg en verwijder vierkanten
  for (var i = vierkanten.length - 1; i >= 0; i--) {
    var vierkant = vierkanten[i];
    vierkant.y += 1;
    if (vierkant.y > height) {
      vierkanten.splice(i, 1);
    }
  }
};

/**
 * Tekent speler, kogel, vierkanten en timer op het canvas
 */
var tekenAlles = function() {
  // Wis het canvas
  background(138,169,246);

  // Teken speler
  image(spelerImg, spelerX, spelerY, spelerWidth, spelerHeight);

  // Teken kogel
  fill(0, 0, 255);
  ellipse(kogelX, kogelY, 10, 10);

  // Teken vierkanten
  fill(0, 255, 0);
  for (var i = 0; i < vierkanten.length; i++) {
    var vierkant = vierkanten[i];
    rect(vierkant.x, vierkant.y, 20, 20);
  }

  // Teken score
  fill(255);
  textAlign(RIGHT, TOP);
  textSize(24);
  text("Score: " + score, width - 10, 10);
};

/* ***** */
/* P5.js functies */
/* ***** */

function preload() {
  // Laad de afbeelding voor de speler
  spelerImg = loadImage('car.jpg');
}

function setup() {
  // Maak het canvas
  createCanvas(400, 400);

  // Initialiseer speler
  spelerWidth = 40;
  spelerHeight = 40;
  spelerX = width / 2 - spelerWidth / 2;
  spelerY = height - spelerHeight;

  // Initialiseer kogel
  kogelX = random(0, width);
  kogelY = height + 10;

  // Initialiseer vierkanten
  lastVierkantTime = 0;

  // Initialiseer tijd
  startTime = millis();
}

function draw() {
  if (spelStatus === SPELEN) {
    // Beweeg en teken alles
    beweegAlles();
    tekenAlles();
  } else if (spelStatus === GAMEOVER) {
    // Teken game-over bericht
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Game Over", width / 2, height / 2);
    text("Press Enter to Play Again", width / 2, height / 2 + 30);
  } else {
    // Teken uitleg bericht
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Press Enter to Play", width / 2, height / 2);
  }
}

function keyPressed() {
  // Start het spel bij Enter
  if (keyCode === ENTER && spelStatus !== SPELEN) {
    spelStatus = SPELEN;
    startTime = millis();
    vierkanten = [];
  }

  // Beweeg speler bij pijltjestoetsen
  if (keyCode === LEFT_ARROW) {
    moveLeft = true;
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight = true;
  }
  if (keyCode === UP_ARROW) {
    moveUp = true;
  }
  if (keyCode === DOWN_ARROW) {
    moveDown = true;
  }
}

function keyReleased() {
  // Reset beweging bij loslaten pijltjestoetsen
  if (keyCode === LEFT_ARROW) {
    moveLeft = false;
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight = false;
  }
  if (keyCode === UP_ARROW) {
    moveUp = false;
  }
  if (keyCode === DOWN_ARROW) {
    moveDown = false;
  }
}