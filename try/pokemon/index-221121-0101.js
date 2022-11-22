// before collisions

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


console.log(collisions);


canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './img/mytown.png'

const playerImage = new Image();
playerImage.src = './img/playerDown.png';


class Sprite {
    constructor({ position, velocity, image}) {
        this.position = position;
        this.image = image
    }

    draw() {
        //context.drawImage(this.image, -1265, -900);
        context.drawImage(this.image, this.position.x , this.position.y);
    }
}


const background = new Sprite({
    position: {
        x: -1265, 
        y: -900
    },
    image: image
});


const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    
    context.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height, 
        (canvas.width / 2) - (playerImage.width / 4) / 2, 
        (canvas.height / 2) - (playerImage.height / 2),
        playerImage.width / 4,
        playerImage.height);
    
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') background.position.y += 3;
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') background.position.x += 3;
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') background.position.y -= 3;
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') background.position.x -= 3;

}


animate()


let lastKey = '';

window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp'
            break
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight'
            break

        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft'
            break
    }

    //console.log(keys)
})


window.addEventListener('keyup', (e) => {

    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break

        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }

    //console.log(keys)
})
