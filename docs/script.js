import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const pasos = Array.from(document.querySelectorAll(".paso"));
const barraProgreso = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");

const chartContainer =
  document.querySelector("#visual") ||
  document.querySelector("#observableChart");

const titulos = [
  "De la propaganda al meme",
  "La estética tipo Lego",
  "La lógica emocional",
  "La lógica algorítmica",
  "La red de distribución",
  "El mapa de la disputa narrativa",
  "Cuando el meme no parece falso"
];

function limpiarGrafico() {
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
}

function graficoTimeline() {
  limpiarGrafico();

  const timeline = [
    { año: 1940, etapa: "Propaganda estatal clásica", nivel: 1 },
    { año: 2000, etapa: "Propaganda digital", nivel: 1 },
    { año: 2016, etapa: "Memes políticos electorales", nivel: 1 },
    { año: 2024, etapa: "IA generativa", nivel: 1 },
    { año: 2025, etapa: "Slopaganda bélica", nivel: 1 }
  ];

  const chart = Plot.plot({
    width: 850,
    height: 380,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 80,
    marginBottom: 120,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {
      label: "Año",
      domain: [1935, 2028],
      ticks: [1940, 2000, 2016, 2024, 2025],
      grid: true
    },
    y: {
      domain: [0, 2],
      axis: null
    },
    marks: [
      Plot.ruleY([1], { stroke: "#64748b", strokeWidth: 3 }),
      Plot.dot(timeline, {
        x: "año",
        y: "nivel",
        r: 10,
        fill: "#38bdf8",
        stroke: "white",
        strokeWidth: 2
      }),
      Plot.text(timeline, {
        x: "año",
        y: "nivel",
        text: d => d.año,
        dy: -30,
        fill: "white",
        fontWeight: "bold"
      }),
      Plot.text(timeline, {
        x: "año",
        y: "nivel",
        text: "etapa",
        dy: 38,
        fill: "#cbd5e1",
        lineWidth: 12
      })
    ]
  });

  chartContainer.append(chart);
}

function galeriaLego() {
  limpiarGrafico();

  const cards = [
    {
      img: "assets/img/slopaganda-lego-1.jpg",
      titulo: "Líder caricaturizado",
      emocion: "Burla",
      funcion: "Ridiculizar al adversario"
    },
    {
      img: "assets/img/slopaganda-lego-2.jpg",
      titulo: "Conflicto como juego",
      emocion: "Sorpresa",
      funcion: "Suavizar la violencia"
    },
    {
      img: "assets/img/slopaganda-lego-3.jpg",
      titulo: "Escena bélica infantilizada",
      emocion: "Risa",
      funcion: "Hacer compartible el conflicto"
    },
    {
      img: "assets/img/slopaganda-lego-4.jpg",
      titulo: "Propaganda visual",
      emocion: "Indignación",
      funcion: "Simplificar una narrativa"
    }
  ];

  const wrapper = document.createElement("div");
  wrapper.className = "lego-gallery";
  wrapper.style.display = "grid";
  wrapper.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
  wrapper.style.gap = "1rem";
  wrapper.style.width = "100%";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "lego-card";
    div.style.background = "rgba(255,255,255,0.08)";
    div.style.border = "1px solid rgba(255,255,255,0.15)";
    div.style.borderRadius = "20px";
    div.style.overflow = "hidden";
    div.style.boxShadow = "0 20px 50px rgba(0,0,0,0.25)";

    div.innerHTML = `
      <img src="${card.img}" alt="${card.titulo}" style="width:100%; height:180px; object-fit:cover;">
      <div style="padding:1rem;">
        <h3 style="margin:0 0 .5rem; color:#f8fafc;">${card.titulo}</h3>
        <p style="margin:.25rem 0; color:#38bdf8;"><strong>Emoción:</strong> ${card.emocion}</p>
        <p style="margin:.25rem 0; color:#cbd5e1;"><strong>Función:</strong> ${card.funcion}</p>
      </div>
    `;

    wrapper.append(div);
  });

  chartContainer.append(wrapper);
}

