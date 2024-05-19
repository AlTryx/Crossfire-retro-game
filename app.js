    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('.result')

    //draw the grid
    for(let i = 0; i < 195; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }

    const squares = Array.from(document.querySelectorAll('.grid div'))