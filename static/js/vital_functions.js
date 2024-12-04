/* VITAL FUNCTIONS */
export const round_4 = (x) => Math.round(x * 10 ** 4) / 10 ** 4;
export const rad = (deg) => deg * (Math.PI / 180);
export const color = (colors) =>
  colors[Math.floor(Math.random() * colors.length)];

/* COORDINATES */
export const xCurve = (r, deg, xCenter) => r * Math.cos(rad(deg)) + xCenter;
export const yCurve = (r, deg, yCenter) => r * Math.sin(rad(deg)) + yCenter;

export const coordinatesAxis = (curve, child_size, container_size) =>
  round_4((100 * (curve - child_size / 2)) / container_size);

/* MEASUREMENTS */
export const width = (elmnt) => parseFloat(getComputedStyle(elmnt).width);
export const height = (elmnt) => parseFloat(getComputedStyle(elmnt).height);

/* IMAGE HANDLER */
export function createImgElement(elemnt, color) {
  const newElement = document.createElement("img");
  newElement.src = "/static/img/" + elemnt + "/" + color + ".png";
  newElement.alt = elemnt + " " + color;
  newElement.id = color;
  newElement.name = elemnt;
  newElement.classList.add(elemnt);

  return newElement;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