function graficoEmociones() {
  limpiarGrafico();

  const datos = [
    { emocion: "Risa", valor: 85 },
    { emocion: "Burla", valor: 78 },
    { emocion: "Indignación", valor: 70 },
    { emocion: "Sorpresa", valor: 62 },
    { emocion: "Miedo", valor: 45 }
  ];

  const chart = Plot.plot({
    width: 820,
    height: 460,
    marginLeft: 120,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {
      grid: true,
      label: "Intensidad emocional"
    },
    y: {
      label: null
    },
    marks: [
      Plot.barX(datos, {
        y: "emocion",
        x: "valor",
        fill: "#f97316",
        sort: { y: "x", reverse: true }
      }),
      Plot.text(datos, {
        y: "emocion",
        x: "valor",
        text: d => d.valor,
        dx: 18,
        fill: "white"
      }),
      Plot.ruleX([0])
    ]
  });

  chartContainer.append(chart);
}

function graficoAlgoritmico() {
  limpiarGrafico();

  const datos = [
    { dia: "Día 1", vistas: 10000 },
    { dia: "Día 2", vistas: 80000 },
    { dia: "Día 3", vistas: 240000 },
    { dia: "Día 4", vistas: 700000 },
    { dia: "Día 5", vistas: 1500000 },
    { dia: "Día 6", vistas: 3000000 },
    { dia: "Día 7", vistas: 5200000 }
  ];

  const chart = Plot.plot({
    width: 850,
    height: 460,
    marginLeft: 80,
    marginBottom: 60,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {
      label: "Tiempo"
    },
    y: {
      grid: true,
      label: "Vistas",
      tickFormat: d => `${d / 1000000}M`
    },
    marks: [
      Plot.areaY(datos, {
        x: "dia",
        y: "vistas",
        fill: "#38bdf8",
        fillOpacity: 0.18
      }),
      Plot.lineY(datos, {
        x: "dia",
        y: "vistas",
        stroke: "#38bdf8",
        strokeWidth: 4
      }),
      Plot.dot(datos, {
        x: "dia",
        y: "vistas",
        r: 5,
        fill: "white"
      })
    ]
  });

  chartContainer.append(chart);
}

function graficoRedDistribucion() {
  limpiarGrafico();

  const width = 850;
  const height = 560;

  const nodes = [
    { id: "Cuenta oficial", grupo: "actor", size: 24 },
    { id: "Cuenta creadora", grupo: "actor", size: 30 },
    { id: "Medio afín", grupo: "actor", size: 22 },
    { id: "Influencer político", grupo: "actor", size: 24 },
    { id: "Audiencia internacional", grupo: "audiencia", size: 34 },
    { id: "#slopaganda", grupo: "hashtag", size: 25 },
    { id: "#memewar", grupo: "hashtag", size: 22 },
    { id: "#AIpropaganda", grupo: "hashtag", size: 22 },
    { id: "#tipoLego", grupo: "hashtag", size: 24 },
    { id: "Cultura pop", grupo: "narrativa", size: 26 },
    { id: "Humor político", grupo: "narrativa", size: 28 },
    { id: "Guerra", grupo: "narrativa", size: 26 }
  ];

  const links = [
    { source: "Cuenta oficial", target: "Cuenta creadora" },
    { source: "Cuenta creadora", target: "#tipoLego" },
    { source: "Cuenta creadora", target: "Humor político" },
    { source: "Medio afín", target: "#AIpropaganda" },
    { source: "Influencer político", target: "Audiencia internacional" },
    { source: "#slopaganda", target: "Cultura pop" },
    { source: "#memewar", target: "Guerra" },
    { source: "Humor político", target: "Audiencia internacional" },
    { source: "Cultura pop", target: "Audiencia internacional" }
  ];

  const color = d3.scaleOrdinal()
    .domain(["actor", "hashtag", "narrativa", "audiencia"])
    .range(["#38bdf8", "#a78bfa", "#f97316", "#22c55e"]);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "transparent");

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(130))
    .force("charge", d3.forceManyBody().strength(-420))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.size + 20));

  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "rgba(255,255,255,0.25)")
    .attr("stroke-width", 2);

  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", d => d.size)
    .attr("fill", d => color(d.grupo))
    .attr("stroke", "rgba(255,255,255,0.65)")
    .attr("stroke-width", 1.5)
    .call(drag(simulation));

  const label = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(d => d.id)
    .attr("fill", "#f8fafc")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("dy", d => d.size + 16);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

  chartContainer.append(svg.node());
}

