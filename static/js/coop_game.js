import { ColaArray } from "./estructuras.js";
import { PistolaCoop } from "./pistolas.js";
import { xCurve, yCurve, coordinatesAxis, delay } from "./vital_functions.js";
import { width, height, color, createImgElement } from "./vital_functions.js";

const numPlayers = window.flaskVariables.players;
let munition = window.flaskVariables.munition;
const playersNames = window.flaskVariables.playersNames;

const container = document.getElementById("player-screen");

/* COLOR ARRAYS */
const guns_colors = [
  "darkcyan",
  "scarlet",
  "violet",
  "orange",
  "cian",
  "green",
];
const ellipses_colors = ["burlywood", "darkcyan", "violet", "green"];

/* ELLIPSES */
let used = [];
while (used.length !== numPlayers) {
  let ellipse_color = color(ellipses_colors);
  if (!used.includes(ellipse_color)) {
    container.appendChild(createImgElement("ellipses", ellipse_color));
    used.push(ellipse_color);
  }
}

const ELLIPSES = document.getElementsByName("ellipses");

const PASOS = numPlayers == 2 ? 360 / 2 : 360 / 4;
const c_width = width(container);
const c_height = height(container);

for (let i = 0, deg = 0; i < numPlayers; i++, deg += PASOS) {
  const p_width = 130;
  const p_height = 500;

  if (deg % 180 === 0) {
    if (deg === 0) {
      ELLIPSES[i].style.left =
        coordinatesAxis(c_width, p_width * 2, c_width) + "%";
      ELLIPSES[i].style.rotate = "180deg";
    }
    ELLIPSES[i].style.top =
      coordinatesAxis(c_height / 2, p_height, c_height) + "%";
  } else {
    if (deg === 270) {
      ELLIPSES[i].style.bottom =
        coordinatesAxis(c_height - p_width, p_height - p_width, c_height) + "%";
    } else {
      ELLIPSES[i].style.top =
        coordinatesAxis(c_height - p_width, p_height - p_width, c_height) + "%";
    }
    ELLIPSES[i].style.rotate = 180 + 90 * i + "deg";
    ELLIPSES[i].style.left =
      coordinatesAxis(c_width / 2, p_width, c_width) + "%";
  }
}

/* PISTOLA */
document
  .getElementById("pistola")
  .appendChild(createImgElement("guns", color(guns_colors)));

function newBala(id, cargada = false) {
  const newElement = document.createElement("div");
  newElement.classList.add("bala");

  if (cargada) {
    newElement.style.backgroundImage = "url(/static/img/bullet.png)";
    newElement.style.backgroundSize = "cover";
    return newElement;
  }

  newElement.style.backgroundColor = "#434343";
  return newElement;
}

function fill_tambor(tambor) {
  tambor = tambor.split(" ");

  const container = document.getElementById("tambor");
  const c_width = width(container);
  const c_borderWidth = parseFloat(
    getComputedStyle(container).borderBlockWidth
  );
  const c_size = c_width + c_borderWidth * 2;
  const c_radius = 120;
  const pasos = 360 / tambor.length;

  for (let i = 0, deg = 5; i < tambor.length; i++, deg += pasos) {
    let bala;
    if (tambor[i] == 1) {
      bala = newBala(i, true);
      bala.style.left =
        coordinatesAxis(xCurve(c_radius, deg, c_size / 2), 0, c_size) + "%";
      bala.style.bottom =
        coordinatesAxis(yCurve(c_radius, deg, c_size / 2), 0, c_size) + "%";
      container.appendChild(bala);
    } else {
      bala = newBala(i, false);
      bala.style.left =
        coordinatesAxis(xCurve(c_radius, deg, c_size / 2), 0, c_size) + "%";
      bala.style.bottom =
        coordinatesAxis(yCurve(c_radius, deg, c_size / 2), 0, c_size) + "%";
      container.appendChild(bala);
    }
  }
}

function change_tambor(tambor) {
  const BALAS = document.getElementsByClassName("bala");
  for (let i = 0; i < BALAS.length; i++) {
    BALAS[i].remove();
  }
  fill_tambor(tambor);
}

