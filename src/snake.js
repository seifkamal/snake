import { Vec } from "./geometry.js";

export class Snake {
  #head;
  #body;
  #facing;

  /**
   * @param {Vec} head
   * @param {Vec} [facing]
   * @param {Vec[]} [body]
   */
  constructor(head, facing = Vec.right, body = []) {
    this.#head = head;
    this.#facing = facing;
    this.#body = body;
  }

  get parts() {
    return [this.#head, ...this.#body];
  }

  get neck() {
    return this.#body[0];
  }

  /** @param {Vec | string} towards */
  turn(towards) {
    let direction = towards;
    if (typeof direction === "string") {
      direction = Vec.towards(direction);
    }
    const neck = this.neck;
    const potentialTurn = Vec.translate(this.#head, direction);
    // Disallow turning backwards
    if (neck && Vec.overlaps(neck, potentialTurn)) {
      return;
    }
    this.#facing = direction;
  }

  /** @param {Vec} [bounds] */
  step(bounds) {
    for (let i = this.#body.length - 1; i >= 0; i--) {
      const prev = this.#body[i - 1] ?? this.#head;
      this.#body[i] = prev;
    }
    this.#head = Vec.translate(this.#head, this.#facing);
    if (bounds) {
      this.#head = Vec.constrain(this.#head, bounds);
    }
  }

  grow() {
    this.#body.push(this.#facing);
  }

  /**
   * @param {Vec} food
   * @returns {boolean}
   */
  canEat(food) {
    return Vec.overlaps(this.#head, food);
  }

  /** @returns {boolean} */
  overlapsItself() {
    return this.#body.some((part) => Vec.overlaps(this.#head, part));
  }
}
