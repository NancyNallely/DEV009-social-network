function login(navigateTo) {
  const section = document.createElement('section');
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const title = document.createElement('h1');
  const inputUsuario = document.createElement('input');
  const inputContraseña = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const pagina = [];

  logo.src = './imagenes/logo.jpg';
  logo.id = 'logoLogin';
  title.textContent = 'Un mundo de sabores a un clic de distancia';
  title.id = 'titleLogin';
  inputUsuario.placeholder = 'escribe tu usuario';
  inputUsuario.id = 'usuario';
  inputUsuario.className = 'ingreso';
  inputContraseña.placeholder = 'escribe tu contraseña';
  inputContraseña.id = 'contraseña';
  inputContraseña.className = 'ingreso';
  div.id = 'divLogin';

  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'botonLogin';
  buttonLogin.className = 'ingreso';
  buttonLogin.addEventListener('click', () => {
    navigateTo('mapa.js');
  });
  section.append(logo);
  div.append(title, inputUsuario, inputContraseña, buttonLogin);
  pagina.push(section, div);
  return pagina;
}

export default login;
