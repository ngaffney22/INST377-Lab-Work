/* eslint-disable no-plusplus */
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const ScoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const width = 10;
let nextRandom = 0
const colors = [
  'orange',
  'red',
  'purple',
  'green',
  'blue'
];

// The Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
];
const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let currentRotation = 0;

// randomly select a Tetromino
let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

// draw the tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add('tetromino');
  });
}
console.log(theTetrominoes);
// undraw the tetromino
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino');
  });
}

// move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// make tetromino move down every second
timerId = setInterval(moveDown, 800);

// assign functions to keycodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keydown', control);

// freeze function 
function freeze() {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    // start a new tetromino
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw()
    displayShape()
  }
}

// move the tetromino left, unless it hits the edge of the grid
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

  if(!isAtLeftEdge) currentPosition -= 1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}

// Move Tetromino right 
function moveRight() {
  undraw();
  const isRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

  if (!isRightEdge) currentPosition += 2;

  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) { 
    currentPosition -= 1;
  }
  draw();
}

// rotate the tetromino 
function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) { // if the current roation gets to 4, make it go back 
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}
// show up-next tetromino in mini-grid display 
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


// the Tetrominos without rotations 
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
  [0, 1, displayWidth, displayWidth+1], // oTetromino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
]

// display the shape of tetromino in mini-grid
function displayShape() {
  // remove any trace of tetromino from the grid
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}