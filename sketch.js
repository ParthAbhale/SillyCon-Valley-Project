var mario, marioImg, mario_jump, backgroundImg, backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, ground1, ground2, ground3, ground4, ground5, groundImg, groundImg1, groundImg2, groundImg3, groundImg4;
var obstacle, obstacle1, obstacleImg, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4;
var cloud, cloudImg;
var coin, coinImg;
var sun, sunImg;
var restart, restartImg;
var gameOver, gameOverImg;

var sGround, sGroundGroup;

var sGroundImg, sGroundImg1, sGroundImg2, sGroundImg3, sGroundImg4;


var obstacleGroup, coinsGroup, cloudGroup;

var score = 0;
var coins = 0;
// var life = 3;

var HighScore;

localStorage["HighestScore"] = 0;

var PLAY = 0;
var jumpSound, dieSound, checkpoint;
var END = 4;


var invisibleGround;


var gameState = PLAY




function preload() {
    backgroundImg = loadImage("images/last.jpg")
    marioImg = loadAnimation("images/mario1.png", "images/mario2.png", "images/mario3.png", "images/mario4.png", "images/mario5.png", "images/mario6.png")
    groundImg = loadImage("images/lastground.jpg")
    obstacleImg = loadImage("images/rObstacle.png")
    cloudImg = loadImage("images/rCloud.png")
    coinImg = loadImage("images/rCoin.png")
    sunImg = loadImage("images/rSun.png")
    restartImg = loadImage("images/icon.png")
    gameOverImg = loadImage("images/download.png")
    backgroundImg1 = loadImage("images/b2.jpg")
    backgroundImg2 = loadImage("images/background2.jfif")
    backgroundImg3 = loadImage("images/images (1).jfif")
    backgroundImg4 = loadImage("images/images (2).jfif")
    groundImg1 = loadImage("images/2.jpg")
    groundImg2 = loadImage("images/groun.jfif")
    groundImg3 = loadImage("images/ground2.jfif")
    groundImg4 = loadImage("images/ground4.jfif")
    jumpSound = loadSound("images/jump.mp3")
    dieSound = loadSound("images/die.mp3")
    checkpoint = loadSound("images/checkPoint.mp3")
    mario_jump = loadAnimation("images/mario3.png")
    obstacleImg1 = loadImage("images/rSnake.png")
    obstacleImg2 = loadImage("images/rGhost.png")
    obstacleImg3 = loadImage("images/rLion.png")
    obstacleImg4 = loadImage("images/rDragon.png")
    sGroundImg = loadImage("images/lastground.jpg")
    sGroundImg1 = loadImage("images/2.jpg")
    sGroundImg2 = loadImage("images/groun.jfif")
    sGroundImg3 = loadImage("images/ground2.jfif")
    sGroundImg4 = loadImage("images/ground4.jfif")
}


function setup() {

    createCanvas(900, 700)
    mario = createSprite(100, 400, 10, 10)
    mario.addAnimation("running", marioImg)
    mario.scale = 0.4;
    mario.debug = false
    mario.setCollider("rectangle", 0, 0, 200, 200)




    ground1 = createSprite(700, 610)
    ground1.scale = 4.65

    invisibleGround = createSprite(width / 2, ground1.y, width, ground1.height)
    invisibleGround.visible = false;


    sun = createSprite(width - 50, 40)
    sun.addImage(sunImg);
    sun.scale = 0.4
    sun.velocityX = -1

    obstacleGroup = createGroup();
    cloudGroup = createGroup();
    coinsGroup = createGroup();
    sGroundGroup = createGroup();


}

