var health=70;
var bgimg,bg;
var ufo,ufo_sprite;
var comet1,comet2,cometsGroup;
var holeImg,holesGroup;
var ship,shipImg,shipsGroup;
var sat,satImg,satGroup;
var earth,earthImg,earthGroup;
var sun,sunImg,sunGroup;
var fuel,fuelImg,fuelGroup;
var gameState="START";
var bar;
var bgmusic;

function preload(){
    bgimg = loadImage("bgimg.jpg");
    ufo = loadImage("spaceship.png");
    comet1 = loadImage("comet1.png");
    comet2 = loadImage("comet2.png");
    holeImg = loadImage("hole.png");
    holeImg2 = loadImage("hole2.png");
    holeImg3 = loadImage("hole3.png");
    shipImg = loadImage("ufoimg.png");
    satImg = loadImage("saturn.png");
    earthImg = loadImage("earth.png");
    sunImg = loadImage("sun.png");
    fuelImg = loadImage("fuel.png");
    bgmusic = loadSound("music.mp3");
}

function setup(){

    createCanvas(960,540);

    bg = createSprite(480,20,960,540);
    bg.addImage(bgimg);
    bg.velocityY = 5;

    ufo_sprite = createSprite(100,450);
    ufo_sprite.addImage(ufo);
    ufo_sprite.scale = 0.4;

    bar = createSprite(489,10000,960,1);

    cometsGroup = createGroup();
    holesGroup = createGroup();
    shipsGroup = createGroup();
    satGroup = createGroup();
    earthGroup = createGroup();
    sunGroup = createGroup();
    fuelGroup = createGroup();
}

function draw(){


    

    if(gameState === "START"){
        fill("black");
        textSize(25);
        text("Reach to the Sun!",160,205);
        text("Press Space to Serve",180,230);
        
    }

    if(keyDown(32)){
        gameState = "PLAY";
    }

    if(gameState === "PLAY"){


bgmusic.play();
    spawnComets();

    if(bg.y>540){
        bg.y = 0;
    }

    spawnFuel();
        
    drawSprites();

    if(cometsGroup.isTouching(bar)){
        cometsGroup.setVelocityYEach(0);
        cometsGroup.setVisibleEach(false);
        createSat();
    }
    else{
        if(cometsGroup.isTouching(ufo_sprite)){
            health = health - 1;
        }
    }

    fill("white");
    textSize(25);
    text("Level 1",20,525);

    if(satGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(25);
        text("Level 2",20,505);
        satGroup.setVelocityYEach(0);
        satGroup.setScaleEach(5);
        satGroup.setVisibleEach(false);
        spawnHoles();
    }
    if(holesGroup.isTouching(bar)){
        holesGroup.setVelocityYEach(0);
        holesGroup.setVisibleEach(false);
        createEarth();
    }
    else{
        if(holesGroup.isTouching(ufo_sprite)){
            health = health - 1;
        }
    }
    if(earthGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(25);
        text("Level 3",20,485);
        earthGroup.setVelocityYEach(0);
        earthGroup.setScaleEach(5);
        earthGroup.setVisibleEach(false);
        spawnShips();
    }
    if(shipsGroup.isTouching(bar)){
        shipsGroup.setVelocityYEach(0);
        shipsGroup.setVisibleEach(false);
        createSun();
    }
    else{
        if(shipsGroup.isTouching(ufo_sprite)){
            health = health - 1;
        }
    }

    if(fuelGroup.isTouching(ufo_sprite)){
        health = health + 1;
    }
    if(sunGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(100);
        text("You won!",270,320);
        sunGroup.setVelocityYEach(0);
        fuelGroup.setVelocityYEach(0);
        bg.velocityY = 0;
    }
    else{
        if(keyDown(UP_ARROW)){
            ufo_sprite.y = ufo_sprite.y - 7;
        }
        if(keyDown(DOWN_ARROW)){
            ufo_sprite.y = ufo_sprite.y + 7;
        }
        if(keyDown(LEFT_ARROW)){
            ufo_sprite.x = ufo_sprite.x - 7;
        }
        if(keyDown(RIGHT_ARROW)){
            ufo_sprite.x = ufo_sprite.x + 7;
        }
    }

    if(health===0){
        fill("white");
        textSize(100);
        text("You lose!",270,320);
        sunGroup.setVelocityYEach(0);
        marsGroup.setVelocityYEach(0);
        earthGroup.setVelocityYEach(0);
        cometsGroup.setVelocityYEach(0);
        holesGroup.setVelocityYEach(0);
        shipsGroup.setVelocityYEach(0);
        satGroup.setVelocityYEach(0);
        fuelGroup.setVelocityYEach(0);

        bg.velocityY = 0;
    }

    fill("white");
    textSize(20);
    text("Health: "+health,100,100);
}
}

function spawnComets(){
    if(frameCount%20===0){
        var com1 = createSprite(random(60,900),-50);
        com1.velocityY = 10;
        
         //generate random obstacles
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: com1.addImage(comet1);
                   break;
           case 2: com1.addImage(comet2);
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         com1.scale = 0.09;
    
          //add each obstacle to the group
         cometsGroup.add(com1);

         if(com1.y === 300){
             cometsGroup.destroyEach();
         }
}
}

function spawnHoles(){
    if(frameCount%20===0){
        var hole = createSprite(random(60,900),-50);
        hole.velocityY = 20;
        
        var ran = Math.round(random(1,3));
         switch(ran) {
           case 1: hole.addImage(holeImg);
           hole.scale = 0.1;
                   break;
           case 2: hole.addImage(holeImg2);
           hole.scale = 0.25;
                   break;
           case 3: hole.addImage(holeImg3);
           hole.scale = 0.25;
                   break;
           default: break;
         }
          //add each obstacle to the group
         holesGroup.add(hole);
}
}

function spawnShips(){
    if(frameCount%20===0){
    ship = createSprite(random(60,900),-50);
    ship.velocityY = Math.round(random(5,15));
    ship.scale = 0.06;
    ship.addImage(shipImg);
    shipsGroup.add(ship);
    }
}

function createSat(){
    if(frameCount%500===0){
    sat = createSprite(480,-400);
    sat.velocityY = 2;
    sat.scale = 1;
    sat.addImage(satImg);
    satGroup.add(sat);
    }
}

function createEarth(){
    if(frameCount%500===0){
    earth = createSprite(480,-400);
    earth.velocityY = 2;
    earth.scale = 0.4;
    earth.addImage(earthImg);
    earthGroup.add(earth);
    }
}

function createSun(){
    if(frameCount%500===0){
    sun = createSprite(480,-400);
    sun.velocityY = 2;
    sun.scale = 0.6;
    sun.addImage(sunImg);
    sunGroup.add(sun);
    }
}

function spawnFuel(){
    if(frameCount%300===0){
    fuel = createSprite(random(60,900),-50);
    fuel.velocityY = 10;
    fuel.scale = 0.07;
    fuel.addImage(fuelImg);
    fuelGroup.add(fuel);
    }
}