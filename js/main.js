import Grid from "./Grid.js";
import Tile from "./Tile.js";

let gameBoard = document.getElementById("game-board");
setUpInput();
function setUpInput() {
    window.addEventListener("keydown",handleKeys, {once: true});
}
let grid = new Grid(gameBoard);
grid.getRandomEmptyCell().tile = new Tile(gameBoard);
function handleKeys(e) {
    let successfulMove;
    switch(e.key) {
        case "ArrowRight":
            successfulMove = grid.handleRight();
            if(successfulMove) { grid.getRandomEmptyCell().tile = new Tile(gameBoard) };
            break;
        case "ArrowLeft":
            successfulMove = grid.handleLeft();
            if(successfulMove) { grid.getRandomEmptyCell().tile = new Tile(gameBoard) };
            break;
        case "ArrowUp":
            successfulMove = grid.handleUp();
            if(successfulMove) { grid.getRandomEmptyCell().tile = new Tile(gameBoard) };
            break;
        case "ArrowDown":
            successfulMove = grid.handleDown();
            if(successfulMove) { grid.getRandomEmptyCell().tile = new Tile(gameBoard) };
            break;
        default:
    }
setUpInput();
}


