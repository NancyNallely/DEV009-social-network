import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, signOut,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { auth } from '../firebase.js';

// funcion para registrar usuarios
export async function createUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-alert, prefer-template
      alert('Bienvenido(a) ' + user.email);
      // eslint-disable-next-line func-names
      setTimeout(() => {
        window.location.href = './mapa';
      }, 2000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// funcion para autenticar usuarios
async function autenticarUsuarios(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(`Bienvenido(a) ${user.email}`);
      setTimeout(() => {
        window.location.href = './mapa';
      }, 2000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// funcion para autenticar con google
export async function autenticarGoogle() {
  await signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const user = result.user;
      alert(`Bienvenido ${user.displayName}`);
      setTimeout(() => {
        window.location.href = './mapa';
      }, 2000);
    }).catch((error) => {
      const errorMessage = error.message;
      alert(`Ha ocurrido un error: ${errorMessage}`);
    });
}

// funcion para restaurar contraseña
export async function restaurarPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('se ha enviado un correo con el enlace para restablecer la contraseña');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// funcion para cerrar sesion
export async function cerrarSesion() {
  await signOut(auth).then(() => {
    // Cerro sesion satisfactoriamente
    alert('Vuelve pronto');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }).catch((error) => {
    alert(error);
  });
}

function validarUsuario(usuario) {
  // Expresión regular para validar el formato de un correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Comprueba si el correo coincide con el formato esperado
  if (regex.test(usuario)) {
    return true; // El correo es válido
  }
  alert('El correo electrónico ingresado no tiene un formato válido.'); // Muestra un mensaje de alerta
  return false; // El correo no es válido
}

// funcion para autenticar usuarios y validad su informacion
export function autenticarUsuario() {
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('contraseña').value;
  let mensaje = '';
  if (usuario === '') {
    mensaje += 'ingrese su usuario ';
  } else {
    validarUsuario(usuario);
  }
  if (password === '') {
    mensaje += 'ingrese su contraseña';
  }
  if (mensaje !== '') {
    alert(mensaje);
  }

  if (usuario !== '' && password !== '') {
    autenticarUsuarios(usuario, password);
  }
}

// funcion para restablecer password
export function restablecerPassword() {
  const email = prompt('Ingrese su email');
  restaurarPassword(email);
}

// funcion para registrar usuarios y validar la informacion
export async function registrarUsuarios() {
  const usuario = document.getElementById('email').value;
  const password = document.getElementById('contraseña').value;

  let mensaje = '';
  if (usuario === '') {
    mensaje += 'ingrese su usuario ';
  } else {
    validarUsuario(usuario);
  }
  if (password === '') {
    mensaje += 'ingrese su contraseña';
  }
  if (mensaje !== '') {
    alert(mensaje);
  }
  if (usuario !== '' && password !== '') {
    createUser(usuario, password);
  }
}
