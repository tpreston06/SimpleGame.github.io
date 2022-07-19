const boxes = document.querySelectorAll(".box");
const winLoseText = document.querySelector("#winLoseText");
const  restartButton = document.querySelector("#restartButton");
const win = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];
let options = ["", "", "", "", "", "","", "", ""];
let player = "X";
let running = false;

beginGame();

function beginGame(){
    boxes.forEach(box => box.addEventListener("click",clickedPosition))
    restartButton.addEventListener("click", restartGame);
    running = true;
}
function clickedPosition(){
    const boxIndex = this.getAttribute("boxIndex");
    if(options[boxIndex] != "" || !running){
        return;
    }
    updateBox(this, boxIndex);
    switchPlayer();
    verifyWinner();
}
function updateBox(box, index){
    options[index] = player;
    box.textContent = player;

}
function switchPlayer(){
    player = (player == "X") ? "O" : "X";
}
function verifyWinner(){
    let wonGame = false;
    for(let i = 0; 1 < win.length; i++){
        const condition = win[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if(boxA === "" || boxB === "" || boxC === ""){
            continue;
        }
        if(boxA === boxB && boxB === boxC){
            wonGame = true;
            break;
        }
    }
    if(wonGame){
        winLoseText.textContent = player + " wins!"
        running = false;
    }
    else if(!options.includes("")){
        winLoseText.textContent = "It's a draw!"
        running = false;
    }
    else{
        switchPlayer();
    }

}
function restartGame(){
    player = "X";
    options = ["", "", "", "", "", "","", "", ""];
    boxes.forEach(box => box.textContent = "");
    running = true;

}