/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore, getDocs, collection, query, where, limit,
} from 'firebase/firestore';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { async } from 'regenerator-runtime';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCOm1Lq2ZR7yLkS5Ro-Urrrbv_XwmP2e1U',
  authDomain: 'la-ruta-del-sabor-21f63.firebaseapp.com',
  projectId: 'la-ruta-del-sabor-21f63',
  storageBucket: 'la-ruta-del-sabor-21f63.appspot.com',
  messagingSenderId: '32749352119',
  appId: '1:32749352119:web:a4975dac4e37f59be80932',
  measurementId: 'G-64X5F0886S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// funcion para autenticar usuarios
export async function autenticar(usuario, password) {
  const consulta = query(collection(db, 'usuarios'), where('usuario', '==', usuario), where('password', '==', password), limit(1));
  const resultado = await getDocs(consulta);
  let datos;
  resultado.forEach((documento) => {
    datos = documento.data();
  });
  return datos;
}

export async function autenticarGoogle() {
  await signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      return result;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return error;
      // ...
    });
}

export async function autenticarUsuarios(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert('Bienvenido(a) ' + user.email);
      setTimeout(function () {
        window.location.href = './mapa';
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

export async function createUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-alert, prefer-template
      alert('Bienvenido(a) ' + user.email);
      // eslint-disable-next-line func-names
      setTimeout(function () {
        window.location.href = './mapa';
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

export async function cerrarSesion() {
  await signOut(auth).then(() => {
    // Cerro sesion satisfactoriamente
    alert('Vuelve pronto');
    setTimeout(function () {
      window.location.href = '/';
    }, 2000);
  }).catch((error) => {
    alert(error);
  });
}

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
