const tablero = document.getElementById("tablero");

for (let fila = 0; fila < 10; fila++) {
  for (let col = 0; col < 10; col++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.dataset.x = col;
    celda.dataset.y = fila;
    tablero.appendChild(celda);
  }
}

const piezas = document.querySelectorAll(".pieza");

piezas.forEach(pieza => {
  pieza.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id); // Guardamos el id de la pieza arrastrada
  });
});
