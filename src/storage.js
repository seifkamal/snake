/**
 * @typedef {{
 *   getItem(key: string): string | null;
 *   setItem(key: string, value: string): void;
 * }} Client
 */
export class Storage {
  static highScoreKey = "highscore";

  /** @param {Client} client */
  constructor(client) {
    this.client = client;
  }

  get highScore() {
    return Number(this.client.getItem(Storage.highScoreKey));
  }

  /** @param {number} value */
  set highScore(value) {
    this.client.setItem(Storage.highScoreKey, String(value));
  }
}
