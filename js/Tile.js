export default class Tile {
  #x
  #y
  #value
  #tileElement
  constructor(gameBoard, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    gameBoard.appendChild(this.#tileElement);
    this.#tileElement.textContent = value;
    this.value = value;

  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#tileElement.textContent = value
    const power = Math.log2(value)
    const backgroundLightness = 100 - power * 9
    this.#tileElement.style.setProperty(
        "--background-lightness",
        `${backgroundLightness}%`
    )
    this.#value = value;

  }

  get x() {
    return this.#x;
  }
  set x(x) {
    this.#x = x;
    this.#tileElement.style.setProperty("--x",this.#x);
  }

  get y() {
    return this.#y;
  }
  set y(y) {
    this.#y = y;
    this.#tileElement.style.setProperty("--y",this.#y);
  }

  remove() {
      this.#tileElement.remove();
  }
}
