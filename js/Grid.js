//For direction functions, start with the left for moving right, right most for moving right, up most for moving uo,
export default class Grid {
  #cells
  constructor(gameBoardElement) {
    this.#cells = createBoard(gameBoardElement);
  }
  getEmptyCells() {
    return this.#cells.filter((cell) => cell.tile == null)
  }

  getRandomEmptyCell() {
    let emptyCells = this.getEmptyCells();
    if(emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      return emptyCells[randomIndex];
    }
  }
  handleRight() {
    let successfulMove = this.slideTiles(this.getCellsByRows().map((row) => {
      return [...row].reverse();
    }));
    return successfulMove;
  }
  handleLeft() {
    let successfulMove = this.slideTiles(this.getCellsByRows());
    return successfulMove;
  }
  handleUp() {
    let successfulMove = this.slideTiles(this.getCellsByColumns());
    return successfulMove;
  }

  handleDown() {
    let successfulMove = this.slideTiles(this.getCellsByColumns().map((column) => {
      return [...column].reverse();
    }))
    return successfulMove;
  }
  getCellsByColumns() {
    let columnsArr = [];
    this.#cells.forEach((cell) => {
      columnsArr[cell.x] = columnsArr[cell.x] || [];
      columnsArr[cell.x][cell.y] = cell;
    })
    return columnsArr;
  }

  getCellsByRows() {
    let rowsArr = [];
    this.#cells.forEach((cell) => {
      rowsArr[cell.y] = rowsArr[cell.y] || [];
      rowsArr[cell.y][cell.x] = cell;
    })
    return rowsArr;
  }

  slideTiles(cells) {
   let foundAMove = false;
   cells.flatMap((row) => {
      for(let i = 1; i < row.length; i++) {
        let originCell = row[i];
        let lastValidCell;
        if(originCell.tile == null) continue;
        for(let j = i - 1; j >= 0; j--) {
          let destinationCell = row[j];
          if(!destinationCell.canAccept(originCell.tile)) break;
            lastValidCell = destinationCell;
        }
        if(lastValidCell != undefined) {
          foundAMove = true;
          if(lastValidCell.tile == null) {
            lastValidCell.tile = originCell.tile;
          } else {
            lastValidCell.mergeTile = originCell.tile;
          }
          originCell.tile = null;
          this.#cells.forEach((cell) => {
            cell.mergeTiles();
          })
        }
      }
    })
    return foundAMove;
  }
  get cells() {
    return this.#cells;
  }
}

class Cell {
  #cellElement
  #x
  #y
  #tile
  #mergeTile
  constructor(cellElement,x,y, tile = null) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
    this.#tile = null;
  }

  set tile(tile) {
    this.#tile = tile;
    if(tile == null) {
      return;
    }
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get tile() {
    return this.#tile;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  canAccept(tile) {
    return this.#tile == null || this.#tile.value === tile.value
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(tile) {
    this.#mergeTile = tile;
  }

  mergeTiles() {
    if(this.#tile == null || this.#mergeTile == null) return;
    this.#tile.value = this.#mergeTile.value + this.#tile.value;
    this.#mergeTile.remove();
    this.#mergeTile = null;

  }

}

function createBoard(gameBoardElement) {
  let cells = []
  for(let i = 0; i < 16; i++) {
    let x = i % 4;
    let y = Math.floor(i/4);
    let cellElement = document.createElement("div");
    cellElement.classList.add("game-cell");
    gameBoardElement.append(cellElement)
    let cell = new Cell(cellElement,x,y);
    cells.push(cell);
  }
  return cells;
}