function mapaDisputaNarrativa() {
  limpiarGrafico();

  const pasos = [
    { etapa: "Producción propagandística", x: 1, y: 1 },
    { etapa: "IA generativa", x: 2, y: 1 },
    { etapa: "Redes sociales", x: 3, y: 1 },
    { etapa: "Audiencias globales", x: 4, y: 1 },
    { etapa: "Reacción emocional", x: 5, y: 1 }
  ];

  const chart = Plot.plot({
    width: 850,
    height: 350,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 80,
    marginBottom: 100,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {
      domain: [0.5, 5.5],
      axis: null
    },
    y: {
      domain: [0.5, 1.5],
      axis: null
    },
    marks: [
      Plot.line(pasos, {
        x: "x",
        y: "y",
        stroke: "#64748b",
        strokeWidth: 4
      }),
      Plot.dot(pasos, {
        x: "x",
        y: "y",
        r: 18,
        fill: "#a78bfa",
        stroke: "white",
        strokeWidth: 2
      }),
      Plot.text(pasos, {
        x: "x",
        y: "y",
        text: "etapa",
        dy: 48,
        fill: "#e5e7eb",
        lineWidth: 12
      })
    ]
  });

  chartContainer.append(chart);
}

function matrizRiesgo() {
  limpiarGrafico();

  const datos = [
    { pieza: "Meme satírico", dato: 25, emocion: 85 },
    { pieza: "Video falso", dato: 85, emocion: 90 },
    { pieza: "Parodia musical", dato: 30, emocion: 60 },
    { pieza: "Noticia falsa", dato: 90, emocion: 82 },
    { pieza: "Caricatura política", dato: 20, emocion: 65 }
  ];

  const chart = Plot.plot({
    width: 820,
    height: 520,
    marginLeft: 70,
    marginBottom: 70,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {
      label: "Dato verificable",
      domain: [0, 100],
      grid: true
    },
    y: {
      label: "Impacto emocional",
      domain: [0, 100],
      grid: true
    },
    marks: [
      Plot.ruleX([50], { stroke: "#64748b", strokeDasharray: "4 4" }),
      Plot.ruleY([50], { stroke: "#64748b", strokeDasharray: "4 4" }),
      Plot.dot(datos, {
        x: "dato",
        y: "emocion",
        r: 9,
        fill: "#ef4444",
        stroke: "white",
        strokeWidth: 1.5
      }),
      Plot.text(datos, {
        x: "dato",
        y: "emocion",
        text: "pieza",
        dy: -14,
        fill: "#f8fafc",
        lineWidth: 10
      })
    ]
  });

  chartContainer.append(chart);
}

function drag(simulation) {
  return d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

const graficos = [
  graficoTimeline,
  galeriaLego,
  graficoEmociones,
  graficoAlgoritmico,
  graficoRedDistribucion,
  mapaDisputaNarrativa,
  matrizRiesgo
];

let escenaActual = -1;

function activarEscena(index) {
  if (index === escenaActual || !graficos[index]) return;

  escenaActual = index;

  pasos.forEach(paso => paso.classList.remove("activo"));
  pasos[index].classList.add("activo");

  if (rotuloEtapa) rotuloEtapa.textContent = `Escena ${index + 1}`;
  if (rotuloTitulo) rotuloTitulo.textContent = titulos[index];

  if (barraProgreso) {
    barraProgreso.style.width = `${((index + 1) / pasos.length) * 100}%`;
  }

  graficos[index]();
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = pasos.indexOf(entry.target);
        activarEscena(index);
      }
    });
  },
  { threshold: 0.55 }
);

pasos.forEach(paso => observer.observe(paso));

activarEscena(0);

/* ============================================================
   SEGUNDA SECCIÓN: PROPUESTAS Y NARRATIVAS
   ============================================================ */

const pasos2 = Array.from(document.querySelectorAll(".paso-secundario"));
const relato2 = document.querySelector(".relato-secundario");
const barraProgreso2 = document.querySelector("#barra-progreso-2");
const rotuloEtapa2 = document.querySelector("#rotulo-etapa-2");
const rotuloTitulo2 = document.querySelector("#rotulo-titulo-2");
const chartContainer2 = document.querySelector("#observableChart2");

