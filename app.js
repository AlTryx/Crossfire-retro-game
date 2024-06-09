    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('.result')
    const corridor = document.querySelector('.corridor')
    const laserIndex = document.querySelector('.laser')
    const width = 15
    let player
    let currentPlayerIndex

    //draw the grid
    for(let i = 0; i < 195; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }

    const squares = Array.from(document.querySelectorAll('.grid div'))
    
    

    // draw the corridors

    function drawCorridors(){
        for(let i = 0; i<squares.length;i++) {
            if(
            (i%2 !== 0 && i<194)|| 
            (i>15 && i<29) ||
            (i>45 && i <59) ||
            (i>75 && i <89) ||
            (i>105 && i <119) ||
            (i>135 && i<149) ||
            (i>165 && i<179)
        ) 
            {
                squares[i].id = i //adding id to simplify my selection
                squares[i].classList.add('corridor')
            }
        }
    }

    drawCorridors()


    // drawing the player
        currentPlayerIndex = 166
        squares[currentPlayerIndex].classList.add('player')

    //move the player

    function movePlayer(e) {
        switch(e.key){
            case 'ArrowLeft':
                if(currentPlayerIndex % width !==0) {
                    squares[currentPlayerIndex].classList.remove('player')
                    squares[currentPlayerIndex -= 1]
                    squares[currentPlayerIndex].classList.add('player')
                }
                break

            case 'ArrowRight':
                if(currentPlayerIndex % width < width - 1) {
                    squares[currentPlayerIndex].classList.remove('player')
                    squares[currentPlayerIndex += 1]
                    squares[currentPlayerIndex].classList.add('player')
                }
                break

            case 'ArrowUp':
                if(currentPlayerIndex - width >=0) {
                    squares[currentPlayerIndex].classList.remove('player')
                    squares[currentPlayerIndex -= width]
                    squares[currentPlayerIndex].classList.add('player')
                }
                break

            case 'ArrowDown':
                if (currentPlayerIndex + width < width*width) {
                    squares[currentPlayerIndex].classList.remove('player')
                    squares[currentPlayerIndex += width]
                    squares[currentPlayerIndex].classList.add('player')
                }
                break
        }
    }

    document.addEventListener('keyup', movePlayer)

    //drawing the enemy
    
    function drawEnemy() {

    }

    // drawing the laser

    const drawLaser = function drawLaserFunction() {
        // I've got to add classList of ('.laser) once every 1 - 3 s (I've got to set timeInterval for this function to occur!)
    }

    setInterval(drawLaser, 2000)

    // I got came up with an idea that the player can "hide" in the walls for a short amount of time so they can hide from enemies. If they last longer than the timer for hiding, the game is over.
    // after the player escape the hiding spot, the hiding area gets the class of 'used-hiding-spot' and it turns RED! which means you can't hide there anymore. There's a cooldown before you can hide anywhere again.
    // the enemies will grow stronger as the time passes and the score builds higher.
    //game win - a certain amount of score or until timer ends
    //game loss - if being killed by an enemy.