
var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,  ghostImg;
var invisibleBlock, invisibleblocksGroup;
var sound,gameOver,gameOverImg;
var score = 0;
var gameState = "play"


function preload(){
 
  towerImg = loadImage("tower2.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("b.png");
  sound = loadSound("spooky.wav");
  gameOverImg = loadImage("go.png");
  sound = loadSound("cs.mp3");
  sound2 = loadSound("sound.mp3");
  
}

function setup(){
  createCanvas(600,600);
  sound2.loop();
  tower = createSprite(250,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.15;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblocksGroup = new Group();

 }
function draw(){
  background(0);
  
 if(gameState==="play"){
    
   

    score = score + Math.round(getFrameRate()/60);

    if(score>0 && score%94 === 0){
      sound.play() 
   }

   if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
   if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleblocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  
 if(tower.y > 200){
    tower.y = 100;
 

  }
   spawnDoors();
   camera.position.x = ghost.x;
 }
  
 if(gameState === "end"){
   
    ghost.lifetime = 0;

    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1.2;

    camera.position.x = 300;
    camera.position.y = 300;
    
    var rect = createSprite(400,600,1000,10000)
    rect.shapeColor = "black";
    
    rect.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;

 }
 
 drawSprites();      

 stroke("black");
 fill("black");
 textSize(30);
 text("Score:"+score, 100,100);

}

function spawnDoors(){
  
  if(frameCount%150===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    invisibleblocksGroup.add(invisibleBlock);
    
  }
}