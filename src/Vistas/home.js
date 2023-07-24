function home(navigateTo) {
  // Obtener referencia al elemento nav
  const barraNav = document.createElement('nav');
  // Crear los elementos de la navegación
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const bienvenida = document.createElement('h1');
  const registro = document.createElement('a');
  const ingreso = document.createElement('a');

  const main = document.createElement('main');
  const intro = document.createElement('p');
  const pagina = [];

  barraNav.id = 'barraNav';
  logo.src = './imagenes/logo.jpg';
  logo.id = 'logo';
  main.id = 'mainHome';
  div.id = 'divHome';
  bienvenida.textContent = 'BIENVENIDO(A)';
  bienvenida.className = 'bienvenida';
  registro.textContent = 'Registrarse';
  ingreso.textContent = 'Ingresar';
  ingreso.addEventListener('click', () => {
    navigateTo('/Login');
  });

  intro.textContent = 'Visitas México, Colombia o Perú pronto. Aqui podrás encontrar recomendaciones para comer según tu presupuesto y también compartirnos tus experiencias propias.';
  div.append(registro, ingreso);
  barraNav.append(logo, bienvenida, div);
  main.append(intro);
  pagina.push(barraNav);
  pagina.push(main);
  return pagina;
}

export default home;
