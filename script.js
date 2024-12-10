const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
let isJumping = false;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 0;

    const upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Falling down
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                player.style.bottom = position + "px";
            }, 20);
        }
        position += 5;
        player.style.bottom = position + "px";
    }, 20);
}

// Collision detection
const checkCollision = setInterval(() => {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top
    ) {
        alert("Game Over!");
        clearInterval(checkCollision);
        location.reload(); // Restart the game
    }
}, 10);
