import { PauseEvent, TurnEvent } from "./events.js";

export class Game {
  static startingFps = 4;
  static fpsIncreaseInterval = 5;

  /** @type {ReturnType<typeof setInterval> | null} */
  #loop;

  /**
   * @param {import('./snake.js').Snake} snake
   * @param {import('./scene.js').Scene} scene
   * @param {import('./menu.js').Menu} menu
   * @param {import('./input.js').InputManager} inputManager
   */
  constructor(snake, scene, menu, inputManager) {
    this.snake = snake;
    this.scene = scene;
    this.menu = menu;
    this.input = inputManager;
    this.input.addEventListener(PauseEvent.type, this.#handlePauseEvent);
    this.input.addEventListener(TurnEvent.type, this.#handleTurnEvent);
    this.food = this.scene.randomPoint();
    this.fps = Game.startingFps;
    this.score = 0;
  }

  start() {
    this.fps = Game.startingFps;
    this.score = 0;
    this.#startLoop();
    this.input.start();
    this.menu.hideEndScreen();
  }

  stop() {
    this.#stopLoop();
    this.input.stop();
    this.menu.showEndScreen();
  }

  #handlePauseEvent = () => {
    if (this.#loop) {
      this.#stopLoop();
      this.menu.showPauseScreen();
      return;
    }
    this.#startLoop();
    this.menu.hidePauseScreen();
  };

  /** @param {Event} event */
  #handleTurnEvent = (event) => {
    if (!(event instanceof TurnEvent)) {
      return;
    }
    this.snake.turn(event.direction);
  };

  #simulate() {
    if (this.snake.overlapsItself()) {
      this.stop();
      return;
    }

    if (this.snake.canEat(this.food)) {
      this.snake.grow();
      this.food = this.scene.randomPoint();
      this.score++;
      this.menu.updateScore(this.score);
      if (this.score % Game.fpsIncreaseInterval === 0) {
        this.fps++;
        this.#stopLoop();
        this.#startLoop();
      }
    }

    this.snake.step(this.scene.bounds);
  }

  #tick() {
    this.scene.clear();
    this.#simulate();
    this.scene.render(...this.snake.parts, this.food);
  }

  #startLoop() {
    if (this.#loop) {
      return;
    }
    const interval = 1_000 / this.fps;
    this.#loop = setInterval(this.#tick.bind(this), interval);
  }

  #stopLoop() {
    if (!this.#loop) {
      return;
    }
    clearInterval(this.#loop);
    this.#loop = null;
  }
}
