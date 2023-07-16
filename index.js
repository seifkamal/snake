import { Snake } from "./src/snake.js";
import { Scene } from "./src/scene.js";
import { Game } from "./src/game.js";
import { Menu } from "./src/menu.js";
import { InputManager } from "./src/input.js";
import { Vec } from "./src/geometry.js";

document.addEventListener("DOMContentLoaded", () => {
  const snake = createSnake();
  const scene = createScene();
  const menu = createMenu();
  const input = new InputManager(window);
  const game = new Game(snake, scene, menu, input);

  game.start();
});

function createSnake() {
  return new Snake(new Vec(2, 5), Vec.right, [Vec.left]);
}

function createScene() {
  const canvas = document.querySelector("canvas#game");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("could not find canvas element");
  }

  return new Scene(canvas);
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
