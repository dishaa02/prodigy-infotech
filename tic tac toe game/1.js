let player1Name = ""; // Initialize player 1 name
let player2Name = ""; // Initialize player 2 name
let currentPlayer = "X"; // Set the starting player to "X"
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

// Function to start the game
const startGame = () => {
    // Set player names based on user input
    player1Name = document.getElementById("player1").value || "Player 1";
    player2Name = document.getElementById("player2").value || "Player 2";

    document.getElementById("player-names").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
    gameActive = true;
};

let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Patterns
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a win
const checkForWin = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
};

// Function to check for a draw
const checkForDraw = () => {
    return gameBoard.every(cell => cell !== "");
};

// Function to handle player move
const handleMove = (index) => {
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        btnRef[index].innerText = currentPlayer;

        if (checkForWin()) {
            const winnerName = currentPlayer === "X" ? player1Name : player2Name;
            msgRef.innerText = `${winnerName} Wins!`;
            popupRef.classList.remove("hide");
            gameActive = false;
        } else if (checkForDraw()) {
            msgRef.innerText = "It's a Draw!";
            popupRef.classList.remove("hide");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
};

// Event listeners for buttons
btnRef.forEach((element, index) => {
    element.addEventListener("click", () => handleMove(index));
});

// Event listener for the "Start Game" button
document.getElementById("start-game").addEventListener("click", startGame);

// Event listener for the "New Game" button
newgameBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    btnRef.forEach(element => element.innerText = "");
    popupRef.classList.add("hide");
    gameActive = true;
});

// Event listener for the "Restart" button
restartBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    btnRef.forEach(element => element.innerText = "");
    popupRef.classList.add("hide");
    gameActive = true;
});