const escenas2 = [
  {id: "vinculantes", etiqueta: "1", titulo: "Propuestas vinculantes vs. narrativas de campaña"},
  {id: "temas-juridicos", etiqueta: "2", titulo: "Los temas jurídicos más sólidos"},
  {id: "tecnico-politico", etiqueta: "3", titulo: "Entre lo técnico y lo político"},
  {id: "diferencias-genero", etiqueta: "4", titulo: "Diferencias discursivas por género"},
  {id: "palabras-dominantes", etiqueta: "5", titulo: "Las palabras que dominaron el discurso"},
  {id: "intencionalidad-discursiva", etiqueta: "6", titulo: "Propuestas e intencionalidad discursiva"}
];

const datos2 = {
  vinculantes: [
    {tipo: "Propuestas reales", porcentaje: 60},
    {tipo: "No vinculantes", porcentaje: 40}
  ],
  temas: [
    {tema: "Derechos constitucionales e igualdad", lda: 21.43, nmf: 4.76},
    {tema: "Mecanismos legales y juicios", lda: 21.43, nmf: 9.52},
    {tema: "Sistema judicial y Federación", lda: 9.52, nmf: 21.43},
    {tema: "Opiniones y percepciones generales", lda: 4.76, nmf: 21.43}
  ],
  nivel: [
    {nivel: "Técnico-normativo", porcentaje: 62.86},
    {nivel: "Sistémico-político", porcentaje: 42.86}
  ],
  genero: {
    nodes: [
      {id: "Discurso judicial", grupo: "centro", size: 50},
      {id: "Justicia social", grupo: "mujeres", size: 30},
      {id: "Equidad", grupo: "mujeres", size: 28},
      {id: "Perspectiva de género", grupo: "mujeres", size: 32},
      {id: "Derechos humanos", grupo: "mujeres", size: 26},
      {id: "Acceso a la justicia", grupo: "mujeres", size: 24},
      {id: "Capacitación", grupo: "mujeres", size: 22},
      {id: "Combate a la corrupción", grupo: "hombres", size: 32},
      {id: "Modernización", grupo: "hombres", size: 28},
      {id: "Transparencia", grupo: "hombres", size: 26},
      {id: "Reforma judicial", grupo: "hombres", size: 30},
      {id: "Eficiencia", grupo: "hombres", size: 24},
      {id: "Estructura", grupo: "hombres", size: 22}
    ],
    links: [
      {source: "Discurso judicial", target: "Justicia social"},
      {source: "Discurso judicial", target: "Equidad"},
      {source: "Discurso judicial", target: "Perspectiva de género"},
      {source: "Discurso judicial", target: "Derechos humanos"},
      {source: "Discurso judicial", target: "Acceso a la justicia"},
      {source: "Discurso judicial", target: "Capacitación"},
      {source: "Discurso judicial", target: "Combate a la corrupción"},
      {source: "Discurso judicial", target: "Modernización"},
      {source: "Discurso judicial", target: "Transparencia"},
      {source: "Discurso judicial", target: "Reforma judicial"},
      {source: "Discurso judicial", target: "Eficiencia"},
      {source: "Discurso judicial", target: "Estructura"}
    ]
  },
  palabras: [
    {palabra: "Justicia", frecuencia: 100},
    {palabra: "Corte", frecuencia: 85},
    {palabra: "Derecho", frecuencia: 78},
    {palabra: "Reforma judicial", frecuencia: 70},
    {palabra: "Poder Judicial", frecuencia: 65},
    {palabra: "Amparo", frecuencia: 42},
    {palabra: "Mujeres", frecuencia: 34},
    {palabra: "Acceso a la justicia", frecuencia: 32},
    {palabra: "Indígenas", frecuencia: 22},
    {palabra: "Discapacidad", frecuencia: 20}
  ]
};

function limpiarGrafico2() {
  if (!chartContainer2) return;
  chartContainer2.innerHTML = "";
}

function graficoVinculantes() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Tipo de propuesta", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Porcentaje (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barY(datos2.vinculantes, {
        x: "tipo",
        y: "porcentaje",
        fill: d => d.tipo === "Vinculantes" ? "#1b75bb" : "#ec4899"
      }),
      Plot.text(datos2.vinculantes, {
        x: "tipo",
        y: "porcentaje",
        text: d => `${d.porcentaje}%`,
        dy: -12,
        fill: "#cbd5e1"
      }),
      Plot.ruleY([0])
    ]
  });
  chartContainer2.append(chart);
}

