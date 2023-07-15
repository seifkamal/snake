/** @typedef {'up' | 'down' | 'left' | 'right'} Direction */
export class TurnEvent extends CustomEvent {
  static type = "input:turn";

  /** @param {Direction} direction */
  constructor(direction) {
    super(TurnEvent.type, { detail: direction });
  }

  /** @returns {Direction} */
  get direction() {
    return this.detail;
  }
}

export class PauseEvent extends Event {
  static type = "input:pause";
  constructor() {
    super(PauseEvent.type);
  }
}
