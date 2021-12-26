const settingsBtn = document.getElementById("settings-btn");

const settings = document.getElementById("settings");
const settingsForm = document.getElementById("setting-form");
const difficultySel = document.getElementById("difficulty");

const word = document.getElementById("word");
const input = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

const endGame = document.getElementById("end-game-container");

// List of words for game
const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
];

// init word
let randomWord;

//init score
let score = 0;

//init difficulty
let difficulty =
    localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";

difficultySel.value = difficulty;

//init time
let time = 10;

input.focus();

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

let timeInterval = setInterval(updateTime, 1000);

function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver() {
    endGame.innerHTML = `
        <h1>Time Run Out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
    endGame.style.display = "flex";
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}
addWordToDOM();

//Event Listener

input.addEventListener("input", (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = "";

        if (difficulty === "hard") {
            time += 2;
        } else if (difficulty === "medium") {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    console.log(difficulty);
    localStorage.setItem("difficulty", difficulty);
});
