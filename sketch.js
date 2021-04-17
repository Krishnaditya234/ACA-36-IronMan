//variables
var ironMan, iron_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;
var gameState="PLAY";
//preload function 
function preload(){
  ironImage =  loadImage("images/iron.png");
  bgImage = loadImage("images/bg.jpg");
  brickImage = loadImage("images/stone.png");
  coinImage = loadImage("images/diamond.png");
  obstacleImage = loadImage("images/spikes.png")
}

//preload function
function setup() {
  createCanvas(1366, 650);
  //background sprite is created here
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =2;
  bg.velocityY=8;
  //ironMan sprite is created here
  ironMan = createSprite(200, 505, 1, 50);
  ironMan.addImage( ironImage);
  ironMan.scale = 0.2;
  ironMan.debug=false; 

  //ground sprite is created here
  ground = createSprite(100,585,2500,10);
  ground.visible=false;
  //new groups are created here
  bricksGroup = new Group();
  coinsGroup = new Group();
  obstaclesGroup = new Group();
}
//draw function is created here
function draw() {

  //scroll BG
  if (bg.y > 600){
    bg.y=bg.width/4;
  }
  //movement of iron Man 
  if(keyDown("up")){
    ironMan.velocityY= -12;
  }
  if(keyDown("left")){
    ironMan.x-=10;
  }
  if(keyDown("right")){
    ironMan.x+=10
    ;
  }
  //gravity
   ironMan.velocityY += 1;

   ironMan.collide(ground);
  //Obstacles are created
   generateObstacles();
   for(var i = 0 ; i< ( obstaclesGroup).length ;i++){
    var temp = ( obstaclesGroup).get(i) ;
    
    if (temp.isTouching(ironMan)) {
      coinScore=coinScore-5;
      temp.destroy();
      temp=null;
      }
        
    }
    if(coinScore<=-10 ){
     gameState ="END";
    }
    if(gameState === "END"){
      bg.velocityY=0;
      ironMan.velocityY=0;
      ironMan.velocityX=0;
      coinsGroup.setLifetimeEach(0);
      obstaclesGroup.setLifetimeEach(0);
      brickGroup.setLifetimeEach(0);
      ironMan.setLifetime(0);
      coinsGroup.setVelocityYEach(0);
      obstaclesGroup.setVelocityYEach(0);
      brickGroup.setVelocityYEach(0);

    }

  //Bricks are created
   generateBricks();
for(var i = 0 ; i< (bricksGroup).length ;i++){
  var temp = (bricksGroup).get(i) ;
  
  if (temp.isTouching(ironMan)) {
     ironMan.collide(temp);
 
    }
      
  }
  //diamonds are created
  generateCoins();
  for(var i = 0 ; i< (coinsGroup).length ;i++){
    var temp = (coinsGroup).get(i) ;
    
    if (temp.isTouching(ironMan)) {
      coinScore++;
      temp.destroy();
      temp=null;
      }
        
    }



    drawSprites();
  textSize(20);
  fill("brown")
  text("Diamonds Collected: "+ coinScore, 500,50);
}


//generateBricks function is here
function generateBricks() {
  var v = Math.round(random(100,200))
  if (frameCount % v === 0) {
    var brick = createSprite(random(800,40),40,10);
    brick.y = 1;
    brick.addImage("brick",brickImage);
    brick.x = Math.round(random(0,1260));
    brick.scale = 0.6;
    brick.velocityY = 1;
    
    brick.lifetime =1200;
    bricksGroup.add(brick);
  }
}
//generateCoins function is here
function generateCoins() {
  var v = Math.round(random(100,200))
  if (frameCount % v === 0) {
    var coin = createSprite(1200,120,40,10);
    coin.addImage("coin", coinImage);
    coin.x = Math.round(random(0,1260));
    coin.y = 1;
    coin.scale = 0.5;
    coin.velocityY = 1;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}
//generateObstacles function is here
function generateObstacles() {
  var a = Math.round(random(100,200));
  if(frameCount % a === 0) {
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityY = 4;
    obstacle.scale=1;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.x = Math.round(random(0,1260));
    obstacle.y = 1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}