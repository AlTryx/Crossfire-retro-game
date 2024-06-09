    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('.result')
    const corridor = document.querySelector('.corridor')
    const laserIndex = document.querySelector('.laser')
    const width = 30
    let player

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

    function drawPlayer() {
        
    }

    //move the player

    function movePlayer() {

    }

    //drawing the enemy
    
    function drawEnemy() {

    }

    // drawing the laser

    const drawLaser = function drawLaserFunction() {
        // I've got to add classList of ('.laser) once every 1 - 3 s (I've got to set timeInterval for this function to occur!)
    }

    setInterval(drawLaser, 2000)