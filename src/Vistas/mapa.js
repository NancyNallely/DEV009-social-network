function mapa(navigateTo) {
  const videoPrincipal = document.getElementById('videoPrincipal');
  const paginaPrincipal = document.getElementById('paginaPrincipal');
  const section = document.createElement('section');
  const buttonMexico = document.createElement('button');
  const buttonPeru = document.createElement('button');
  const buttonColombia = document.createElement('button');
  const buttonCerrarSesion = document.createElement('button');
  const title = document.createElement('h1');
  const mapas = document.createElement('img');
  const pagina = [];

  title.textContent = 'Selecciona tu país de destino';
  buttonMexico.textContent = 'México';
  buttonPeru.textContent = 'Perú';
  buttonColombia.textContent = 'Colombia';
  buttonCerrarSesion.textContent = 'Cerrar Sesión';
  buttonCerrarSesion.addEventListener('click', () => {
    navigateTo('/');
  });
  buttonMexico.addEventListener('click', () => {
    navigateTo('/mexico');
  });
  mapas.src = './imagenes/logo.jpg';

  if (videoPrincipal) {
    videoPrincipal.remove();
  }
  paginaPrincipal.className = 'fondoMapa';

  section.append(buttonMexico, buttonPeru, buttonColombia, buttonCerrarSesion, mapas, title);
  pagina.push(section);
  return pagina;
}

export default mapa;
