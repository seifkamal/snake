export class Menu {
  #endScreen;
  #pauseScreen;

  /**
   * @param {HTMLElement} endScreen
   * @param {HTMLElement} pauseScreen
   */
  constructor(endScreen, pauseScreen) {
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
}
