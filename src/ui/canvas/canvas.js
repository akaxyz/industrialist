const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export const PIXELS_PER_STUD = 32;

const camera = {
  x: 0,
  y: 0,
  zoom: 0.1,
};

const mouse = {
  x: 0,
  y: 0,
};

let width = 0;
let height = 0;

let isPanning = false;
let panStart = {
  x: 0,
  y: 0,
};

export function screenToWorld(x, y) {
  return {
    x: (x - camera.x) / (PIXELS_PER_STUD * camera.zoom),
    y: (y - camera.y) / (PIXELS_PER_STUD * camera.zoom),
  };
}

export function worldToScreen(x, y) {
  return {
    x: x * PIXELS_PER_STUD * camera.zoom + camera.x,
    y: y * PIXELS_PER_STUD * camera.zoom + camera.y,
  };
}

export function getMouseWorldPosition() {
  return screenToWorld(mouse.x, mouse.y);
}

export function getEventCanvasPosition(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function getMouseCanvasPosition() {
  return { x: mouse.x, y: mouse.y };
}

export function getZoom() {
  return camera.zoom;
}

function updateMouse(event) {
  const rect = canvas.getBoundingClientRect();

  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  width = rect.width;
  height = rect.height;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function render() {
  ctx.clearRect(0, 0, width, height);

  drawGrid();
}

function drawGrid() {
  const baseGridSize = 32;
  const gridSize = baseGridSize * camera.zoom;

  // Minor grid lines
  ctx.beginPath();

  for (let x = camera.x % gridSize; x < width; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (let y = camera.y % gridSize; y < height; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#dddddd";
  ctx.stroke();

  // Major grid lines
  const majorGridSize = gridSize * 4;

  ctx.beginPath();

  for (let x = camera.x % majorGridSize; x < width; x += majorGridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (let y = camera.y % majorGridSize; y < height; y += majorGridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#c8c8c8";
  ctx.stroke();

  // Axes
  ctx.beginPath();

  ctx.moveTo(camera.x, 0);
  ctx.lineTo(camera.x, height);

  ctx.moveTo(0, camera.y);
  ctx.lineTo(width, camera.y);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#888888";
  ctx.stroke();
}

function startPan(event) {
  if (event.button !== 0) return;

  isPanning = true;

  panStart.x = event.clientX;
  panStart.y = event.clientY;

  canvas.style.cursor = "grabbing";

  event.preventDefault();
}

function pan(event) {
  if (!isPanning) return;

  camera.x += event.clientX - panStart.x;
  camera.y += event.clientY - panStart.y;

  panStart.x = event.clientX;
  panStart.y = event.clientY;
}

function endPan() {
  if (!isPanning) return;

  isPanning = false;
  canvas.style.cursor = "default";
}

function zoom(event) {
  event.preventDefault();

  const oldZoom = camera.zoom;

  camera.zoom *= event.deltaY < 0 ? 1.1 : 1 / 1.1;
  camera.zoom = Math.max(0.1, Math.min(camera.zoom, 10));

  camera.x = mouse.x - (mouse.x - camera.x) * (camera.zoom / oldZoom);

  camera.y = mouse.y - (mouse.y - camera.y) * (camera.zoom / oldZoom);
}

export function getContext() {
  return ctx;
}

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", startPan);
canvas.addEventListener("mousemove", updateMouse);

window.addEventListener("mousemove", pan);
window.addEventListener("mouseup", endPan);

canvas.addEventListener("wheel", zoom, { passive: false });

resizeCanvas();

export function getCanvas() {
  return canvas;
}