function graficoTemasJuridicos() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 260,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "12px"
    },
    x: {grid: true, label: "Peso (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos2.temas, {
        y: "tema",
        x: "lda",
        fill: "#1b75bb",
        sort: {y: "x", reverse: true},
        title: "LDA"
      }),
      Plot.barX(datos2.temas, {
        y: "tema",
        x: d => -d.nmf,
        fill: "#652d90",
        title: "NMF"
      }),
      Plot.ruleX([0])
    ]
  });
  chartContainer2.append(chart);
}

function graficoTecnicoPolitico() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 150,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos2.nivel, {
        y: "nivel",
        x: "porcentaje",
        fill: "#1b75bb"
      }),
      Plot.text(datos2.nivel, {
        y: "nivel",
        x: "porcentaje",
        text: d => `${d.porcentaje}%`,
        dx: 8,
        fill: "#cbd5e1"
      })
    ]
  });
  chartContainer2.append(chart);
}

function graficoGenero() {
  limpiarGrafico2();
  
  const width = 650;
  const height = 420;
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  const nodes = datos2.genero.nodes.map(d => ({...d}));
  const links = datos2.genero.links.map(d => ({...d}));
  
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.grupo === "centro" || d.target.grupo === "centro" ? 90 : 130))
    .force("charge", d3.forceManyBody().strength(-260))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(d => {
      if (d.grupo === "mujeres") return width * 0.28;
      if (d.grupo === "hombres") return width * 0.72;
      return width * 0.5;
    }).strength(0.08))
    .force("y", d3.forceY(height / 2).strength(0.04))
    .force("collide", d3.forceCollide(d => d.grupo === "centro" ? 24 : Math.sqrt(d.size) * 3 + 8));
  
  const link = svg.append("g")
    .attr("opacity", 0.22)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "network-link")
    .attr("stroke-width", 1.8);
  
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
    .attr("r", d => {
      if (d.grupo === "centro") return 18;
      return Math.sqrt(d.size) * 3.5;
    })
    .attr("fill", d => {
      if (d.grupo === "centro") return "#fbbf24";
      if (d.grupo === "mujeres") return "#ec4899";
      return "#1b75bb";
    })
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 2);
  
  node.append("text")
    .attr("class", "network-label")
    .attr("font-size", d => d.grupo === "centro" ? "12px" : "11px")
    .attr("font-weight", d => d.grupo === "centro" ? "700" : "500")
    .attr("dy", d => d.grupo === "centro" ? 4 : 4)
    .text(d => d.id)
    .style("pointer-events", "none");
  
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node.attr("transform", d => `translate(${Math.max(40, Math.min(width - 40, d.x))},${Math.max(40, Math.min(height - 40, d.y))})`);
  });
  
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
  
  chartContainer2.append(svg.node());
}

function graficoPalabras() {
  limpiarGrafico2();
  
  const width = 650;
  const height = 420;
  
  // Crear un array único por visualización
  const datosPalabras = datos2.palabras;
  
  // Calcular posiciones circulares
  const root = d3.pack()
    .size([width, height])
    .padding(8)(d3.hierarchy({children: datosPalabras}).sum(d => d.frecuencia));
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  const colorScale = d3.scaleOrdinal()
    .domain(datosPalabras.map(d => d.palabra))
    .range(["#1b75bb", "#652d90", "#ec4899", "#fbbf24", "#1b75bb"]);
  
  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);
  
  leaf.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => colorScale(d.data.palabra))
    .attr("opacity", 0.88)
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 2);
  
  leaf.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.r / 5)
    .selectAll("tspan")
    .data(d => d.data.palabra.split(/\s+/))
    .join("tspan")
    .attr("x", 0)
    .attr("dy", (word, i) => i === 0 ? 0 : "1.1em")
    .attr("font-size", d => "10px")
    .text(d => d)
    .attr("fill", "#fff");
  
  chartContainer2.append(svg.node());
}

