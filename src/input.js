import { PauseEvent, TurnEvent } from "./events.js";

export class InputManager extends EventTarget {
  static DefaultControls = {
    w: new TurnEvent("up"),
    ArrowUp: new TurnEvent("up"),
    a: new TurnEvent("left"),
    ArrowLeft: new TurnEvent("left"),
    s: new TurnEvent("down"),
    ArrowDown: new TurnEvent("down"),
    d: new TurnEvent("right"),
    ArrowRight: new TurnEvent("right"),
    Escape: new PauseEvent(),
  };

  /**
   * @param {EventTarget} target
   * @param {Partial<typeof InputManager.DefaultControls>} [controls]
   */
  constructor(target, controls = {}) {
    super();
    this.target = target;
    this.controls = { ...InputManager.DefaultControls, ...controls };
  }

  start() {
    this.target.addEventListener("keydown", this.#handleInput);
  }

  stop() {
    this.target.removeEventListener("keydown", this.#handleInput);
  }

  /** @param {Event} event  */
  #handleInput = (event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (event.repeat) {
      return;
    }
    if (!(event.key in this.controls)) {
      return;
    }
    this.dispatchEvent(this.controls[event.key]);
  };
}
