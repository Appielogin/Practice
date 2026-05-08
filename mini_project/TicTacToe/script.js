let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let win = document.querySelector("#win");
let draw = document.querySelector("#draw");
let newBtn = document.querySelectorAll(".newBtn");
let winMsg = document.querySelector("#winMsg");
let drawMsg = document.querySelector("#drawMsg");
let msg = document.querySelectorAll(".msg-container");
let turnO = true;
let count = 0;

const winPath = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5], 
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked.");
        if(turnO) {
            box.innerText = "O";
            box.classList.add("boxO");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("boxX");
            turnO = true;
        }
        box.disabled = true;
        count++;
        if (checkWin()) {
            addShow(0);

        } else if (count >= 9) {
            drawMsg.innerText = "Game Over!!";
            addShow(1);
        }
    }); 
});

const checkWin = () => {
    for (path of winPath) {
        let post1 = boxes[path[0]].innerText;
        let post2 = boxes[path[1]].innerText;
        let post3 = boxes[path[2]].innerText;

        if (post1 != "" && post2 != "" && post3 != "" ) {
            if(post1 === post2 && post2 === post3) {
                winMsg.innerText = `Congratulation Winner: ${post1}`;

                boxes.forEach((box) => {
                    box.disabled = true;
                });
                return true;
            }

        } 
    }
    return false;
}

addShow = (i) => {
    msg.forEach(el => {
        el.classList.remove("show");
    });

    msg[i].classList.add("show");
}

const reset = () => {
    boxes.forEach((box) => {
        turnO = true;
        box.innerText = "";
        box.disabled = false;
        count = 0;
    });

    msg.forEach(el => {
        el.classList.remove("show");
    });
}

resetBtn.addEventListener("click", reset);

for (var i = 0; i < newBtn.length; i++){
    newBtn[i].addEventListener("click", reset);
}
