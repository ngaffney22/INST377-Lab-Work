const grid = document.querySelector('.grid')
const doodler = document.createElement('div')
let isGameOver = false
let doodlerLeftSpace = 50
let startPoint = 150
let doodlerBottomSpace = startPoint
let platformCount = 5
platforms = []
let upTimerId
let downTimerId
let isJumping = false
let isGoingLeft = false
let isGoingRight = false
let leftTimerId
let rightTimerId 


function createDoodler(){
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
}

class Platform{
    constructor(newPlatBottom){
        this.bottom = newPlatBottom
        this.left = Math.random() * 315
        this.visual = document.createElement('div')

        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
    }
}

function createPlatforms(){
    for (let i =0; i < platformCount; i++){
        let platGap = 600 / platformCount
        let newPlatBottom = 100 + i * platGap
        let newPlatform = new Platform(newPlatBottom)
        platforms.push(newPlatform)

    }
}

function movePlatforms(){
    if (doodlerBottomSpace > 200){
        platforms.forEach(platform => {
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'
        })
    }
}

function jump(){
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(function (){
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace > startPoint + 200){
            fall()
        }
    }, 30)

}

function fall(){
    clearInterval(upTimerId)
    isJumping = false
    downTimerId = setInterval(function (){
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace <= 0){
            gameOver()
        }
        platforms.forEach(platform => {
            if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= platform.bottom + 15) &&
                ((doodlerLeftSpace + 60) >= platform.left) &&
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping
            ){
                console.log('landed')
                startPoint = doodlerBottomSpace
                jump()
            }
        })
    }, 30)
}

function moveLeft(){
    isGoingLeft = true
    leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0){
            doodlerLeftSpace -= 5 
            doodler.style.left = doodlerLeftSpace + 'px'
        }else moveRight()
        
    }, 30)
}

function moveRight(){
    isGoingRight = true
    rightTimerId = setInterval(function () {
        if (doodlerLeftSpace <= 340){
            doodlerLeftSpace += 5
            doodler.style.left = doodlerLeftSpace + 'px'
        }
    },30)
}

function control(e){
    if (e.key === "ArrowLeft"){
        moveLeft()
    } else if (e.key === "ArrowRight"){
        moveRight()
    } else if (e.key === "ArrowUp"){
        //moveStraight
    }
}

function gameOver(){
    isGameOver = true
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

function start(){
    if (!isGameOver)
    createPlatforms()
    createDoodler()
    setInterval(movePlatforms, 30)
    jump()
    document.addEventListener('keyup', control)
}
//attach to button later
start()