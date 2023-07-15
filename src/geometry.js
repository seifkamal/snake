export class Grid {
  #units;
  #width;
  #height;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {number} units
   * @returns {Grid}
   */
  static fromCanvas(canvas, units) {
    return new Grid(canvas.width, canvas.height, units);
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {number} units
   */
  constructor(width, height, units = 20) {
    this.#units = units;
    this.#width = width;
    this.#height = height;
  }

  /** @returns {number} */
  get width() {
    return this.#width;
  }

  /** @returns {number} */
  get height() {
    return this.#height;
  }

  /** @returns {number} */
  get cellWidth() {
    return this.#width / this.#units;
  }

  /** @returns {number} */
  get cellHeight() {
    return this.#height / this.#units;
  }

  /** @return {Vec} */
  get scale() {
    return new Vec(this.cellWidth, this.cellHeight);
  }

  /** @return {Vec} */
  get bounds() {
    return new Vec(this.#units);
  }

  /** @return {Vec} */
  randomPoint() {
    const x = Math.floor((Math.random() * this.#width) / this.cellWidth);
    const y = Math.floor((Math.random() * this.#height) / this.cellHeight);
    return new Vec(x, y);
  }
}

export class Vec {
  /**
   * @param {number} [x]
   * @param {number} [y]
   */
  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }

  /**
   * @returns {Vec}
   */
  static get up() {
    return new Vec(0, -1);
  }

  /**
   * @returns {Vec}
   */
  static get down() {
    return new Vec(0, 1);
  }

  /**
   * @returns {Vec}
   */
  static get left() {
    return new Vec(-1, 0);
  }

  /**
   * @returns {Vec}
   */
  static get right() {
    return new Vec(1, 0);
  }

  /**
   * @param {string} relativeDirection
   * @returns {Vec}
   */
  static towards(relativeDirection) {
    switch (relativeDirection) {
      case "up":
        return Vec.up;
      case "down":
        return Vec.down;
      case "left":
        return Vec.left;
      case "right":
        return Vec.right;
    }
    throw new Error("unknown direction: " + relativeDirection);
  }

  /**
   * @param {Vec} vec
   * @param {Vec} by
   * @returns {Vec}
   */
  static translate(vec, by) {
    return new Vec(vec.x + by.x, vec.y + by.y);
  }

  /**
   * @param {Vec} vec
   * @param {Vec} by
   * @returns {Vec}
   */
  static scale(vec, by) {
    return new Vec(vec.x * by.x, vec.y * by.y);
  }

  /**
   * @param {Vec} vec
   * @param {Vec} bounds
   * @returns {Vec}
   */
  static constrain(vec, bounds) {
    const constrained = Vec.clone(vec);
    if (vec.x >= bounds.x) {
      constrained.x = 0;
    }
    if (vec.x < 0) {
      constrained.x = bounds.x - 1;
    }
    if (vec.y >= bounds.y) {
      constrained.y = 0;
    }
    if (vec.y < 0) {
      constrained.y = bounds.y - 1;
    }
    return constrained;
  }

  /**
   * @param {Vec} vec1
   * @param {Vec} vec2
   * @returns {boolean}
   */
  static overlaps(vec1, vec2) {
    return vec1.x === vec2.x && vec1.y === vec2.y;
  }

  /**
   * @param {Vec} vec
   * @returns {Vec}
   */
  static clone(vec) {
    return new Vec(vec.x, vec.y);
  }
}
