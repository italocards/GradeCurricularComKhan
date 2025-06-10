// js/visualization.js

const svg = d3.select("#svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Posiciona nós lado a lado dentro do semestre
// Calculo inicial de posições fixas para iniciar o drag
nodesData.forEach(node => {
  if(node.semester < 1) return;  // Pula nós com semestre inválido

  const area = semesterAreas[node.semester - 1];
  const nodesInSemester = nodesData.filter(n => n.semester === node.semester);
  const idx = nodesInSemester.findIndex(n => n.id === node.id);
  const total = nodesInSemester.length;
  const spacingX = Math.min(nodeSpacingX, (semesterWidth - nodeRadius*2) / total);
  node.x = area.xMin + 15 + idx * spacingX;
  node.y = (area.yMin + area.yMax) / 2;
});

// Define setas para links
svg.append("defs").append("marker")
  .attr("id", "arrow")
  .attr("viewBox", "0 -5 10 10")
  .attr("refX", 20)
  .attr("refY", 0)
  .attr("markerWidth", 7)
  .attr("markerHeight", 7)
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#999");

// Desenha caixas dos semestres
svg.selectAll("rect.semester-box")
  .data(semesterAreas)
  .enter()
  .append("rect")
  .attr("class", "semester-box")
  .attr("x", d => d.xMin)
  .attr("y", d => d.yMin)
  .attr("width", semesterWidth)
  .attr("height", semesterHeight);

// Texto semestre
svg.selectAll("text.semester-label")
  .data(semesterAreas)
  .enter()
  .append("text")
  .attr("x", d => d.xMin + semesterWidth/2)
  .attr("y", d => d.yMin - 5)
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .attr("fill", "#3f51b5")
  .text(d => "Semestre " + d.semester);

// Criar links
const link = svg.selectAll("line.link")
  .data(linksData)
  .enter()
  .append("line")
  .attr("class", "link");

// Criar nós
const node = svg.selectAll("g.node")
  .data(nodesData)
  .enter()
  .append("g")
  .attr("class", "node")
  // CORRECTED LINE: Using template literals for the transform attribute
  .attr("transform", d => `translate(${d.x},${d.y})`)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  );

node.append("circle")
  .attr("r", nodeRadius);

node.append("text")
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .text(d => d.id);

// Atualiza posições de links e nós
function ticked() {
  link
    .attr("x1", d => getNodeById(d.source).x)
    .attr("y1", d => getNodeById(d.source).y)
    .attr("x2", d => getNodeById(d.target).x)
    .attr("y2", d => getNodeById(d.target).y);

  // CORRECTED LINE: Using template literals for the transform attribute
  node.attr("transform", d => `translate(${d.x},${d.y})`);
}

// Função para encontrar nó por id
function getNodeById(id) {
  return nodesData.find(n => n.id === id);
}

// Função para limitar o nó dentro da área do semestre
function clampNodePosition(node) {
  const area = semesterAreas[node.semester -1];
  node.x = Math.max(area.xMin + nodeRadius, Math.min(area.xMax - nodeRadius, node.x));
  node.y = Math.max(area.yMin + nodeRadius, Math.min(area.yMax - nodeRadius, node.y));
}

// Drag handlers
function dragstarted(event, d) {
  d3.select(this).select("circle").attr("stroke", "#f50057");
}

function dragged(event, d) {
  d.x = event.x;
  d.y = event.y;
  clampNodePosition(d);
  ticked();
}

function dragended(event, d) {
  d3.select(this).select("circle").attr("stroke", "#0d47a1");
}

// Inicializa desenho
ticked();
