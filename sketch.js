var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

//create variables for the images
var track, car1_Img, car2_Img, car3_Img, car4_Img;

var bg;


function preload() {
  //load all the images
  track = loadImage("images/track.jpg");
  car1_Img = loadImage("images/car1.png");
  car2_Img = loadImage("images/car2.png");
  car3_Img = loadImage("images/car3.png");
  car4_Img = loadImage("images/car4.png");

  //load the form image
  bg = loadImage("images/background_for_form.gif");

}





function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw() {
  if (playerCount === 4) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }

  //call the end function if gamestate is 2
  if (gameState === 2) {
    game.end();

  }
}