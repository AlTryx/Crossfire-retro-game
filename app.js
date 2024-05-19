    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('.result')
    const width = 30;
    const corridor = document.querySelector('.corridor')
   

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
                squares[i].classList.add('corridor')
            }
        }
    }
    drawCorridors()

    //