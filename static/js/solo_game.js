import { PistolaSolo } from "./pistolas.js";
import { xCurve, yCurve, coordinatesAxis } from "./vital_functions.js";
import { width, height, color, createImgElement } from "./vital_functions.js";

const arms = window.flaskVariables.arms;
const armed = window.flaskVariables.armed;

const pistola = new PistolaSolo(arms, armed);

/* PISTOLAS STYLING */
const guns_colors = [
  "darkcyan",
  "scarlet",
  "violet",
  "orange",
  "cian",
  "green",
];
const container = document.getElementById("main");

/* Bring PISTOLAS to html */
let used = [];
while (used.length !== pistola.tambor.size) {
  let c = color(guns_colors);
  if (!used.includes(c)) {
    container.appendChild(createImgElement("guns", c));
    used.push(c);
  }
}
const PISTOLAS = document.getElementsByName("guns");

/* VARIABLES */
const PASOS = 360 / PISTOLAS.length;
const c_width = width(container);
const c_height = height(container);
let p_size = height(PISTOLAS[0]);
const R = 230;

/* STYLE */
for (let i = 0, deg = 0; i < PISTOLAS.length; i++, deg += PASOS) {
  PISTOLAS[i].style.left =
    coordinatesAxis(xCurve(R, deg, c_width / 2), p_size, c_width) + "%";
  PISTOLAS[i].style.bottom =
    coordinatesAxis(yCurve(R, deg, c_height / 2), p_size, c_height) + "%";
}

PISTOLAS.forEach((p, eleccion) => {
  p.addEventListener("click", function (event) {
    let actual = pistola.tambor.ultimo.siguiente;
    for (let i = 0; i < eleccion; i++) {
      actual = actual.siguiente;
    }

    const game_container = document.getElementsByClassName("game")[0];
    const flash =
      "radial-gradient(circle, #FFFFFF 10%, #C6A69C 40%, #B7978A 70%, #CEC0AD19 100%)";
    const gradient =
      "radial-gradient(circle, #CEC0AD19 20%, #211A1599 50%, #14110E 100%)";

    game_container.style.setProperty("--flash", flash);

    setTimeout(function () {
      game_container.style.setProperty("--flash", gradient);

      const popup = document.getElementById("popupOverlay");
      popup.style.display = "flex";
      popup.style.animation = "fade-in 500ms forwards";

      let result;
      if (actual.dato === 0) {
        result = ["SOBREVIVISTE", "#AC8E3B"];
      } else {
        result = ["MORISTE", "#AC3B3B"];
      }

      const selection = document.getElementsByClassName("triggered-selection");
      selection[0].textContent = result[0];
      Array.from(selection).forEach((s) => {
        s.style.setProperty("--result", result[1]);
      });
    }, 75);
  });
});
