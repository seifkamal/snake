import { RestartEvent } from "./events.js";

export class Menu extends EventTarget {
  #score;
  #endScreen;
  #pauseScreen;

  /**
   * @param {HTMLElement} score
   * @param {HTMLElement} endScreen
   * @param {HTMLElement} pauseScreen
   */
  constructor(score, endScreen, pauseScreen) {
    super();

    this.#score = score;
    this.#score.textContent = "0";

    this.#endScreen = endScreen;
    this.#endScreen.addEventListener("submit", this.#handleEndRestart);
    this.hideEndScreen();

    this.#pauseScreen = pauseScreen;
    this.hidePauseScreen();
  }

  showEndScreen() {
    this.#endScreen.hidden = false;
  }

  hideEndScreen() {
    this.#endScreen.hidden = true;
  }

  showPauseScreen() {
    this.#pauseScreen.hidden = false;
  }

  hidePauseScreen() {
    this.#pauseScreen.hidden = true;
  }

  /** @param {number} total */
  updateScore(total) {
    this.#score.textContent = String(total);
  }

  /** @param {SubmitEvent} event */
  #handleEndRestart = (event) => {
    event.preventDefault();
    this.dispatchEvent(new RestartEvent());
  };
}
