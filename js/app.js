//Starting level and lives
var level = 1;
var lives = 3;

/// Enemy Class ///
var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the position of the enemy

Enemy.prototype.update = function(dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 234);
    };

   //Handling collision with the Enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x &&  player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    //Remove 1 live
        lives--;
        document.getElementById("playerlives").innerHTML= lives;
    };

    //Game over message
    if (lives === 0) {
         gameOver()
    };
};

// Render Enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/// Player Class///
var Player = function(x,y){
    this.sprite =  'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt){
        
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handling keypress
Player.prototype.handleInput = function(keyPress){
    if( keyPress === 'left' && this.x > 0 )  
        this.x = this.x -= 102;
     if( keyPress === 'right' && this.x < 405)
        this.x = this.x += 102;
     if( keyPress === 'up' && this.y > 0)
        this.y = this.y -= 83;
     if( keyPress === 'down' && this.y < 405)
        this.y = this.y += 83;

    //Resrt to start position when end is reached
    if (this.y < 0) {     
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 100);

    //Move Level up when end is reached  
        level++;
        document.getElementById("playerlvl").innerHTML= level;
    };
 };


// All enemies are placed in an array
var allEnemies = [];

var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (Y) {
    enemy = new Enemy(0, Y, 200);
    allEnemies.push(enemy);
});

//Starting location of the player
var player = new Player(202, 405);

//When all the lives are lost >>
function gameOver() {
    modal.style.display = "block";
    document.getElementById("playerlevel").innerHTML= level;
}

//Restart game

function reloadFun() {
    location.reload();
}
///You loose modal///
//Get modal
const modal = document.getElementById('gameover');
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

