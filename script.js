import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";
const pasos = [...document.querySelectorAll(".paso")];
const relato = document.querySelector(".relato");
const lienzo = document.querySelector("#lienzo");
const barraProgreso = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");

const titulos = {
  territorio: ["Escena 1", "Ubicar el territorio"],
  cambio: ["Escena 2", "Mostrar el cambio"],
  contraste: ["Escena 3", "Comparar casos"],
  detalle: ["Escena 4", "Acercarse al detalle"]
};

function activarPaso(pasoActivo) {
  pasos.forEach((paso) => paso.classList.toggle("activo", paso === pasoActivo));

  const escena = pasoActivo.dataset.escena;
  const [etapa, titulo] = titulos[escena];

  lienzo.dataset.escena = escena;
  rotuloEtapa.textContent = etapa;
  rotuloTitulo.textContent = titulo;
}

function actualizarProgreso() {
  const inicio = relato.offsetTop;
  const final = relato.offsetTop + relato.offsetHeight - window.innerHeight;
  if (final <= inicio) return;

  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(100, Math.max(0, avance * 100));

  barraProgreso.style.width = `${porcentaje}%`;
}

const observador = new IntersectionObserver(
  (entradas) => {
    const visible = entradas
      .filter((entrada) => entrada.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      activarPaso(visible.target);
    }
  },
  {
    root: null,
    threshold: [0.35, 0.5, 0.65]
  }
);

pasos.forEach((paso) => observador.observe(paso));
window.addEventListener("scroll", actualizarProgreso, { passive: true });
window.addEventListener("resize", actualizarProgreso);

activarPaso(pasos[0]);
actualizarProgreso();
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";

const chartContainer = document.querySelector("#observableChart");
const pasos = document.querySelectorAll(".paso");
const barra = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");

const conectividad = [
  {region: "Norte", valor: 82},
  {region: "Centro", valor: 76},
  {region: "Occidente", valor: 69},
  {region: "Sur", valor: 58},
  {region: "Sureste", valor: 54}
];

const crecimiento = [
  {mes: "Ene", usuarios: 4200},
  {mes: "Feb", usuarios: 5100},
  {mes: "Mar", usuarios: 6200},
  {mes: "Abr", usuarios: 7100},
  {mes: "May", usuarios: 8500},
  {mes: "Jun", usuarios: 9300},
  {mes: "Jul", usuarios: 10400},
  {mes: "Ago", usuarios: 11300},
  {mes: "Sep", usuarios: 12450}
];

const plataformas = [
  {tipo: "Redes sociales", valor: 35},
  {tipo: "Educación", valor: 22},
  {tipo: "Comercio", valor: 18},
  {tipo: "Trámites", valor: 15},
  {tipo: "Entretenimiento", valor: 10}
];

function limpiarGrafico() {
  chartContainer.innerHTML = "";
}

function graficoBarras() {
  limpiarGrafico();

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Región"},
    y: {grid: true, label: "Conectividad (%)"},
    marks: [
      Plot.barY(conectividad, {
        x: "region",
        y: "valor",
        fill: "#38bdf8"
      }),
      Plot.ruleY([0])
    ]
  });

  chartContainer.append(chart);
}

function graficoLinea() {
  limpiarGrafico();

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Mes"},
    y: {grid: true, label: "Usuarios"},
    marks: [
      Plot.lineY(crecimiento, {
        x: "mes",
        y: "usuarios",
        stroke: "#a78bfa",
        strokeWidth: 4
      }),
      Plot.dot(crecimiento, {
        x: "mes",
        y: "usuarios",
        fill: "#a78bfa",
        r: 5
      })
    ]
  });

  chartContainer.append(chart);
}

function graficoPlataformas() {
  limpiarGrafico();

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 150,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)"},
    y: {label: null},
    marks: [
      Plot.barX(plataformas, {
        y: "tipo",
        x: "valor",
        fill: "#22c55e",
        sort: {y: "x", reverse: true}
      }),
      Plot.text(plataformas, {
        y: "tipo",
        x: "valor",
        text: d => d.valor + "%",
        dx: 18,
        fill: "white"
      })
    ]
  });

  chartContainer.append(chart);
}

function graficoDispositivos() {
  limpiarGrafico();

  const datos = [
    {uso: "Acceso diario", movil: 88, computadora: 55},
    {uso: "Educación", movil: 64, computadora: 80},
    {uso: "Comercio", movil: 72, computadora: 68},
    {uso: "Trámites", movil: 58, computadora: 76}
  ];

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 110,
    style: {
      background: "transparent",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)"},
    y: {label: null},
    color: {legend: true},
    marks: [
      Plot.barX(datos, {
        y: "uso",
        x: "movil",
        fill: "#38bdf8"
      }),
      Plot.dot(datos, {
        y: "uso",
        x: "computadora",
        fill: "#c084fc",
        r: 7
      })
    ]
  });

  chartContainer.append(chart);
}

const graficos = [
  graficoBarras,
  graficoLinea,
  graficoPlataformas,
  graficoDispositivos
];

const titulos = [
  "Conectividad digital",
  "Crecimiento mensual",
  "Uso de plataformas",
  "Comparación por dispositivo"
];

let escenaActual = 0;

function activarEscena(index) {
  escenaActual = index;

  pasos.forEach(paso => paso.classList.remove("activo"));
  pasos[index].classList.add("activo");

  rotuloEtapa.textContent = `Escena ${index + 1}`;
  rotuloTitulo.textContent = titulos[index];

  barra.style.width = `${((index + 1) / pasos.length) * 100}%`;

  graficos[index]();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = [...pasos].indexOf(entry.target);
      activarEscena(index);
    }
  });
}, {
  threshold: 0.55
});

pasos.forEach(paso => observer.observe(paso));

activarEscena(0);

const chartContainer = document.querySelector("#observableChart");

const conectividad = [
  {region: "Norte", valor: 82},
  {region: "Centro", valor: 76},
  {region: "Occidente", valor: 69},
  {region: "Sur", valor: 58},
  {region: "Sureste", valor: 54}
];

function graficoBarras() {
  chartContainer.innerHTML = "";

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "transparent",
      color: "#e5e7eb"
    },
    x: {label: "Región"},
    y: {grid: true, label: "Conectividad (%)"},
    marks: [
      Plot.barY(conectividad, {
        x: "region",
        y: "valor",
        fill: "#38bdf8"
      }),
      Plot.ruleY([0])
    ]
  });

  chartContainer.append(chart);
}

graficoBarras();