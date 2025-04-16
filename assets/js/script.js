const tablero = document.getElementById("tablero");

let orientacionVertical = true; // true = vertical, false = horizontal


// Crea el tablero 10x10
for (let fila = 0; fila < 10; fila++) {
  for (let col = 0; col < 10; col++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.dataset.x = col;
    celda.dataset.y = fila;
    celda.style.position = "relative"; // importante para posicionar la imagen dentro

    // Permitir soltar piezas
    celda.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necesario para permitir drop
    });

    celda.addEventListener("drop", (e) => {
      e.preventDefault();
      const piezaId = e.dataTransfer.getData("text");
      const pieza = document.getElementById(piezaId);
      const startX = parseInt(celda.dataset.x);
      const startY = parseInt(celda.dataset.y);
      const longitud = obtenerLongitudPieza(piezaId);
    
      let puedeColocar = true;
    
      // Validar límites del tablero
      if (orientacionVertical && startY + longitud > 10) return alert("¡No puedes colocar la nave fuera del tablero!");
      if (!orientacionVertical && startX + longitud > 10) return alert("¡No puedes colocar la nave fuera del tablero!");
    
      // Verificar si las celdas están libres
      for (let i = 0; i < longitud; i++) {
        const x = orientacionVertical ? startX : startX + i;
        const y = orientacionVertical ? startY + i : startY;
        const index = y * 10 + x;
        const targetCell = tablero.children[index];
        if (targetCell.classList.contains("ocupado")) {
          puedeColocar = false;
          break;
        }
      }
    
      if (!puedeColocar) return alert("¡Ya hay una pieza en ese espacio!");
    
      // Marcar celdas como ocupadas
      for (let i = 0; i < longitud; i++) {
        const x = orientacionVertical ? startX : startX + i;
        const y = orientacionVertical ? startY + i : startY;
        const index = y * 10 + x;
        const targetCell = tablero.children[index];
        targetCell.classList.add("ocupado");
        targetCell.style.backgroundColor = "#444";
      }
    
      // Clonar la imagen y ajustar según orientación
      const imagen = pieza.querySelector("img").cloneNode(true);
      imagen.style.position = "absolute";
      imagen.style.top = "0";
      imagen.style.left = "0";
      imagen.style.zIndex = "5";
      imagen.style.transformOrigin = "top left";
      imagen.style.transform = orientacionVertical ? "rotate(0deg)" : "rotate(90deg)";
      imagen.draggable = false;
    
      if (orientacionVertical) {
        imagen.style.height = `${longitud * 40}px`;
        imagen.style.width = "40px";
      } else {
        imagen.style.width = `${longitud * 40}px`;
        imagen.style.height = "40px";
      }
    
      celda.appendChild(imagen);
      pieza.style.display = "none";
    });
    

    tablero.appendChild(celda);
  }
}

// Determina cuántas celdas ocupa cada nave
function obtenerLongitudPieza(piezaId) {
  switch (piezaId) {
    case "piezaXL":
      return 5;
    case "piezaL":
      return 4;
    case "piezaM":
      return 3;
    case "piezaS":
      return 2;
    default:
      return 0;
  }
}

// Habilita drag
const piezas = document.querySelectorAll(".pieza");
piezas.forEach(pieza => {
  pieza.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", pieza.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    orientacionVertical = !orientacionVertical;
    console.log("Orientación:", orientacionVertical ? "Vertical" : "Horizontal");

    const piezas = document.querySelectorAll(".pieza");
    piezas.forEach(pieza => {
      if (orientacionVertical) {
        pieza.classList.remove("rotada");
      } else {
        pieza.classList.add("rotada");
      }
    });
  }
});
