const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScore = document.querySelector("#user");
const compScore = document.querySelector("#computer");

let user = 0;
let comp = 0;

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const draw = () => {
    msg.innerText = "Game Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
}

const showWin = (userWin,userChoice, compChoice) => {
    if (userWin) {
        user++;
        userScore.innerText = user;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        comp++;
        compScore.innerText = comp;
        msg.innerText = `Computer Win! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    //generate computer choice
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        //draw game
        draw();
    }
    else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWin(userWin, userChoice, compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});