function draw() {

    background(backgroundImg)



    if (gameState === PLAY) {




        spawnObstacle();
        spawClouds();
        spawCoins();
        swapGround();

        if (score < 1000) {
            background(backgroundImg)
            ground1.addImage(groundImg)
            mario.collide(invisibleGround)
            invisibleGround.addImage(groundImg)
            ground1.scale = 1
            invisibleGround.scale = 1
        } else if (score < 2000) {
            background(backgroundImg1)
            ground1.addImage(groundImg1)
            ground1.scale = 2
        } else if (score < 3000) {
            background(backgroundImg2)
            ground1.addImage(groundImg2)
        } else if (score < 4000) {
            background(backgroundImg3)
            ground1.addImage(groundImg3)
        } else if (score < 5000) {
            background(backgroundImg4)
            ground1.addImage(groundImg4)
        } else {
            background(backgroundImg)
            ground1.addImage(groundImg)
            ground1.scale = 1
        }

        gameOver = createSprite(width / 2, height / 2);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 4;
        gameOver.visible = false;

        restart = createSprite(width / 2, height / 2 + 150)
        restart.addImage(restartImg)
        restart.scale = 0.2;
        restart.visible = false;

        mario.collide(sGroundGroup)


        if (sun.x < 10) {
            sun.x = 900
        }

        if (keyDown("space") && mario.y > height / 2) {
            mario.velocityY = -30
            mario.changeAnimation("jumping", mario_jump)
            jumpSound.play();
        }

        for (var i = 0; i < coinsGroup.length; i++) {
            if (coinsGroup.get(i).isTouching(mario)) {
                coinsGroup.get(i).destroy();
                coins = coins + 1
            }
        }


        if (coins > 30) {
            for (var i = 0; i < obstacleGroup.length; i++) {
                if (obstacleGroup.get(i).isTouching(mario)) {
                    obstacleGroup.get(i).destroy();
                    coins = coins + 1
                }
            }
        }
        switch (score) {
            case 10: mario.scale = 0.45
                break;

            case 20: mario.scale = 0.50
                break;

            case 30: mario.scale = 0.55
                break;

            case 40: mario.scale = 0.60;
                break;

            default: break;
        }

        mario.velocityY = mario.velocityY + 1.2
        mario.collide(ground1)


        ground1.velocityX = -6 + coins / 10

        if (ground1.x < 300) {
            ground1.x = 450
        }




        score = score + 0.1

        if (obstacleGroup.isTouching(mario)) {
            dieSound.play();
            gameState = END;
            mario.x = 1500
        }


    } else if (gameState === END) {






        mario.velocityY = 0
        ground1.velocityX = 0
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);

        obstacleGroup.setLifetimeEach(-1)
        cloudGroup.setLifetimeEach(-1)
        coinsGroup.setLifetimeEach(-1)



        background(gameOverImg)

        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }

    }





    drawSprites();
    textSize(30)
    fill("yellow")

    text("SURVIVAL: " + Math.round(score), 50, 50);
    text("COINS: " + coins, 50, 100);
    text("MARIO", mario.x - 50, mario.y - 50)

    text("HighestScore: " + Math.round(HighScore), 50, 150)
    if (localStorage["HighestScore"] < score) {
        localStorage["HighestScore"] = score;
    }
    HighScore = localStorage["HighestScore"]
}


function spawnObstacle() {
    if (frameCount % 100 === 0) {
        obstacle = createSprite(900, 500)
        if (score < 1000) {
            obstacle.addImage(obstacleImg)
        } else if (score < 2000) {
            obstacle.addImage(obstacleImg1)
        } else if (score < 3000) {
            obstacle.addImage(obstacleImg2)
        } else if (score < 4000) {
            obstacle.addImage(obstacleImg3)
        } else if (score < 5000) {
            obstacle.addImage(obstacleImg4)
        } else {
            obstacle.addImage(obstacleImg)
        }
        obstacle.scale = 0.5
        obstacle.velocityX = -6 - coins / 10
        obstacle.lifetime = 180
        obstacle.debug = false
        obstacle.collide(ground1)
        obstacleGroup.add(obstacle)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 160, 160)
    }
}


function spawClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(900, random(30, 200))
        cloud.addImage(cloudImg)
        cloud.scale = 0.4
        cloud.velocityX = -5 + coins / 10
        cloud.lifetime = 180
        mario.depth = cloud.depth + 1
        cloudGroup.add(cloud)
    }
}

function spawCoins() {
    if (frameCount % 40 === 0) {
        coin = createSprite(900, random(height / 2, 450))
        coin.addImage(coinImg)
        coin.scale = 0.2
        coin.velocityX = -5 - coins / 10
        coin.lifetime = 180
        coinsGroup.add(coin)
    }
}

function swapGround() {
    if (frameCount % 200 === 0) {
        sGround = createSprite(900, 250)
        if (score < 1000) {
            sGround.addImage(sGroundImg)
            sGround.scale = 0.3;
        } else if (score < 2000) {
            sGround.addImage(sGroundImg1)
            sGround.scale = 0.3
        } else if (score < 3000) {
            sGround.addImage(sGroundImg2)
        } else if (score < 4000) {
            sGround.addImage(sGroundImg3)
        } else if (score < 5000) {
            sGround.addImage(sGroundImg4)
        } else {
            sGround.addImage(sGroundImg)
            sGround.scale = 0.3;
        }
        // sGround.scale = 1
        sGround.velocityX = -5
        sGround.lifeTime = 180
        sGroundGroup.add(sGround)
    }
}

function reset() {
    gameState = PLAY;
    score = 0;
    coins = 0

    mario.collide(invisibleGround)
    mario.x = 100
    ground1.addImage(groundImg)
    background(backgroundImg4)
    coinsGroup.destroyEach();
    cloudGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;

}
