function runReindeerRun() {



    const canvas = document.querySelector("#spriteSheet");
    const ctx = canvas.getContext("2d");

    let x = 0;
    let y = 0;
    let frame = 0;
    let width = 80;
    let height = 160;
    let fpsInterval = 1000 / 5;
    let then = 0;
    let elapsed;
    let requestID;

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const reindeer = new Image();
        reindeer.src = "../images/reindeerSprite.png";
        let multiplyByNumber = 0;
        let swidthNumber = 1000;
        if (frame === 0) {
            swidthNumber = 1400;
            multiplyByNumber = 280
        } else if (frame === 1) {
            multiplyByNumber = 330
        } else if (frame === 2) {
            multiplyByNumber = 270
        } else if (frame === 3) {
            multiplyByNumber = 255
        } else if (frame === 4) {
            multiplyByNumber = 255
            swidthNumber = 1400;
        }
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "#EB0029";
        ctx.fillText("Chase Our", 10, 50);
        ctx.fillStyle = "#0C0C0C";
        ctx.fillText("Latest Deals", 20, 85);

        ctx.drawImage(reindeer, frame * multiplyByNumber, 10, swidthNumber / 4, 270, x, y, width, height);
        ctx.imageSmoothingEnabled = reindeer;
    };

    const update = (timestamp) => {
        elapsed = timestamp - then;
        if (elapsed > fpsInterval) {
            then = timestamp - (elapsed % fpsInterval);
            if (frame < 4) {
                frame++;
            } else {
                frame = 0;
            }
        }

        if (x < canvas.width) {
            x += 0.5;


        } else {
            x = 0;
        }
    };

    const hideShowButton = (button, value) => {
        document.querySelector(`#${button}Deer`).style.display = `${value}`;
    };


    const start = () => {

        if (!requestID) {
            requestID = window.requestAnimationFrame(loop);
            hideShowButton("start", "none");
            hideShowButton("stop", "flex");
        }
    };

    const stop = () => {
        if (requestID) {
            window.cancelAnimationFrame(requestID);
            requestID = undefined;
            hideShowButton("start", "flex");
            hideShowButton("stop", "none");
        }
    };

    document.querySelector("#stopDeer").addEventListener("click", () => {
        x = x;
        stop();
    });

    document.querySelector("#startDeer").addEventListener("click", () => {
        x = x;
        start();
    });


    const loop = (timestamp) => {
        requestID = undefined;
        update(timestamp)
        render();
        // requestAnimationFrame(loop);
        start();
    };

    loop();

}


module.exports = {
    runReindeerRun
}