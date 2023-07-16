import { Snake } from "./src/snake.js";
import { Scene } from "./src/scene.js";
import { Game } from "./src/game.js";
import { Menu } from "./src/menu.js";
import { InputManager } from "./src/input.js";
import { Vec } from "./src/geometry.js";

document.addEventListener("DOMContentLoaded", () => {
  const scene = createScene();
  const snake = createSnake(scene.bounds);
  const menu = createMenu();
  const input = new InputManager(window);
  const game = new Game(scene, snake, menu, input);

  game.start();
});

function createScene() {
  const canvas = document.querySelector("canvas#game");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("could not find canvas element");
  }

  return new Scene(canvas);
}

/** @param {Vec} bounds */
function createSnake({ x, y }) {
  const startAt = new Vec(Math.floor(x / 2), Math.floor(y / 1.2));
  return new Snake(startAt, Vec.up, [Vec.down]);
}

function createMenu() {
  const score = document.querySelector("#score");
  if (!(score instanceof HTMLElement)) {
    throw new Error("could not find score element");
  }

  const endMenu = document.querySelector("menu#end");
  if (!(endMenu instanceof HTMLElement)) {
    throw new Error("could not find end menu element");
  }

  const pauseMenu = document.querySelector("menu#pause");
  if (!(pauseMenu instanceof HTMLElement)) {
    throw new Error("could not find pause menu element");
  }

  return new Menu(score, endMenu, pauseMenu);
}
