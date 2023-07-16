import { Grid, Vec } from "./geometry.js";

export class Scene {
  static DefaultSettings = {
    gridScale: 25,
    showGrid: false,
  };

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Partial<typeof Scene.DefaultSettings>} [settings]
   */
  constructor(canvas, settings = {}) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("canvas 2d context not supported");
    }
    this.ctx = ctx;
    this.settings = { ...Scene.DefaultSettings, ...settings };
    this.grid = Grid.fromCanvas(canvas, this.settings.gridScale);
  }

  get bounds() {
    return this.grid.bounds;
  }

  randomPoint() {
    return this.grid.randomPoint();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.grid.width, this.grid.height);
  }

  /** @param {import('./geometry.js').Vec[]} points */
  render(...points) {
    if (this.settings.showGrid) {
      this.#drawGrid();
    }
    if (points) {
      this.#plot(points);
    }
  }

  #drawGrid() {
    const { width, height, cellWidth, cellHeight } = this.grid;
    for (let x = 0; x <= width; x += cellWidth) {
      for (let y = 0; y <= height; y += cellHeight) {
        this.ctx.strokeStyle = "rgb(165 217 241 / 0.4)";
        this.ctx.strokeRect(x, y, cellWidth, cellHeight);
      }
    }
  }

  /** @param {import('./geometry.js').Vec[]} points */
  #plot(points) {
    points.forEach((point) => {
      const scale = this.grid.scale;
      const pos = Vec.scale(point, scale);
      this.ctx.fillStyle = "lightseagreen";
      this.ctx.fillRect(pos.x, pos.y, scale.x, scale.y);
    });
  }
}
