var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var cloudsGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  obstacles1 = loadImage("obstacle1.png")
  obstacles2 = loadImage("obstacle2.png")
  obstacles3 = loadImage("obstacle3.png")
  obstacles4 = loadImage("obstacle4.png")
  obstacles5 = loadImage("obstacle5.png")
  obstacles6 = loadImage("obstacle6.png")
  cloudImage = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6+3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score =0
  
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}

function draw() {
  background("white");        
  text("Score"+score,550, 50);
  
  if(gameState===PLAY){
    
  if(keyDown("space") && trex.y >= 161) {
    trex.velocityY = -10;
  }
  score=score+Math.round(getFrameRate()/60)
  //console.log(trex.y);//
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  spawnClouds();
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
  }
  } 
  
  else if(gameState===END){
   ground.velocityX=0; 
  } 
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,20,40,10);
    cloud.y = random(15,50);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 180;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,40,10);
    obstacle.velocityX = -3;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1:obstacle.addImage(obstacles1);
      break;
      case 2:obstacle.addImage(obstacles2);
      break;
      case 3:obstacle.addImage(obstacles3);
      break;
      case 4:obstacle.addImage(obstacles4);
      break;
      case 5:obstacle.addImage(obstacles5);
      break;
      case 6:obstacle.addImage(obstacles6);
      break;
      default:break;
    }
    
    obstacle.scale = 0.5;
      
     //assign lifetime to the variable
    obstacle.lifetime = 250;
    
    obstaclesGroup.add(obstacle);
    
    //adjust the depth
    
  }
  
}
