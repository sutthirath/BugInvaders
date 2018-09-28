console.log("Javascript is ready!");

let fightArena = document.querySelector("#arena");
let monitor = document.querySelector("#health-bar");
let bomb = document.querySelector("#bomb");
let resetBtn = document.querySelector("h1");
let animate;
let bugWave = [];
let health = [];
let num = 0;
let waveNum = 1;
let bugImg;
let blood;
let round = 10;
let bugs = round;

// Initialize
function init() {
    // Create health/blood
    for (let i = 0; i < 5; i++) {
        blood = document.createElement("img");
        blood.src = "images/blood.png";
        monitor.appendChild(blood);
        health.push(blood);
    }
    // Game starts in 2 seconds
    setTimeout(game, 2000);
}

// Update Wave Text
function waveTxt() {
    waveNum += 1;
    document.getElementById("stage").textContent = "Wave " + waveNum;
}

// Game data
function game() {

    // Bug hive
    function bugArmy() {
        // Creation
        for (let i = 0; i < bugs; i++) {
            bugImg = document.createElement("img");
            bugImg.src = "images/mosquito.png";
            bugImg.setAttribute("data-id", i);
            fightArena.appendChild(bugImg);
            // Initial Position
            bugImg.style.position = "absolute";
            bugImg.style.left = Math.random() * -800  +"px";
            bugImg.style.top = Math.random() * 300 + "px";
            bugWave.push(bugImg);
            bugImg.addEventListener("click", splat);
        }
    }

    // Bugs movement
    function move() {
        bugWave.forEach(function(bug) {
            bug.style.left = parseInt(bug.style.left) + 1 + "px";
        })
        setTimeout(move, 20);
    }

    // Bugs killed
    function splat(evt) {
        evt.target.remove();
        let bugIndex = bugWave.indexOf(evt.target);
        bugWave.splice(bugIndex, 1);
        addPoints();
    }

    // Scoreboard
    function addPoints() {
        let scoreTxt = document.querySelector("#score");
        num += 15;
        scoreTxt.textContent = Number(num);
        // Earn bug bomb
        if (scoreTxt.textContent === "120" || scoreTxt.textContent === "240" || scoreTxt.textContent === "360" || scoreTxt.textContent === "480" || scoreTxt.textContent === "600") {
            bomb.style.visibility = "visible";
        }
    }

    // The Bug Bomb
    function boom() {
        let deadBugs = bugWave.splice(0, 10);
        for (let i = 0; i < deadBugs.length; i++) {
            fightArena.removeChild(deadBugs[i]);
        }
        bomb.style.visibility = "hidden";
    }
    bomb.addEventListener("click", boom);

    // Lose a blood
    function check() {
        bugWave.forEach(function(bug, i, arr) {
            let bugPos = bug.style.left;
            if (bugPos === "650px" || bugPos === "651px" || bugPos === "652px") {
                monitor.removeChild(monitor.firstChild);
                health.pop();
                bug.remove();
                arr.splice(i, 1);
            }
        })

        // Round win or game over 
        if (health.length === 0) {
            console.log("You Lose!");
            boom();
            bugWave.length = 0;
            clearInterval(animate);
            resetBtn.style.visibility = "visible";
        } else if (bugWave.length === 0) {
            bugs = round;
            game();
            waveTxt();
        } 
    }

    // Checking for damage
    animate = setInterval(check, 1);

    // Bug attack
    bugArmy();
    move();
}

// Run.
init();

// Reset game
function reset() {
    location.reload();
}
resetBtn.addEventListener("click", reset);