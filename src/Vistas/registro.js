function registro(navigateTo) {
  const pagina = [];
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'Bienvenidos a la ruta del sabor';
  const name = document.createElement('input');
  name.placeholder = 'Nombre';
  const lastname = document.createElement('input');
  lastname.placeholder = 'Apellido';
  const email = document.createElement('input');
  email.placeholder = 'Correo'; // Corregido el nombre de la etiqueta
  const emailagain = document.createElement('input');
  emailagain.placeholder = 'Repetir correo';
  const newpassword = document.createElement('input');
  newpassword.placeholder = 'Nueva contraseña';
  const birthdate = document.createElement('input');
  birthdate.type = 'date'; // Asignar el tipo "date" para el campo de fecha
  birthdate.placeholder = 'Fecha de Nacimiento';
  const button = document.createElement('button');
  button.textContent = 'Registrarse';
  button.id = 'Registrarseboton';
  button.addEventListener('click', () => {
    navigateTo('/mapa');
  });

  section.append(title, name, lastname, email, emailagain, newpassword, birthdate, button);
  section.id = 'registroSection'; // Agregamos un ID al elemento section creado
  pagina.push(section);
  return pagina;
}
export default registro;
