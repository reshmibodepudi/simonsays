let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector('h2');

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter" && !started) {
        started = true;
        levelUp();
    }
    document.querySelector('body').style.backgroundColor = 'floralwhite';
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random
    let randIdx = Math.floor(Math.random() * 4);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!! Your score was ${level} , Press Enter to start again.`;
        document.querySelector('body').style.backgroundColor = 'red';
        reset();
    }
}

function btnPress() {
    btnFlash(this);
    let userCol = this.classList[1];
    userSeq.push(userCol);
    this.classList.add('clicked');
    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}
//  to remove 'clicked' class after the transition 
allBtns.forEach(btn => {
    btn.addEventListener('transitionend', function () {
        this.classList.remove('clicked');
    });
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

