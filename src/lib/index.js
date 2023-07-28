export function crearModal() {
  const div = document.createElement('div');
  div.id = 'openModal';
  div.className = 'modalDialog';
  const divModal = document.createElement('div');
  const a = document.createElement('a');
  a.href = '#close';
  a.title = 'Close';
  a.className = 'close';
  a.textContent = 'X';
  const h2 = document.createElement('h2');
  h2.id = 'tituloModal';
  h2.textContent = 'encabezado';
  const p = document.createElement('p');
  p.id = 'mensajeModal';
  p.textContent = 'mensaje';
  divModal.append(a, h2, p);
  div.appendChild(divModal);
  return div;
}

