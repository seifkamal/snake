export class Menu {
  #score;
  #endScreen;
  #pauseScreen;

  /**
   * @param {HTMLElement} score
   * @param {HTMLElement} endScreen
   * @param {HTMLElement} pauseScreen
   */
  constructor(score, endScreen, pauseScreen) {
    this.#score = score;
    this.#score.textContent = "0";

    this.#endScreen = endScreen;
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
}
