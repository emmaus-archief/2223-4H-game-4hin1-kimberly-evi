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
var spelStatus = SPELEN;

const KEY_LEFT =  37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijandX = 600;
var vijandY = 499;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  //test
  if (keyIsDown(KEY_LEFT)){
       spelerX = spelerX -3; 
  }

  if (keyIsDown(KEY_RIGHT)){
    spelerX = spelerX +3;
  }

  if(keyIsDown(KEY_UP)){
    spelerY = spelerY -3;
  }

  if (keyIsDown(KEY_DOWN)){
    spelerY = spelerY +3;
  }
  
  // vijand

  // kogel
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
  rect(0,0,1280,720)
  // vijand
fill ("red")
  rect(vijandX - 25, vijandY -25, 50,50);
  fill("black")
  ellipse(vijandX, vijandY, 10, 10);
  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 80);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() { 
  if(spelerX - vijandX <50 &&
       spelerX - vijandX > -50 &&
       spelerY - vijandY <50 &&
       spelerY - vijandY > -50) {
       aantal = aantal +1;
       console.log ("Botsing" +aantal);
       }
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

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
    textSize(20);
    fill("black");
    text("game over, druk spatie voor start", 100, 100);
    if (keyIsDown(32)){ //spaties
      spelerX = 400;
      spelStatus = SPELEN;
      
    }
  }
  if (spelStatus === GAMEOVER) {
    console.log("game over");
    // teken game-over scherm

  }
  if (spelStatus === UITLEG){
    console.log("uitleg");
    textSize(50);
    fill(green);
    rect(0,0, 1280, 720);
    fill(white);
    text("uitleg doe je ding, druk op enter", 100, 100);
    if (keyIsDown(13)) { //enter
     spelerX = 400;
      spelStatus = SPELEN;
    // teken uitleg scherm
    }
  }
}
