import { PauseEvent, RestartEvent, TurnEvent } from "./events.js";

export class Game {
  static startingFps = 4;
  static fpsIncrementInterval = 5;

  /** @type {ReturnType<typeof setInterval> | null} */
  #loop;

  /**
   * @param {import('./scene.js').Scene} scene
   * @param {import('./snake.js').Snake} snake
   * @param {import('./menu.js').Menu} menu
   * @param {import('./input.js').InputManager} inputManager
   */
  constructor(scene, snake, menu, inputManager) {
    this.scene = scene;
    this.snake = snake;
    this.snakeInitialState = snake.clone();

    this.menu = menu;
    this.menu.addEventListener(RestartEvent.type, this.#handleRestartEvent);

    this.input = inputManager;
    this.input.addEventListener(PauseEvent.type, this.#handlePauseEvent);
    this.input.addEventListener(TurnEvent.type, this.#handleTurnEvent);

    this.food = this.scene.randomPoint();
    this.fps = Game.startingFps;
    this.score = 0;
  }

  start() {
    this.#updateScore(0);
    this.#updateFps(Game.startingFps);
    this.#startLoop();
    this.input.start();
    this.menu.hideEndScreen();
  }

  stop() {
    this.#stopLoop();
    this.input.stop();
    this.menu.showEndScreen();
  }

  #handleRestartEvent = () => {
    this.snake = this.snakeInitialState.clone();
    this.food = this.scene.randomPoint();
    this.start();
  };

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

  /** @param {number} score */
  #updateScore(score) {
    this.score = score;
    this.menu.updateScore(this.score);
  }

  /**
   * @param {number} fps
   * @param {boolean} refresh
   */
  #updateFps(fps, refresh = false) {
    this.fps = fps;
    if (refresh) {
      this.#stopLoop();
      this.#startLoop();
    }
  }

  #simulate() {
    if (this.snake.overlapsItself()) {
      this.stop();
      return;
    }

    if (this.snake.canEat(this.food)) {
      this.snake.grow();
      this.food = this.scene.randomPoint();
      this.#updateScore(this.score + 1);
      if (this.score % Game.fpsIncrementInterval === 0) {
        this.#updateFps(this.fps + 1, true);
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
