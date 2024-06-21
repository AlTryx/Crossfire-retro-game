const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const scoreDisplay = document.querySelector('.scoreContent')
const width = 15
const height = 13
let currentPlayerIndex
let previousPlayerIndex
let hidingTimeout
let hidingCounter
let isDead = false
let enemyMoves = false
let playerStunned = false
let score = 0

//draw the grid
for (let i = 0; i < 195; i++) {
    const square = document.createElement('div')
    square.classList.add('box')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

// the secret spawner for enemies 

    for(let i = 0; i < 29; i++) {
        squares[i].classList.remove('box')
        squares[i].classList.add('secret-spawner')
        squares[i].id = i
    }


// draw the corridors
function drawCorridors() {
    for (let i = 0; i < squares.length; i++) {
        if (
            (i % 2 !== 0 && i < 194) ||
            (i > 15 && i < 29) ||
            (i > 45 && i < 59) ||
            (i > 75 && i < 89) ||
            (i > 105 && i < 119) ||
            (i > 135 && i < 149) ||
            (i > 165 && i < 179)
        ) {
            squares[i].id = i //adding id to simplify my selection
            squares[i].classList.add('corridor')
            squares[i].classList.remove('box')
        }
    }
}

drawCorridors()

// drawing the player
currentPlayerIndex = 166
squares[currentPlayerIndex].classList.add('player')

// drawing the score
scoreDisplay.textContent = score;

// move the player
function movePlayer(e) {
    previousPlayerIndex = currentPlayerIndex
    squares[currentPlayerIndex].classList.remove('player')
   
        switch (e.key) {
            case 'ArrowLeft':
                if (currentPlayerIndex % width !== 0 && !squares[currentPlayerIndex - 1].classList.contains('used-hiding-spot')) 
                    currentPlayerIndex -= 1
                break
            case 'ArrowRight':
                if (currentPlayerIndex % width < width - 1 && !squares[currentPlayerIndex + 1].classList.contains('used-hiding-spot')) 
                    currentPlayerIndex += 1
                break
            case 'ArrowUp':
                if (currentPlayerIndex - width >= 0 && !squares[currentPlayerIndex - width].classList.contains('used-hiding-spot')) 
                    currentPlayerIndex -= width
                break
            case 'ArrowDown':
                if (currentPlayerIndex + width < width * height && !squares[currentPlayerIndex + width].classList.contains('used-hiding-spot')) 
                    currentPlayerIndex += width
                break
        }
    

    if (squares[previousPlayerIndex].classList.contains('box')) {
        squares[previousPlayerIndex].classList.remove('box')
        squares[previousPlayerIndex].classList.add('used-hiding-spot')
    }
    
    squares[currentPlayerIndex].classList.add('player')
    hidingTimer()

    if(squares[currentPlayerIndex].classList.contains('secret-spawner')) {
        gameOver()
    }
}

document.addEventListener('keyup', movePlayer)


//handler of timing when the player is INSIDE a box containing 'used-hiding-spot'

function hidingTimer() {
    if(hidingTimeout) {
        clearTimeout(hidingTimeout)
        hidingTimeout = null
    }

    if(hidingCounter) {
        clearInterval(hidingCounter) 
        hidingCounter = null
    }

    //check if the player is in a box
    if(squares[currentPlayerIndex].classList.contains('box', 'player')) {
        let counter = 5
        resultDisplay.textContent = `You have ${counter} seconds to hide`
        hidingCounter = setInterval(() => {
            counter--
            resultDisplay.textContent = `You have ${counter} seconds to hide`
            if(counter === 0) {
                clearInterval(hidingCounter)
            }
        }
        , 1000) // 1 second
        hidingTimeout = setTimeout(() => {
            gameOver()
        }, 5000) // 5 seconds
    }
    else {
        resultDisplay.textContent = ' '
    }
  
}

// constructor for enemies
class Enemy {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.targetIndex = currentPlayerIndex; //the enemy aims to kill the player
    }
}


const enemies = [
    new Enemy ('alien', 13, 200),
    new Enemy('ghost', 9, 150),
    new Enemy('virus', 5, 400),
    new Enemy('blob', 1, 200)
]

// drawing the enemy
enemies.forEach(enemy =>
    squares[enemy.currentIndex].classList.add('enemy', enemy.className)
)


function moveEnemy(enemy) {
    let directions = [1, -1, width, -width];

    function getRandomDirection() {
        return directions[Math.floor(Math.random() * directions.length)]; // the formula for random Direction
    }

    let direction = getRandomDirection();

    function move() {
        enemy.timerId = setInterval(function() {
            // pick a new direction that's different from the previous one
            let newDirection;
            do {
                newDirection = getRandomDirection();
            } while (newDirection === -direction); // Проверка за обратно направление

            direction = newDirection;

            const nextPosition = enemy.currentIndex + direction;

            // check if the next position is NOT an enemy or a box
            if (
                nextPosition >= 0 && 
                nextPosition < width * height && 
                (squares[nextPosition].classList.contains('corridor') || 
                squares[nextPosition].classList.contains('secret-spawner')) &&
                !squares[nextPosition].classList.contains('enemy')
            ) {
                // move the enemy to the new direction
                squares[enemy.currentIndex].classList.remove('enemy', enemy.className);
                enemy.currentIndex = nextPosition;
                squares[enemy.currentIndex].classList.add('enemy', enemy.className);
            }

            // check for game over
            if (squares[enemy.currentIndex].classList.contains('player')) {
                gameOver();
            }
        }, enemy.speed);
    }

    move();
}



// Initialize enemies and start their movement
enemies.forEach(enemy => moveEnemy(enemy));


//game over check
function gameOver() {
        resultDisplay.textContent = `Game Over! - Your score is: ${score}`
        setTimeout(function() {alert('Game Over! ' + score)}, 500)
        enemies.forEach(enemy => clearInterval(enemy.timerId))
        isDead = true
        document.removeEventListener('keyup', movePlayer) // Disable player movement on game over
        squares[currentPlayerIndex].classList.remove('player')
        squares[currentPlayerIndex].classList.add('dead-player') // changing the normal ship image to an exploded version of the ship
}

//win check
function gameWin() {
if(
    (scoreDisplay === 500) 

) {

}

}
    //game win - a certain amount of score
    //score increases as I catch power-pellets inside the boxes
    //I've got to fix an issue when they're moving at the secret-spawn location