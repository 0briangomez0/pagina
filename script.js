const materias = [
  { id: "M0175", nombre: "Intro. a la Lengua Inglesa" },
  { id: "L0038", nombre: "Intro. a los Estudios del Leng. y la Comunicación" },
  { id: "F0016", nombre: "Intro. a la Filosofía" },
  { id: "L0039", nombre: "Intro. a la Literatura" },
  { id: "L0007", nombre: "Lit. Argentina I", req: ["L0038", "F0016", "L0039"] },
  { id: "L0008", nombre: "Lit. Argentina II", req: ["L0038", "F0016", "L0039"] },
  { id: "L0031", nombre: "Lit. Latinoamericana I", req: ["L0038", "F0016", "L0039"] },
  { id: "L0032", nombre: "Lit. Latinoamericana II", req: ["L0038", "F0016", "L0039"] },
  { id: "M0015", nombre: "Lengua Inglesa 1", req: ["M0175"] },
  { id: "M0011", nombre: "Fonética y Fonología 1", req: ["M0175"] },
  { id: "M0013", nombre: "Gramática Inglesa 1", req: ["M0175"] },
  { id: "M0031", nombre: "Téc. de Expresión en Castellano", req: ["L0038"] },
  { id: "M0012", nombre: "Fonética y Fonología 2", req: ["M0011", "M0015"] },
  { id: "M0014", nombre: "Gramática Inglesa 2", req: ["M0013"] },
  { id: "M0016", nombre: "Lengua Inglesa 2", req: ["M0011", "M0015"] },
  { id: "M0022", nombre: "Gramática Comparada", req: ["L0038", "M0014"] },
  { id: "L0003", nombre: "Lingüística", req: ["L0038", "M0031", "M0014"] },
  { id: "M0021", nombre: "Hist. Lengua Inglesa", req: ["F0016", "L0039", "M0014"] },
  { id: "M0028", nombre: "Lit. Inglesa Contemp.", req: ["F0016", "L0039", "M0015"] },
  { id: "M0017", nombre: "Lengua Inglesa 3", req: ["M0012", "M0016"] },
  { id: "M0024", nombre: "Dicción Inglesa 1", req: ["M0012"] },
  { id: "M0019", nombre: "Lit. EE.UU.", req: ["M0021"] },
  { id: "M0020", nombre: "Cult. y Civilización Inglesa", req: ["F0016", "L0039", "M0016"] },
  { id: "M0018", nombre: "Lengua Inglesa 4", req: ["M0024", "M0017"] },
  { id: "M0027", nombre: "Lit. Clásica y Moderna", req: ["M0020"] },
  { id: "M0029", nombre: "Lit. Medieval y Renacentista", req: ["M0021"] },
  // Agrega más materias si deseas
];

const aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia";
    div.id = m.id;

    const titulo = document.createElement("div");
    titulo.textContent = m.nombre;

    const btn = document.createElement("button");
    btn.textContent = "Aprobar";
    btn.disabled = !puedeAprobar(m);
    btn.onclick = () => aprobar(m.id);

    div.appendChild(titulo);
    div.appendChild(btn);
    contenedor.appendChild(div);
  });
}

function puedeAprobar(materia) {
  if (!materia.req) return true;
  return materia.req.some(id => aprobadas.has(id));
}

function aprobar(id) {
  aprobadas.add(id);
  document.getElementById(id).querySelector("button").disabled = true;
  actualizarBotones();
}

function actualizarBotones() {
  materias.forEach(m => {
    const btn = document.getElementById(m.id).querySelector("button");
    if (!aprobadas.has(m.id) && puedeAprobar(m)) {
      btn.disabled = false;
    }
  });
}

crearMalla();
