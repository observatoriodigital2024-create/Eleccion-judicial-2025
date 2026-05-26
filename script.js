import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const pasos = Array.from(document.querySelectorAll(".paso"));
const relato = document.querySelector(".relato");
const barraProgreso = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");
const chartContainer = document.querySelector("#observableChart");

const escenas = [
  {id: "tiktok-justicia", etiqueta: "Escena 1", titulo: "La justicia entra a TikTok"},
  {id: "acordeon", etiqueta: "Escena 2", titulo: "El auge del acordeón"},
  {id: "dominancia", etiqueta: "Escena 3", titulo: "Quién domina la conversación"},
  {id: "red-narrativas", etiqueta: "Escena 4", titulo: "Red de usuarios y narrativas"},
  {id: "emociones", etiqueta: "Escena 5", titulo: "La disputa emocional"}
];

const datos = {
  tiktok: [
    {periodo: "Antes", publicaciones: 65},
    {periodo: "Durante", publicaciones: 12},
    {periodo: "Después", publicaciones: 115}
  ],
  acordeon: [
    {mes: "Ene", menciones: 0},
    {mes: "Feb", menciones: 0},
    {mes: "Mar", menciones: 5},
    {mes: "Abr", menciones: 15},
    {mes: "May", menciones: 60},
    {mes: "Jun", menciones: 100}
  ],
  usuarios: [
    {usuario: "@lexconsulto", publicaciones: 59},
    {usuario: "@latinus_us", publicaciones: 16},
    {usuario: "@politicomx", publicaciones: 15},
    {usuario: "@lexconsultonoticias", publicaciones: 14},
    {usuario: "@aztecanoticias", publicaciones: 11}
  ],
  red: {
    nodes: [
      {id: "@lexconsulto", grupo: "usuario", size: 59},
      {id: "@politicomx", grupo: "usuario", size: 15},
      {id: "@latinus_us", grupo: "usuario", size: 16},
      {id: "@aztecanoticias", grupo: "usuario", size: 11},
      {id: "#acordeon", grupo: "hashtag", size: 40},
      {id: "#reformajudicial", grupo: "hashtag", size: 30},
      {id: "#scjn", grupo: "hashtag", size: 22},
      {id: "#eleccionjudicial", grupo: "hashtag", size: 25}
    ],
    links: [
      {source: "@lexconsulto", target: "#acordeon"},
      {source: "@lexconsulto", target: "#reformajudicial"},
      {source: "@lexconsulto", target: "#scjn"},
      {source: "@politicomx", target: "#eleccionjudicial"},
      {source: "@politicomx", target: "#reformajudicial"},
      {source: "@latinus_us", target: "#acordeon"},
      {source: "@aztecanoticias", target: "#scjn"}
    ]
  },
  emociones: [
    {periodo: "Antes", emotion: "Alegría", value: 42},
    {periodo: "Antes", emotion: "Enojo", value: 8},
    {periodo: "Durante", emotion: "Alegría", value: 35},
    {periodo: "Durante", emotion: "Enojo", value: 10},
    {periodo: "Después", emotion: "Alegría", value: 18},
    {periodo: "Después", emotion: "Enojo", value: 17}
  ]
};

function limpiarGrafico() {
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
}

function graficoTikTok() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Período", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Publicaciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barY(datos.tiktok, {
        x: "periodo",
        y: "publicaciones",
        fill: "#06b6d4"
      }),
      Plot.ruleY([0])
    ]
  });
  chartContainer.append(chart);
}

