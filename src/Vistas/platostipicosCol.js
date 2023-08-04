// function crearCarta(plato) {
//     const carta = document.createElement('div');
//     carta.className = 'carta';
//     const imagen = document.createElement('img');
//     imagen.src = plato.imagen;
//     const titulo = document.createElement('h4');
//     titulo.textContent = "Bandeja paisa"
//     carta.append(titulo,imagen);
//     carta.addEventListener('click', () => {
//     mostrarMasInformacion(plato);
//     });
//     return carta;
//   }
//   function mostrarPlatosTipicos() {
//     const contenedorPlatos = document.getElementById('platos-tipicos');
//     platosTipicos.forEach((plato) => {
//       const carta = crearCarta(plato);
//       contenedorPlatos.append(carta);
//     });
//   }
//   mostrarPlatosTipicos();
//   export default platosTipicosCol;