function graficoRedIntencionalidad() {
  limpiarGrafico2();

  const width = 650;
  const height = 420;
  const nodes = [
    {id: "Derechos humanos", group: "propuesta", frecuencia: 99},
    {id: "Perspectiva de género", group: "propuesta", frecuencia: 43},
    {id: "Acceso a la justicia", group: "propuesta", frecuencia: 18},
    {id: "Transparencia", group: "propuesta", frecuencia: 13},
    {id: "Capacitación", group: "propuesta", frecuencia: 12},
    {id: "Base humanista", group: "contexto"},
    {id: "Igualdad institucional", group: "contexto"},
    {id: "Víctimas y grupos vulnerables", group: "contexto"},
    {id: "Rendición de cuentas", group: "contexto"},
    {id: "Operadores judiciales", group: "contexto"},
    {id: "Sensibilidad social", group: "intencion"},
    {id: "Criterios de igualdad", group: "intencion"},
    {id: "Justicia inclusiva", group: "intencion"},
    {id: "Honestidad pública", group: "intencion"},
    {id: "Reforma interna", group: "intencion"}
  ];

  const links = [
    {source: "Derechos humanos", target: "Base humanista"},
    {source: "Base humanista", target: "Sensibilidad social"},
    {source: "Perspectiva de género", target: "Igualdad institucional"},
    {source: "Igualdad institucional", target: "Criterios de igualdad"},
    {source: "Acceso a la justicia", target: "Víctimas y grupos vulnerables"},
    {source: "Víctimas y grupos vulnerables", target: "Justicia inclusiva"},
    {source: "Transparencia", target: "Rendición de cuentas"},
    {source: "Rendición de cuentas", target: "Honestidad pública"},
    {source: "Capacitación", target: "Operadores judiciales"},
    {source: "Operadores judiciales", target: "Reforma interna"}
  ];

  const colorScale = d3.scaleOrdinal()
    .domain(["propuesta", "contexto", "intencion"])
    .range(["#1b75bb", "#652d90", "#fbbf24"]);

  const radius = d => d.group === "propuesta" ? Math.sqrt(d.frecuencia || 12) * 4 + 8 : 22;

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");

  const link = svg.append("g")
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", d => colorScale(d.group))
    .attr("stroke", "rgba(255,255,255,0.22)")
    .attr("stroke-width", 2);

  node.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.group === "propuesta" ? 4 : 4)
    .attr("font-size", d => d.group === "propuesta" ? "11px" : "10px")
    .attr("font-weight", d => d.group === "propuesta" ? 700 : 500)
    .attr("fill", "#fff")
    .style("pointer-events", "none")
    .text(d => d.id);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.group === "contexto" && d.target.group === "intencion" ? 140 : 120))
    .force("charge", d3.forceManyBody().strength(-240))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(d => {
      if (d.group === "propuesta") return width * 0.18;
      if (d.group === "contexto") return width * 0.52;
      return width * 0.84;
    }).strength(0.12))
    .force("y", d3.forceY(height / 2).strength(0.08))
    .force("collide", d3.forceCollide(d => radius(d) + 6));

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${Math.max(40, Math.min(width - 40, d.x))},${Math.max(40, Math.min(height - 40, d.y))})`);
  });

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

  chartContainer2.append(svg.node());
}

const funcionesGraficos2 = [
  graficoVinculantes,
  graficoTemasJuridicos,
  graficoTecnicoPolitico,
  graficoGenero,
  graficoPalabras,
  graficoRedIntencionalidad
];

function activarEscena2(index) {
  pasos2.forEach((paso, i) => paso.classList.toggle("activo", i === index));
  
  const escena = escenas2[index] || escenas2[0];
  rotuloEtapa2.textContent = escena.etiqueta;
  rotuloTitulo2.textContent = escena.titulo;
  barraProgreso2.style.width = `${((index + 1) / pasos2.length) * 100}%`;
  
  const funcion = funcionesGraficos2[index] || funcionesGraficos2[0];
  funcion();
}

function actualizarProgreso2() {
  if (!relato2) return;
  
  const inicio = relato2.offsetTop;
  const final = relato2.offsetTop + relato2.offsetHeight - window.innerHeight;
  if (final <= inicio) return;
  
  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(100, Math.max(0, avance * 100));
  barraProgreso2.style.width = `${porcentaje}%`;
}

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = pasos2.indexOf(entry.target);
        if (index >= 0) {
          activarEscena2(index);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.55
  }
);

pasos2.forEach((paso) => observer2.observe(paso));
window.addEventListener("scroll", actualizarProgreso2, { passive: true });

activarEscena2(0);
graficoTimeline();