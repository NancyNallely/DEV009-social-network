/* eslint-disable import/no-unresolved */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  limit,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';
// otras importaciones...
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
export const db = getFirestore(app);
export const auth = getAuth();

export const storage = getStorage();
export {
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  collection,
  getDocs,
  query,
  where,
};

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