/* GAME */
const players = new ColaArray();
for (let i = 0; i < numPlayers; i++) {
  players.enqueue(playersNames[i]);
}

const ruleta = document.getElementById("tambor");
const pistola = new PistolaCoop(numPlayers, munition);
console.log({ tambor_actual: pistola.tambor.mostrar() });
fill_tambor(pistola.tambor.mostrar());

game();

async function game() {
  return new Promise((resolve) => {
    ruleta.removeEventListener("animationend", resolve);

    playerTurn(actualInGame());
    roulette();
  });
}

function actualInGame() {
  const actual = players.first();
  const actual_index = playersNames.indexOf(actual);

  Array.from(document.getElementsByClassName("player-name")).forEach(
    (element) => {
      element.textContent = actual;
    }
  );
  Array.from(document.getElementsByClassName("triggered-name")).forEach(
    (element) => {
      element.style.setProperty("--result", used[actual_index]);
    }
  );

  return actual_index;
}

function playerTurn(actual_index) {
  const playerPopup = document.getElementById("playerPopup");
  playerPopup.style.display = "flex";

  Array.from(ELLIPSES).forEach((ellipse) => {
    ellipse.style.display = "none";
  });
  ELLIPSES[actual_index].style.display = "unset";

  playerPopup.style.animation = "fade-out 1500ms forwards";
  setTimeout(function () {
    playerPopup.style.display = "none";
  }, 1500);
}

function roulette() {
  const gun = document.getElementsByName("guns")[0];
  gun.addEventListener("click", function (event) {
    const popupRevolver = document.getElementById("popupRevolver");
    popupRevolver.style.display = "flex";
  });

  const spinButton = document.getElementById("spin");
  const root = document.documentElement;

  spinButton.disabled = false;
  spinButton.addEventListener(
    "click",
    function (event) {
      const girar = pistola.girar();
      console.log(girar, pistola.tambor.mostrar());
      ruleta.classList.toggle("girar", true);
      const giroRuleta = girar * (360 / 6);
      root.style.setProperty("--girarRuleta", giroRuleta + "deg");
      spinButton.disabled = true;
    },
    { once: true }
  );

  let isAnimating = false;
  ruleta.addEventListener("animationend", function (event) {
    if (isAnimating) return;
    isAnimating = true;

    requestAnimationFrame(
      async () => {
        ruleta.classList.toggle("girar", false);
        popupRevolver.style.display = "none";

        if (pistola.tambor.ultimo.siguiente.dato === 1) {
          pistola.disparar();
          players.dequeue();
          munition--;

          const result = ["MORISTE", "#AC3B3B"];
          await player_result(result);
          await delay(500);

          if (players.size === 1 || munition === 0) {
            popupRevolver.style.display = "none";
            gameOver();
            isAnimating = false;
          }
        } else {
          pistola.disparar();
          const played = players.dequeue();
          players.enqueue(played);
        }

        if (players.size > 1 && munition > 0) {
          change_tambor(pistola.tambor.mostrar());
          await game();
        }
        isAnimating = false;
      },
      { once: true }
    );
  });
}

function player_result(result) {
  return new Promise((resolve) => {
    const popup = document.getElementById("popupOverlay");
    popup.style.display = "flex";
    popup.style.animation = "fade-out 1500ms forwards";

    const selection = document.getElementsByClassName("triggered-selection");
    selection[0].textContent = result[0];
    Array.from(selection).forEach((s) => {
      s.style.setProperty("--result", result[1]);
    });

    setTimeout(function () {
      popup.style.display = "none";
      resolve();
    }, 1500);
  });
}

async function gameOver() {
  Array.from(ELLIPSES).forEach((ellipse) => {
    ellipse.style.display = "none";
  });
  document.getElementById("pistola").style.display = "none";

  const result = ["SOBREVIVISTE", "#AC8E3B"];

  // Ensure the loop processes all players
  if (!players.isEmpty()) {
    actualInGame();

    await player_result(result);
    await delay(500);
    players.dequeue();

    gameOver();
  } else {
    const popupVolver = document.getElementById("popupVolver");
    popupVolver.style.display = "flex";
  }
}
