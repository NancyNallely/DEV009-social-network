/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
// importar desde la clase de firebase
import {
  auth, db, storage, ref, uploadBytes, getDownloadURL, addDoc, collection, where,
  query, getDocs, doc, updateDoc, increment, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail,
  signOut, browserPopupRedirectResolver, deleteDoc,
} from '../firebase.js';

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
  await signInWithPopup(auth, new GoogleAuthProvider(), browserPopupRedirectResolver)
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
// funcion para validar usuario
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

// funcion para autenticar usuarios y validar su informacion
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

// funcion para obtener el usuario que se encuentra logueado
export function obtenerUsuario() {
  const usuario = auth.currentUser;
  if (usuario !== null) {
    return usuario.email;
  }
  return null;
}

// funcion para subir una publicacion a firestore
export async function guardarRegistros(formulario, foto, usuario) {
  try {
    const docRef = await addDoc(collection(db, 'publicacionesMuros'), {
      nombreLugar: formulario[1].value,
      tipo: formulario[3].value,
      pais: formulario[2].value,
      servicio: formulario[4].value,
      precio: formulario[5].value,
      nivelPicante: formulario[6].value,
      comentario: formulario[7].value,
      foto,
      usuario,
      likes: 0,
    });
    console.log(docRef);
    return true;
  } catch (e) {
    return false;
  }
}

// funcion para guardar imagen
export function guardarImg(archivo, nombreArchivo) {
  const storageRef = ref(storage, nombreArchivo);

  uploadBytes(storageRef, archivo).then((snapshot) => {
    console.log('se subio la imagen', snapshot);
  });
}

// funcion para obtener el enlace de la imagen
export async function getImgUrl(archivo, nombreArchivo) {
  await guardarImg(archivo, nombreArchivo);
  getDownloadURL(ref(storage, nombreArchivo))
    .then((url) => {
      localStorage.setItem('imgUrl', url);
    })
    .catch((error) => {
      console.log(error.errorMessage);
    });
}

// funcion para buscar los registros por pais
export async function registrosPais(pais) {
  const q = query(collection(db, 'publicacionesMuros'), where('pais', '==', pais));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
}

// funcion para obtener registros por tipo de lugar
export async function registrosTipo(tipo, pais) {
  const q = query(collection(db, 'publicacionesMuros'), where('pais', '==', pais), where('tipo', '==', tipo));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
}

// funcion para incrementar el numero de likes
export async function aumentoLikes(id) {
  const refPublicaciones = doc(db, 'publicacionesMuros', id);
  await updateDoc(refPublicaciones, {
    likes: increment(1),
  });
}
// funcion para buscar//
export async function buscar(collectionToSearch, buscartodo) {
  return collectionToSearch.filter((item) => item.toLowerCase().includes(buscartodo.toLowerCase()));
}

// Función para eliminar un documento
export async function docDelete(docId) {
  try {
    const result = await deleteDoc(doc (db, 'publicacionesMuros', docId));
  } catch (error) {
    alert(error);
  }
}
