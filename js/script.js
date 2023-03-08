let origin,
  zoom = 30;
const unitLineSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  origin = createVector(width / 2, height / 2);
}
let pontos = [];

function adicionarCoordenada() {
  let xInput = document.getElementById("input-x");
  let yInput = document.getElementById("input-y");

  let x = parseFloat(xInput.value);
  let y = parseFloat(yInput.value);

  if (!isNaN(x) && !isNaN(y)) {
    pontos.push({ x: x, y: y });
    renderizarPontos();
    let area = areaDoPoligono(pontos);
    document.getElementById("area").innerHTML = "A ÁREA É: " + area;

    drawPoints(pontos);
  }

  xInput.value = "";
  yInput.value = "";
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    origin.x += mouseX - pmouseX;
    origin.y += mouseY - pmouseY;
  }

  translate(origin.x, origin.y);

  noFill();

  stroke(0);
  strokeWeight(1);

  axis(true, 25);

  stroke(0, 100, 0);
  strokeWeight(2);
  drawPoints(pontos);
}

function removerPonto(index) {
  pontos.splice(index, 1);
  renderizarPontos();
  drawPoints(pontos);
}

function areaDoPoligono(pontos) {
  let area = 0;
  for (let i = 0; i < pontos.length; i++) {
    let j = (i + 1) % pontos.length;
    area += pontos[i].x * pontos[j].y;
    area -= pontos[i].y * pontos[j].x;
  }
  return Math.abs(area / 2);
}

function renderizarPontos() {
  const listaPontos = document.getElementById("listaPontos");
  listaPontos.innerHTML = "";
  pontos.forEach((ponto, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
    <div class="lista">
    <span class="ponto">${ponto.x},${ponto.y}</span>
    <button class="close-button" onclick="removerPonto(${index})">X</button>
    </div>`;
    listaPontos.appendChild(item);
  });
}

function axis(grid, gridAlpha) {
  //abscissa
  line(-origin.x, 0, width - origin.x, 0);

  for (let i = 1; i < origin.x / zoom; i++) {
    line(-i * zoom, unitLineSize / 2, -i * zoom, -unitLineSize / 2);
    
    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-i * zoom, -origin.y, -i * zoom, height - origin.y);
      pop();
    }

    push();
    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);
    text(-i, -i * zoom - textWidth(-i) / 2, unitLineSize * 2);
    pop();
  }
  for (let i = 1; i < (width - origin.x) / zoom; i++) {
    line(i * zoom, unitLineSize / 2, i * zoom, -unitLineSize / 2);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(i * zoom, -origin.y, i * zoom, height - origin.y);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, i * zoom - textWidth(i) / 2, unitLineSize * 2);

    pop();
  }
  //ordinate
  line(0, -origin.y, 0, height - origin.y);
  for (let i = 1; i < origin.y / zoom; i++) {
    line(unitLineSize / 2, -i * zoom, -unitLineSize / 2, -i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, -i * zoom, width - origin.x, -i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, -(unitLineSize + textWidth(-i)), -i * zoom + unitLineSize / 2);

    pop();
  }
  for (let i = 1; i < (height - origin.y) / zoom; i++) {
    line(unitLineSize / 2, i * zoom, -unitLineSize / 2, i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, i * zoom, width - origin.x, i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);
    
    text(-i, -(unitLineSize + textWidth(i)), i * zoom + unitLineSize / 2);

    pop();
  }
}
function drawPoints(pontos) {
  push();
  if (pontos.length > 1) {
    for (let i = 0; i < pontos.length - 1; i++) {
      line(pontos[i].x * zoom, -pontos[i].y * zoom, pontos[i + 1].x * zoom, -pontos[i + 1].y * zoom);
    }
    if (pontos.length > 2) { 
      line(pontos[pontos.length - 1].x * zoom, -pontos[pontos.length - 1].y * zoom, pontos[0].x * zoom, -pontos[0].y * zoom);
    }
  }
  stroke(124, 76, 236); // define a cor dos pontos como vermelho
  strokeWeight(10); // define o tamanho dos pontos como 5 pixels
  for (let i = 0; i < pontos.length; i++) {
    point(pontos[i].x * zoom, -pontos[i].y * zoom);
  }
  pop();
}


function mouseWheel(event) {
  zoom -= event.delta / 20;
  if (zoom < 18) {
    zoom = 18;
  }
}
