function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function home(navigateTo) {
  const bodyPrincipal = document.getElementById('bodyPrincipal');
  const videoPrincipal = document.createElement('video');
  const source = document.createElement('source');
  // Obtener referencia al elemento nav
  const barraNav = document.createElement('nav');
  // Crear los elementos de la navegación
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const bienvenida = document.createElement('h1');
  const registro = document.createElement('a');
  const ingreso = document.createElement('a');
  const menu = document.createElement('a');
  const barrasMenu = document.createElement('i');

  const main = document.createElement('main');
  const intro = document.createElement('p');
  const pagina = [];

  videoPrincipal.id = 'videoPrincipal';
  videoPrincipal.setAttribute('autoplay', 'autoplay');
  videoPrincipal.setAttribute('loop', 'true');
  videoPrincipal.setAttribute('muted', 'muted');
  source.src = './imagenes/fondoComida.mp4';
  source.type = 'video/mp4';

  barraNav.id = 'barraNav';
  logo.src = './imagenes/logo.jpg';
  logo.id = 'logo';
  main.id = 'mainHome';
  div.id = 'divHome';

  menu.href = 'javascript:void(0);';
  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', mostrarMenu);

  bienvenida.textContent = 'BIENVENIDO(A)';
  bienvenida.className = 'bienvenida';
  registro.textContent = 'Registrarse';
  registro.addEventListener('click', () => {
    navigateTo('/registro');
  });
  
  ingreso.textContent = 'Ingresar';
  ingreso.addEventListener('click', () => {
    navigateTo('/Login');
  });

  videoPrincipal.append(source);
  bodyPrincipal.append(videoPrincipal);
  intro.textContent = 'Visitas México, Colombia o Perú pronto. Aqui podrás encontrar recomendaciones para comer según tu presupuesto y también compartirnos tus experiencias propias.';
  div.append(registro, ingreso);
  barraNav.append(logo, bienvenida, div, menu);
  main.append(intro);
  pagina.push(barraNav);
  pagina.push(main);
  return pagina;
}

export default home;
