

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
}


const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70));
}


const boundaries = [];
const offset = {
    x: -1265, 
    y: -900
};


collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }})
            ); 
        
    })
})


const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(
                new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }})
            ); 
        
    })
})


const image = new Image();
image.src = './img/mytown.png'

const fgImage = new Image();
fgImage.src = './img/mytown-foreground.png'

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2 ,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
});


const background = new Sprite({
    position: {
        x: offset.x, 
        y: offset.y
    },
    image: image
});


const foreground = new Sprite({
    position: {
        x: offset.x, 
        y: offset.y
    },
    image: fgImage
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


const movables = [background, ...boundaries, foreground, ...battleZones];

function rectCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()       //map
    
    boundaries.forEach(boundary => {
        boundary.draw();

    });
    
    battleZones.forEach(battleZone => {
        battleZone.draw();
    })

    player.draw();      //player
    
    foreground.draw();      //foreground

    let moving = true;
    player.moving = false;      //player moving animation stop 


    //battlezone
    if (keys.ArrowUp.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed || keys.ArrowLeft.pressed) {
        
        for (let i=0; i < battleZones.length; i++){
            const battleZone = battleZones[i];
            
            //battlezone trigger area
            const overlappingArea = 
                (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - 
                Math.max(player.position.x, battleZone.position.x)) * 
                (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - 
                Math.max(player.position.y, battleZone.position.y));
            

            if (
                rectCollision({ 
                    rectangle1: player, 
                    rectangle2: battleZone
                }) &&

                overlappingArea > (player.width * player.height) / 2 &&

                Math.random() < 0.01        //low possibility of battle occuring
                ) {
                    console.log('battleZone collision');
                    break
            } 
           
        }
    }


    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
            player.moving = true;
            player.image = player.sprites.up;

            //collision
            for (let i=0; i < boundaries.length; i++){
                const boundary = boundaries[i];
                if (
                    rectCollision({ 
                        rectangle1: player, 
                        rectangle2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 3
                            }}
                    })) {
                        moving = false;
                        break
                } 
            }

            
            if (moving) {
                movables.forEach((movable => {
                    movable.position.y += 3;
                }));
            }
            
        }
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
            player.moving = true;
            player.image = player.sprites.left;

            for (let i=0; i < boundaries.length; i++){
                const boundary = boundaries[i];
                if (
                    rectCollision({ 
                        rectangle1: player, 
                        rectangle2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x + 3,
                                y: boundary.position.y
                            }}
                    })) {
                        moving = false;
                        break
                } 
            }

            if (moving) {
                movables.forEach((movable => {
                    movable.position.x += 3;
                }));
            }
            
        }
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
            player.moving = true;
            player.image = player.sprites.down;

            for (let i=0; i < boundaries.length; i++){
                const boundary = boundaries[i];
                if (
                    rectCollision({ 
                        rectangle1: player, 
                        rectangle2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 3
                            }}
                    })) {
                        moving = false;
                        break
                } 
            }

            if (moving) {
                movables.forEach((movable => {
                    movable.position.y -= 3;
                }));
            }
        
    }
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
            player.moving = true;
            player.image = player.sprites.right;
            
            for (let i=0; i < boundaries.length; i++){
                const boundary = boundaries[i];
                if (
                    rectCollision({ 
                        rectangle1: player, 
                        rectangle2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x -3,
                                y: boundary.position.y
                            }}
                    })) {
                        moving = false;
                        break
                } 
            }

            if (moving) {
                movables.forEach((movable => {
                    movable.position.x -= 3;
                }));
            }
        
    };
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
