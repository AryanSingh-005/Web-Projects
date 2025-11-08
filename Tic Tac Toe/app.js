let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg"); // Fixed selector from ".msg" to "#msg"

let turnO = true; // O starts

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    message.innerText = ""; // Clear winner text
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent accidental double click

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val1 === val3) {
            showWinner(val1);
            return;
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);