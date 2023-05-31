
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

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

var spelerX = 0; // x-positie van speler
var spelerY = 0; // y-positie van speler

var kogelX = 400;
var kogelY = 300;
var kogelVliegt = false;

var img; //plaatje 



/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  //test
  if (keyIsDown(KEY_LEFT)) {
    spelerX = spelerX - 3;
  }

  if (keyIsDown(KEY_RIGHT)) {
    spelerX = spelerX + 3;
  }

  if (keyIsDown(KEY_UP)) {
    spelerY = spelerY - 3;
  }

  if (keyIsDown(KEY_DOWN)) {
    spelerY = spelerY + 3;
  }

  // vijand

  // kogel
  if (kogelVliegt === false && 
      keyIsDown(32)) {
    kogelVliegt = true;
    kogelX = spelerX;
    kogelY = spelerY;
}
if (kogelVliegt === true) {
  kogelY = kogelY + 1;
}
if (kogelVliegt === true && 
   kogelY < 0) {
  kogelVliegt = false;
   }
  };

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  
  fill('green');
  rect(0, 0, 1280, 720);
  // vijand

  //vijand 2
  
  // kogel
  fill("red");
  ellipse (kogelX, kogelY, 20, 20);
  
  // speler
  fill("white");
  image(img, spelerX - 25, spelerY - 25, 110, 75);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);


  
  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  if (spelerX - kogelX < 50 &&
    spelerX - kogelX > -50 &&
    spelerY - kogelY < 50 &&
    spelerY - kogelY > -50) {
    //aantal = aantal + 1;
    //console.log("Botsing" + aantal);
    return true;
  }
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

function preload() {
  img = loadImage('auto 2.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('rgb(138,169,246)');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
    console.log("spelen");


  }

  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game over");
    textSize(20);
    fill("black");
    text("game over, druk spatie voor start", 100, 100);
    if (keyIsDown(32 )) { //spaties
      spelStatus = UITLEG;

    }
  }
  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    console.log("uitleg");
    textSize(50);
    fill("green");
    rect(0, 0, 1280, 720);
    fill("white");
    text("uitleg doe je ding, druk op enter", 100, 100);
    if (keyIsDown(13)) { //enter
      spelerX = 30;
      spelerY = 350;
      spelStatus = SPELEN;

    }

  }

}