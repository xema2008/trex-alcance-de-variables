
var trex ,trex_running;
var trexCollided;
var ground;
var groundImage;
var groundInvisible;
var cloud;
var cloudImage;
var obstacle;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var obstaclesGroup,cloudGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var checkpointSound,dieSound,jumpSound;

function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage=loadImage("ground2.png");
 cloudImage=loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
 trexCollided=loadImage("trex_collided.png");
 gameOverImg=loadImage("gameOver.png");
 restartImg=loadImage("restart.png");
 checkpointSound=loadSound("checkpoint.mp3");
 jumpSound=loadSound("jump.mp3");
 dieSound=loadSound("die.mp3");

}

function setup(){
  createCanvas(600,200)

  
  
  score=0;
  
  //crear sprite del t-rex.
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running",trex_running);
 trex.setCollider("circle",0,0,40);
 //visualizar el rango de colicion
 //trex.debug=true;
 edges=createEdgeSprites();



 //agregar tamaño y posicion al trex
 trex.scale=0.5;
 trex.x=50;

 //crear el suelo
 ground=createSprite(200,180,400,20);
 ground.addImage("suelo",groundImage);
 ground.x=ground.width/2;

 gameOver=createSprite(300,100);
 gameOver.addImage(gameOverImg);
 gameOver.scale=0.5;

 restart=createSprite(300,140);
 restart.addImage(restartImg);
 restart.scale=0.5;


  
 //crear suelo invisible
 groundInvisible=createSprite(200,190,400,10);
 groundInvisible.visible=false;

 obstacleGroup=new Group();
 cloudGroup=new Group();

 
}

function draw(){
  background(200);
  text("puntuacion:"+ score,500,50);
  console.log(gameState);
  
  if(gameState===PLAY){
    gameOver.visible=false;

    restart.visible=false;
    
    ground.velocityX=-2;
    score = score+Math.round(frameCount/60);
    if(score>0&&score%100===0){
      checkpointSound.play();

    }
     //suelo infinito
  if(ground.x<0){
    ground.x=ground.width/2;  
  }
  
  if(keyDown("space")&&trex.y>=100){
    trex.velocityY=-10;
    jumpSound.play();
  }
  
  //asignar gravedad al trex
  trex.velocityY=trex.velocityY+0.5;

  spawClouds();
  spawObstacles();
  if(obstacleGroup.isTouching(trex)){
    gameState=END;
    dieSound.play();
  }
  }
  
  else if(gameState===END){
      ground.velocityX=0;

      trex.velocityY=0;

      gameOver.visible=true;

      restart.visible=true;

      obstacleGroup.setVelocityXEach(0);

      cloudGroup.setVelocityXEach(0);

      trex.changeAnimation("collided",trexCollided);

      if(mousePressedOver(restart)){
        console.log(reinicio);
      }
      

      //establese el tiempo de vida en las cosas

      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);

    
  }
 
  trex.collide(groundInvisible);
  
  drawSprites();
}
  
function spawClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.y=Math.round(random(10,60));
    cloud.scale=0.4;
    cloud.velocityX=-3;

    //asignar tiempo de vida a las nubes
    cloud.lifetime=200;

    //ajuste de profundidad
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
  }
  
 
}  

function spawObstacles(){
if(frameCount%60===0){
  obstacle=createSprite(600,165,10,40);
  obstacle.velocityX=-(4+3*score/100); 

var rand=Math.round(random(1,6))
switch(rand){
  case 1:obstacle.addImage(obstacle1)
  break;
  case 2:obstacle.addImage(obstacle2)
  break;
  case 3:obstacle.addImage(obstacle3)
  break;
  case 4:obstacle.addImage(obstacle4)
  break;
  case 5:obstacle.addImage(obstacle5)
  break;
  case 6:obstacle.addImage(obstacle6)
  break;
  default:break;

}
//asignar tamaño y vida a los obstaculos
obstacle.scale=0.5;
obstacle.lifetime=300;
obstacleGroup.add(obstacle);
}
}