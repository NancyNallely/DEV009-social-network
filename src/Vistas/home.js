function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function home(navigateTo) {
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

  barraNav.id = 'barraNav';
  logo.src = './imagenes/logo.jpg';
  logo.id = 'logohome';
  main.id = 'mainHome';
  div.id = 'divHome';

  menu.href = 'javascript:void(0);';
  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', mostrarMenu);

  bienvenida.textContent = 'BIENVENIDO(A)';
  bienvenida.className = 'Bienvenida';
  registro.textContent = 'Registrarse';
  registro.addEventListener('click', () => {
    navigateTo('/registro');
  });
  
  ingreso.textContent = 'Ingresar';
  ingreso.addEventListener('click', () => {
    navigateTo('/Login');
  });

  intro.textContent = 'Visitas México, Colombia o Perú pronto. Aqui podrás encontrar recomendaciones para comer según tu presupuesto y también compartirnos tus experiencias propias.';
  div.append(registro, ingreso);
  barraNav.append( bienvenida, div, menu,logo);
  main.append(intro);
  pagina.push(barraNav);
  pagina.push(main);
  return pagina;
}

export default home;
