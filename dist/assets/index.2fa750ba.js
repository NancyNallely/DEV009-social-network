import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const vistas = "";
const firebaseConfig = {
  apiKey: "AIzaSyCOm1Lq2ZR7yLkS5Ro-Urrrbv_XwmP2e1U",
  authDomain: "la-ruta-del-sabor-21f63.firebaseapp.com",
  projectId: "la-ruta-del-sabor-21f63",
  storageBucket: "la-ruta-del-sabor-21f63.appspot.com",
  messagingSenderId: "32749352119",
  appId: "1:32749352119:web:a4975dac4e37f59be80932",
  measurementId: "G-64X5F0886S"
};
const app = initializeApp(firebaseConfig);
getFirestore(app);
const auth = getAuth();
function mostrarMenu$3() {
  const menu = document.getElementById("divHome");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function home(navigateTo2) {
  const barraNav = document.createElement("nav");
  const logo = document.createElement("img");
  const div = document.createElement("div");
  const bienvenida = document.createElement("h1");
  const registro2 = document.createElement("a");
  const ingreso = document.createElement("a");
  const menu = document.createElement("a");
  const barrasMenu = document.createElement("i");
  const main = document.createElement("main");
  const intro = document.createElement("p");
  const pagina = [];
  barraNav.id = "barraNav";
  logo.src = "./imagenes/logo.jpg";
  logo.id = "logohome";
  main.id = "mainHome";
  div.id = "divHome";
  menu.classList.add("icon", "btnMenu");
  barrasMenu.classList.add("fa", "fa-bars");
  menu.appendChild(barrasMenu);
  menu.addEventListener("click", mostrarMenu$3);
  bienvenida.textContent = "BIENVENIDO(A)";
  bienvenida.className = "Bienvenida";
  registro2.textContent = "Registrarse";
  registro2.addEventListener("click", () => {
    navigateTo2("/registro");
  });
  ingreso.textContent = "Ingresar";
  ingreso.addEventListener("click", () => {
    navigateTo2("/Login");
  });
  intro.textContent = "Visitas M\xE9xico, Colombia o Per\xFA pronto. Aqui podr\xE1s encontrar recomendaciones para comer seg\xFAn tu presupuesto y tambi\xE9n compartirnos tus experiencias propias.";
  div.append(registro2, ingreso);
  barraNav.append(bienvenida, div, menu, logo);
  main.append(intro);
  pagina.push(barraNav);
  pagina.push(main);
  return pagina;
}
async function createUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    alert("Bienvenido(a) " + user.email);
    setTimeout(() => {
      window.location.href = "./mapa";
    }, 2e3);
  }).catch((error2) => {
    const errorMessage = error2.message;
    alert(errorMessage);
  });
}
async function autenticarUsuarios(email, password) {
  await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    alert(`Bienvenido(a) ${user.email}`);
    setTimeout(() => {
      window.location.href = "./mapa";
    }, 2e3);
  }).catch((error2) => {
    const errorMessage = error2.message;
    alert(errorMessage);
  });
}
async function autenticarGoogle() {
  await signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
    const user = result.user;
    alert(`Bienvenido ${user.displayName}`);
    setTimeout(() => {
      window.location.href = "./mapa";
    }, 2e3);
  }).catch((error2) => {
    const errorMessage = error2.message;
    alert(`Ha ocurrido un error: ${errorMessage}`);
  });
}
async function restaurarPassword(email) {
  sendPasswordResetEmail(auth, email).then(() => {
    alert("se ha enviado un correo con el enlace para restablecer la contrase\xF1a");
  }).catch((error2) => {
    const errorMessage = error2.message;
    alert(errorMessage);
  });
}
async function cerrarSesion() {
  await signOut(auth).then(() => {
    alert("Vuelve pronto");
    setTimeout(() => {
      window.location.href = "/";
    }, 2e3);
  }).catch((error2) => {
    alert(error2);
  });
}
function validarUsuario(usuario) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(usuario)) {
    return true;
  }
  alert("El correo electr\xF3nico ingresado no tiene un formato v\xE1lido.");
  return false;
}
function autenticarUsuario() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("contrase\xF1a").value;
  let mensaje = "";
  if (usuario === "") {
    mensaje += "ingrese su usuario ";
  } else {
    validarUsuario(usuario);
  }
  if (password === "") {
    mensaje += "ingrese su contrase\xF1a";
  }
  if (mensaje !== "") {
    alert(mensaje);
  }
  if (usuario !== "" && password !== "") {
    autenticarUsuarios(usuario, password);
  }
}
function restablecerPassword() {
  const email = prompt("Ingrese su email");
  restaurarPassword(email);
}
async function registrarUsuarios() {
  const usuario = document.getElementById("email").value;
  const password = document.getElementById("contrase\xF1a").value;
  let mensaje = "";
  if (usuario === "") {
    mensaje += "ingrese su usuario ";
  } else {
    validarUsuario(usuario);
  }
  if (password === "") {
    mensaje += "ingrese su contrase\xF1a";
  }
  if (mensaje !== "") {
    alert(mensaje);
  }
  if (usuario !== "" && password !== "") {
    createUser(usuario, password);
  }
}
function login() {
  const section = document.createElement("section");
  const logo = document.createElement("img");
  const div = document.createElement("div");
  const title = document.createElement("h1");
  const inputUsuario = document.createElement("input");
  const inputContrase\u00F1a = document.createElement("input");
  const buttonLogin = document.createElement("button");
  const spanGoogle = document.createElement("span");
  const imagenGoogle = document.createElement("i");
  const spanOlvido = document.createElement("span");
  const olvidoPassword = document.createElement("a");
  const pagina = [];
  logo.src = "./imagenes/logo.jpg";
  logo.id = "logoLogin";
  title.textContent = "Un mundo de sabores a un clic de distancia";
  title.id = "titleLogin";
  inputUsuario.placeholder = "escribe tu usuario";
  inputUsuario.id = "usuario";
  inputUsuario.className = "ingreso";
  inputContrase\u00F1a.placeholder = "escribe tu contrase\xF1a";
  inputContrase\u00F1a.type = "password";
  inputContrase\u00F1a.id = "contrase\xF1a";
  inputContrase\u00F1a.className = "ingreso";
  spanGoogle.textContent = "Ingresa con Google";
  spanGoogle.id = "google";
  imagenGoogle.className = "fa fa-google";
  imagenGoogle.addEventListener("click", autenticarGoogle);
  div.id = "divLogin";
  olvidoPassword.textContent = "\xBFOlvidaste tu contrase\xF1a?";
  olvidoPassword.addEventListener("click", restablecerPassword);
  div.id = "divLogin";
  buttonLogin.textContent = "INGRESAR";
  buttonLogin.id = "botonLogin";
  buttonLogin.className = "ingreso";
  buttonLogin.addEventListener("click", autenticarUsuario);
  section.append(logo);
  spanGoogle.append(imagenGoogle);
  spanOlvido.append(olvidoPassword);
  div.append(title, inputUsuario, inputContrase\u00F1a, buttonLogin, spanGoogle, spanOlvido);
  pagina.push(section, div);
  return pagina;
}
function error() {
  const title = document.createElement("h2");
  title.textContent = "Error 404 page no found please go home";
  return title;
}
function mapa(navigateTo2) {
  const paginaPrincipal = document.getElementById("paginaPrincipal");
  const section = document.createElement("section");
  const buttonMexico = document.createElement("button");
  buttonMexico.id = "buttonMexico";
  const buttonPeru = document.createElement("button");
  buttonPeru.id = "buttonPeru";
  const buttonColombia = document.createElement("button");
  buttonColombia.id = "buttonColombia";
  const buttonCerrarSesion = document.createElement("button");
  const title = document.createElement("h1");
  const mapas = document.createElement("img");
  const pagina = [];
  paginaPrincipal.id = "paginaprincipalmapa";
  section.id = "mapasection";
  title.textContent = "Selecciona tu pa\xEDs de destino";
  buttonMexico.textContent = "M\xE9xico";
  buttonPeru.textContent = "Per\xFA";
  buttonColombia.textContent = "Colombia";
  buttonCerrarSesion.textContent = "Cerrar Sesi\xF3n";
  buttonCerrarSesion.addEventListener("click", cerrarSesion);
  buttonMexico.addEventListener("click", () => {
    paginaPrincipal.id = "paginaPrincipal";
    navigateTo2("/mexico");
  });
  buttonColombia.addEventListener("click", () => {
    paginaPrincipal.id = "paginaPrincipal";
    navigateTo2("/colombia");
  });
  buttonPeru.addEventListener("click", () => {
    paginaPrincipal.id = "paginaPrincipal";
    navigateTo2("/peru");
  });
  mapas.src = "./imagenes/logo.jpg";
  section.append(title, mapas, buttonMexico, buttonPeru, buttonColombia);
  paginaPrincipal.append(section);
  pagina.push(buttonCerrarSesion, section);
  return pagina;
}
function registro() {
  const pagina = [];
  const section = document.createElement("section");
  section.id = "registroSection";
  const title = document.createElement("h2");
  title.textContent = "Bienvenidos a la ruta del sabor";
  const name = document.createElement("input");
  name.placeholder = "Nombre";
  const lastname = document.createElement("input");
  lastname.placeholder = "Apellido";
  const email = document.createElement("input");
  email.id = "email";
  email.placeholder = "Correo";
  const emailagain = document.createElement("input");
  emailagain.placeholder = "Repetir correo";
  const newpassword = document.createElement("input");
  newpassword.id = "contrase\xF1a";
  newpassword.placeholder = "Nueva contrase\xF1a";
  const birthdate = document.createElement("input");
  birthdate.type = "date";
  birthdate.placeholder = "Fecha de Nacimiento";
  const button = document.createElement("button");
  button.textContent = "Registrarse";
  button.id = "Registrarseboton";
  button.type = "button";
  button.addEventListener("click", registrarUsuarios);
  section.append(title, name, lastname, email, emailagain, newpassword, birthdate, button);
  pagina.push(section);
  return pagina;
}
function mostrarMenu$2() {
  const menu = document.getElementById("divHome");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function crearPost$2() {
  const card = document.createElement("div");
  card.className = "card";
  const cardContent = document.createElement("div");
  cardContent.className = "cardContent";
  const cardTitulo = document.createElement("h3");
  cardTitulo.className = "cardTitulo";
  const cardFigure = document.createElement("figure");
  cardFigure.className = "cardFigure";
  const cardImage = document.createElement("img");
  cardImage.src = "../imagenes/to.png";
  cardImage.alt = "comida";
  cardImage.className = "cardImage";
  const imageCaption = document.createElement("figcaption");
  imageCaption.textContent = "La casa de to\xF1o";
  cardFigure.append(cardImage, imageCaption);
  const cardComentario = document.createElement("p");
  cardComentario.textContent = "Es muy buena comida, me gusto mucho, pica poco y sabe bien";
  cardContent.append(cardTitulo, cardFigure, cardComentario);
  const cardCalificacion = document.createElement("div");
  cardCalificacion.className = "cardCalificacion";
  const cardPrecio = document.createElement("p");
  cardPrecio.textContent = "Precio";
  const cardServicio = document.createElement("p");
  cardServicio.textContent = "Servicio";
  const cardPicante = document.createElement("p");
  cardPicante.textContent = "Picante";
  cardCalificacion.append(cardPrecio, cardServicio, cardPicante);
  card.append(cardContent, cardCalificacion);
  return card;
}
function agregarPost$2() {
  const informacion = document.createElement("input");
  informacion.id = "inputPost";
  informacion.placeholder = "Cuentanos tu experiencia en aquel lugar";
  return informacion;
}
function crearAside$2() {
  const divAside = document.createElement("div");
  const tituloAside = document.createElement("h3");
  tituloAside.textContent = "Platos tipicos";
  const imgAside1 = document.createElement("img");
  imgAside1.src = "../imagenes/pozole.png";
  const imgAside2 = document.createElement("img");
  imgAside2.src = "../imagenes/mole.png";
  divAside.append(tituloAside, imgAside1, imgAside2);
  return divAside;
}
function mexico(navigateTo2) {
  const barraNav = document.createElement("nav");
  const title = document.createElement("h1");
  const logo = document.createElement("img");
  const div = document.createElement("div");
  const deLujo = document.createElement("a");
  const paraTodos = document.createElement("a");
  const cocinaEconomica = document.createElement("a");
  const promociones = document.createElement("a");
  const perfil = document.createElement("a");
  const buscar = document.createElement("a");
  const inicio = document.createElement("a");
  const cerrarSesion$1 = document.createElement("a");
  const menu = document.createElement("a");
  const barrasMenu = document.createElement("i");
  const main = document.createElement("main");
  const aside = document.createElement("aside");
  const pagina = [];
  barraNav.id = "barraNav";
  logo.src = "../imagenes/mexicoLogo.png";
  logo.id = "logohome";
  main.id = "mainHome";
  aside.id = "aside";
  div.id = "divHome";
  title.textContent = "M\xC9XICO";
  deLujo.textContent = "DE LUJO";
  paraTodos.textContent = "PARA TODOS";
  cocinaEconomica.textContent = "COCINA ECONOMICA";
  promociones.textContent = "PROMOCIONES";
  perfil.textContent = "PERFIL";
  buscar.textContent = "BUSCAR";
  inicio.textContent = "INICIO";
  cerrarSesion$1.textContent = "CERRAR SESI\xD3N";
  cerrarSesion$1.addEventListener("click", cerrarSesion);
  inicio.addEventListener("click", () => {
    navigateTo2("/mapa");
  });
  menu.classList.add("icon", "btnMenu");
  barrasMenu.classList.add("fa", "fa-bars");
  menu.appendChild(barrasMenu);
  menu.addEventListener("click", mostrarMenu$2);
  div.append(deLujo, paraTodos, cocinaEconomica, promociones, perfil, buscar, inicio, cerrarSesion$1);
  barraNav.append(title, logo, div, menu);
  main.append(crearPost$2());
  aside.append(crearAside$2());
  pagina.push(barraNav, aside, agregarPost$2(), main);
  return pagina;
}
function mostrarMenu$1() {
  const menu = document.getElementById("divHome");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function crearPost$1() {
  const card = document.createElement("div");
  card.className = "card";
  const cardContent = document.createElement("div");
  cardContent.className = "cardContent";
  const cardTitulo = document.createElement("h3");
  cardTitulo.className = "cardTitulo";
  const cardFigure = document.createElement("figure");
  cardFigure.className = "cardFigure";
  const cardImage = document.createElement("img");
  cardImage.src = "../imagenes/guacamola.png";
  cardImage.alt = "comida";
  cardImage.className = "cardImage";
  const imageCaption = document.createElement("figcaption");
  imageCaption.textContent = "Anima";
  cardFigure.append(cardImage, imageCaption);
  const cardComentario = document.createElement("p");
  cardComentario.textContent = "Es muy buena comida, me gusto mucho, pica poco y sabe bien";
  cardContent.append(cardTitulo, cardFigure, cardComentario);
  const cardCalificacion = document.createElement("div");
  cardCalificacion.className = "cardCalificacion";
  const cardPrecio = document.createElement("p");
  cardPrecio.textContent = "Precio";
  const cardServicio = document.createElement("p");
  cardServicio.textContent = "Servicio";
  const cardPicante = document.createElement("p");
  cardPicante.textContent = "Picante";
  cardCalificacion.append(cardPrecio, cardServicio, cardPicante);
  card.append(cardContent, cardCalificacion);
  return card;
}
function agregarPost$1() {
  const informacion = document.createElement("input");
  informacion.id = "inputPost";
  informacion.placeholder = "Cuentanos tu experiencia en aquel lugar";
  return informacion;
}
function crearAside$1() {
  const divAside = document.createElement("div");
  const tituloAside = document.createElement("h3");
  tituloAside.textContent = "Platos tipicos";
  const imgAside1 = document.createElement("img");
  imgAside1.src = "../imagenes/colombiaC.png";
  const imgAside2 = document.createElement("img");
  imgAside2.src = "../imagenes/colombiaH.png";
  divAside.append(tituloAside, imgAside1, imgAside2);
  return divAside;
}
function colombia(navigateTo2) {
  const barraNav = document.createElement("nav");
  const title = document.createElement("h1");
  const logo = document.createElement("img");
  const div = document.createElement("div");
  const deLujo = document.createElement("a");
  const paraTodos = document.createElement("a");
  const cocinaEconomica = document.createElement("a");
  const promociones = document.createElement("a");
  const perfil = document.createElement("a");
  const buscar = document.createElement("a");
  const inicio = document.createElement("a");
  const cerrarSesion$1 = document.createElement("a");
  const menu = document.createElement("a");
  const barrasMenu = document.createElement("i");
  const main = document.createElement("main");
  const aside = document.createElement("aside");
  const pagina = [];
  barraNav.id = "barraNav";
  logo.src = "../imagenes/colLogo.png";
  logo.id = "logohome";
  main.id = "mainHome";
  aside.id = "aside";
  div.id = "divHome";
  title.textContent = "COLOMBIA";
  deLujo.textContent = "DE LUJO";
  paraTodos.textContent = "PARA TODOS";
  cocinaEconomica.textContent = "COCINA ECONOMICA";
  promociones.textContent = "PROMOCIONES";
  perfil.textContent = "PERFIL";
  buscar.textContent = "BUSCAR";
  inicio.textContent = "INICIO";
  cerrarSesion$1.textContent = "CERRAR SESI\xD3N";
  cerrarSesion$1.addEventListener("click", cerrarSesion);
  inicio.addEventListener("click", () => {
    navigateTo2("/mapa");
  });
  menu.classList.add("icon", "btnMenu");
  barrasMenu.classList.add("fa", "fa-bars");
  menu.appendChild(barrasMenu);
  menu.addEventListener("click", mostrarMenu$1);
  div.append(deLujo, paraTodos, cocinaEconomica, promociones, perfil, buscar, inicio, cerrarSesion$1);
  barraNav.append(title, logo, div, menu);
  main.append(crearPost$1());
  aside.append(crearAside$1());
  pagina.push(barraNav, aside, agregarPost$1(), main);
  return pagina;
}
function mostrarMenu() {
  const menu = document.getElementById("divHome");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
function crearPost() {
  const card = document.createElement("div");
  card.className = "card";
  const cardContent = document.createElement("div");
  cardContent.className = "cardContent";
  const cardTitulo = document.createElement("h3");
  cardTitulo.className = "cardTitulo";
  const cardFigure = document.createElement("figure");
  cardFigure.className = "cardFigure";
  const cardImage = document.createElement("img");
  cardImage.src = "../imagenes/peru3.png";
  cardImage.alt = "comida";
  cardImage.className = "cardImage";
  const imageCaption = document.createElement("figcaption");
  imageCaption.textContent = "Lima 700";
  cardFigure.append(cardImage, imageCaption);
  const cardComentario = document.createElement("p");
  cardComentario.textContent = "Es muy buena comida, me gusto mucho, pica poco y sabe bien";
  cardContent.append(cardTitulo, cardFigure, cardComentario);
  const cardCalificacion = document.createElement("div");
  cardCalificacion.className = "cardCalificacion";
  const cardPrecio = document.createElement("p");
  cardPrecio.textContent = "Precio";
  const cardServicio = document.createElement("p");
  cardServicio.textContent = "Servicio";
  const cardPicante = document.createElement("p");
  cardPicante.textContent = "Picante";
  cardCalificacion.append(cardPrecio, cardServicio, cardPicante);
  card.append(cardContent, cardCalificacion);
  return card;
}
function agregarPost() {
  const informacion = document.createElement("input");
  informacion.id = "inputPost";
  informacion.placeholder = "Cuentanos tu experiencia en aquel lugar";
  return informacion;
}
function crearAside() {
  const divAside = document.createElement("div");
  const tituloAside = document.createElement("h3");
  tituloAside.textContent = "Platos tipicos";
  const imgAside1 = document.createElement("img");
  imgAside1.src = "../imagenes/peru1.png";
  const imgAside2 = document.createElement("img");
  imgAside2.src = "../imagenes/peru2.png";
  divAside.append(tituloAside, imgAside1, imgAside2);
  return divAside;
}
function peru(navigateTo2) {
  const barraNav = document.createElement("nav");
  const title = document.createElement("h1");
  const logo = document.createElement("img");
  const div = document.createElement("div");
  const deLujo = document.createElement("a");
  const paraTodos = document.createElement("a");
  const cocinaEconomica = document.createElement("a");
  const promociones = document.createElement("a");
  const perfil = document.createElement("a");
  const buscar = document.createElement("a");
  const inicio = document.createElement("a");
  const cerrarSesion$1 = document.createElement("a");
  const menu = document.createElement("a");
  const barrasMenu = document.createElement("i");
  const main = document.createElement("main");
  const aside = document.createElement("aside");
  const pagina = [];
  barraNav.id = "barraNav";
  logo.src = "../imagenes/peruLogo.png";
  logo.id = "logohome";
  main.id = "mainHome";
  aside.id = "aside";
  div.id = "divHome";
  title.textContent = "PER\xDA";
  deLujo.textContent = "DE LUJO";
  paraTodos.textContent = "PARA TODOS";
  cocinaEconomica.textContent = "COCINA ECONOMICA";
  promociones.textContent = "PROMOCIONES";
  perfil.textContent = "PERFIL";
  buscar.textContent = "BUSCAR";
  inicio.textContent = "INICIO";
  cerrarSesion$1.textContent = "CERRAR SESI\xD3N";
  cerrarSesion$1.addEventListener("click", cerrarSesion);
  inicio.addEventListener("click", () => {
    navigateTo2("/mapa");
  });
  menu.classList.add("icon", "btnMenu");
  barrasMenu.classList.add("fa", "fa-bars");
  menu.appendChild(barrasMenu);
  menu.addEventListener("click", mostrarMenu);
  div.append(deLujo, paraTodos, cocinaEconomica, promociones, perfil, buscar, inicio, cerrarSesion$1);
  barraNav.append(title, logo, div, menu);
  main.append(crearPost());
  aside.append(crearAside());
  pagina.push(barraNav, aside, agregarPost(), main);
  return pagina;
}
const root = document.getElementById("root");
const routes = [
  { path: "/", vista: home },
  { path: "/Login", vista: login },
  { path: "/error", vista: error },
  { path: "/mapa", vista: mapa },
  { path: "/registro", vista: registro },
  { path: "/mexico", vista: mexico },
  { path: "/colombia", vista: colombia },
  { path: "/peru", vista: peru }
];
const defaultRoute = "/";
function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.vista) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path
    );
    if (root.firstChild) {
      while (root.firstChild) {
        root.removeChild(root.lastChild);
      }
    }
    root.append(...route.vista(navigateTo));
  } else {
    navigateTo("/error");
  }
}
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
navigateTo(window.location.pathname || defaultRoute);
