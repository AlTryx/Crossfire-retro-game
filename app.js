const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const width = 15
const height = 13
let currentPlayerIndex
let previousPlayerIndex
let hidingTimeout
let hidingCounter

//draw the grid
for (let i = 0; i < 195; i++) {
    const square = document.createElement('div')
    square.classList.add('box')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

//framing the secret spawner for enemies 

    for(let i = 0; i < 15; i++) {
        squares[i].classList.remove('box')
        squares[i].classList.add('secret-spawner')
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

//drawing the enemy
function drawEnemy() {
    // enemy drawing logic here
}

// drawing the laser
const drawLaser = function drawLaserFunction() {
    // laser drawing logic here
}

setInterval(drawLaser, 2000)


//game over check
function gameOver() {
    resultDisplay.textContent = 'Game Over'
    document.removeEventListener('keyup', movePlayer) // Disable player movement on game over
}

//win check
function gameWin() {

}
    // I came up with an idea that the player can "hide" in the walls for a short amount of time so they can hide from enemies. If they last longer than the timer for hiding, the game is over.
    // after the player escape the hiding spot, the hiding area gets the class of 'used-hiding-spot' and it turns RED! which means you can't hide there anymore. There's a cooldown before you can hide anywhere again.
    // the enemies will grow stronger as the time passes and the score builds higher.
    //game win - a certain amount of score or until timer ends
    //game loss - if being killed by an enemy.