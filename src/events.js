export class TurnEvent extends CustomEvent {
  static type = "snake:turn";

  /**
   * @typedef {'up' | 'down' | 'left' | 'right'} Direction
   * @param {Direction} direction
   */
  constructor(direction) {
    super(TurnEvent.type, { detail: direction });
  }

  /** @returns {Direction} */
  get direction() {
    return this.detail;
  }
}

export class PauseEvent extends Event {
  static type = "snake:pause";
  constructor() {
    super(PauseEvent.type);
  }
}

export class RestartEvent extends Event {
  static type = "snake:restart";
  constructor() {
    super(RestartEvent.type);
  }
}