function graficoAcordeon() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Mes", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Menciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.areaY(datos.acordeon, {
        x: "mes",
        y: "menciones",
        fill: "url(#gradient)",
        stroke: "#8b5cf6",
        strokeWidth: 2
      }),
      Plot.dot(datos.acordeon, {
        x: "mes",
        y: "menciones",
        fill: "#8b5cf6",
        r: 4
      })
    ]
  });
  
  // Agregar gradiente al SVG
  const svg = chart.querySelector("svg");
  if (svg) {
    const defs = svg.querySelector("defs") || svg.insertBefore(
      document.createElementNS("http://www.w3.org/2000/svg", "defs"),
      svg.firstChild
    );
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#8b5cf6");
    stop1.setAttribute("stop-opacity", "0.4");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#8b5cf6");
    stop2.setAttribute("stop-opacity", "0.02");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
  }
  
  chartContainer.append(chart);
}

function graficoDominancia() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 180,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Publicaciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos.usuarios, {
        y: "usuario",
        x: "publicaciones",
        fill: "#3b82f6",
        sort: {y: "x", reverse: true}
      }),
      Plot.text(datos.usuarios, {
        y: "usuario",
        x: "publicaciones",
        text: d => `${d.publicaciones}`,
        dx: 8,
        fill: "#cbd5e1"
      })
    ]
  });
  chartContainer.append(chart);
}

function graficoRed() {
  limpiarGrafico();
  
  const width = 650;
  const height = 420;
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  // Preparar los datos
  const nodes = datos.red.nodes.map(d => ({...d}));
  const links = datos.red.links.map(d => ({...d}));
  
  // Crear simulación física
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(80))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));
  
  // Dibujar enlaces
  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "network-link");
  
  // Dibujar nodos
  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "network-node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  node.append("circle")
    .attr("r", d => Math.sqrt(d.size) * 2.5)
    .attr("fill", d => d.grupo === "hashtag" ? "#ec4899" : "#06b6d4");
  
  node.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .text(d => d.id.replace("@", "").replace("#", ""));
  
  // Actualizar posiciones en cada tick
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
  
  // Funciones de arrastre
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  chartContainer.append(svg.node());
}

function graficoEmociones() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Período", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Menciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.lineY(datos.emociones.filter(d => d.emotion === "Alegría"), {
        x: "periodo",
        y: "value",
        stroke: "#06b6d4",
        strokeWidth: 3,
        title: "Alegría"
      }),
      Plot.lineY(datos.emociones.filter(d => d.emotion === "Enojo"), {
        x: "periodo",
        y: "value",
        stroke: "#ec4899",
        strokeWidth: 3,
        title: "Enojo"
      }),
      Plot.dot(datos.emociones.filter(d => d.emotion === "Alegría"), {
        x: "periodo",
        y: "value",
        fill: "#06b6d4",
        r: 5
      }),
      Plot.dot(datos.emociones.filter(d => d.emotion === "Enojo"), {
        x: "periodo",
        y: "value",
        fill: "#ec4899",
        r: 5
      })
    ]
  });
  chartContainer.append(chart);
}

const funcionesGraficos = [
  graficoTikTok,
  graficoAcordeon,
  graficoDominancia,
  graficoRed,
  graficoEmociones
];

function activarEscena(index) {
  pasos.forEach((paso, i) => paso.classList.toggle("activo", i === index));
  
  const escena = escenas[index] || escenas[0];
  rotuloEtapa.textContent = escena.etiqueta;
  rotuloTitulo.textContent = escena.titulo;
  barraProgreso.style.width = `${((index + 1) / pasos.length) * 100}%`;
  
  const funcion = funcionesGraficos[index] || funcionesGraficos[0];
  funcion();
}

function actualizarProgreso() {
  if (!relato) return;
  
  const inicio = relato.offsetTop;
  const final = relato.offsetTop + relato.offsetHeight - window.innerHeight;
  if (final <= inicio) return;
  
  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(100, Math.max(0, avance * 100));
  barraProgreso.style.width = `${porcentaje}%`;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = pasos.indexOf(entry.target);
        if (index >= 0) {
          activarEscena(index);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.55
  }
);

pasos.forEach((paso) => observer.observe(paso));
window.addEventListener("scroll", actualizarProgreso, { passive: true });
window.addEventListener("resize", actualizarProgreso);

activarEscena(0);
actualizarProgreso();
