import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";

const pasos = Array.from(document.querySelectorAll(".paso"));
const relato = document.querySelector(".relato");
const barraProgreso = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");
const chartContainer = document.querySelector("#observableChart");

const escenas = [
  {id: "territorio", etiqueta: "Escena 1", titulo: "Conectividad digital"},
  {id: "cambio", etiqueta: "Escena 2", titulo: "Crecimiento mensual"},
  {id: "contraste", etiqueta: "Escena 3", titulo: "Uso de plataformas"},
  {id: "detalle", etiqueta: "Escena 4", titulo: "Comparación por dispositivo"}
];

const datos = {
  conectividad: [
    {region: "Norte", valor: 82},
    {region: "Centro", valor: 76},
    {region: "Occidente", valor: 69},
    {region: "Sur", valor: 58},
    {region: "Sureste", valor: 54}
  ],
  crecimiento: [
    {mes: "Ene", usuarios: 4200},
    {mes: "Feb", usuarios: 5100},
    {mes: "Mar", usuarios: 6200},
    {mes: "Abr", usuarios: 7100},
    {mes: "May", usuarios: 8500},
    {mes: "Jun", usuarios: 9300},
    {mes: "Jul", usuarios: 10400},
    {mes: "Ago", usuarios: 11300},
    {mes: "Sep", usuarios: 12450}
  ],
  plataformas: [
    {tipo: "Redes sociales", valor: 35},
    {tipo: "Educación", valor: 22},
    {tipo: "Comercio", valor: 18},
    {tipo: "Trámites", valor: 15},
    {tipo: "Entretenimiento", valor: 10}
  ],
  dispositivos: [
    {uso: "Acceso diario", movil: 88, computadora: 55},
    {uso: "Educación", movil: 64, computadora: 80},
    {uso: "Comercio", movil: 72, computadora: 68},
    {uso: "Trámites", movil: 58, computadora: 76}
  ]
};

function limpiarGrafico() {
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
}

function graficoBarras() {
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
    x: {label: "Región", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Conectividad (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barY(datos.conectividad, {
        x: "region",
        y: "valor",
        fill: "#60a5fa"
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
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Mes", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Usuarios", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.lineY(datos.crecimiento, {
        x: "mes",
        y: "usuarios",
        stroke: "#8b5cf6",
        strokeWidth: 4
      }),
      Plot.dot(datos.crecimiento, {
        x: "mes",
        y: "usuarios",
        fill: "#7c3aed",
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
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos.plataformas, {
        y: "tipo",
        x: "valor",
        fill: "#8b5cf6",
        sort: {y: "x", reverse: true}
      }),
      Plot.text(datos.plataformas, {
        y: "tipo",
        x: "valor",
        text: d => `${d.valor}%`,
        dx: 18,
        fill: "#cbd5e1"
      })
    ]
  });

  chartContainer.append(chart);
}

function graficoDispositivos() {
  limpiarGrafico();

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 110,
    style: {
      background: "none",
      color: "#f8fafc",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)", tickColor: "#e2e8f0", labelColor: "#e2e8f0"},
    y: {label: "Dispositivo", tickColor: "#e2e8f0", labelColor: "#e2e8f0"},
    marks: [
      Plot.barX(datos.dispositivos, {
        y: "uso",
        x: "movil",
        fill: "#38bdf8"
      })
    ]
  });

  chartContainer.append(chart);
}

const funcionesGraficos = [
  graficoBarras,
  graficoLinea,
  graficoPlataformas,
  graficoDispositivos
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
