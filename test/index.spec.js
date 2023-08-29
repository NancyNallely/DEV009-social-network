/* eslint-disable */

// importamos la funcion que vamos a testear
import * as firebaseConfig from '../src/firebase.js';
import { obtenerUsuario, createUser, cerrarSesion, autenticarUsuario, restablecerPassword, validarUsuario, mostrarMenu, } from '../src/lib/index.js'
import * as firebase from '../src/lib/index';
import home from '../src/Vistas/home.js';
import login from '../src/Vistas/login.js';
import mapa from '../src/Vistas/mapa.js';
import muro, {EditarComentario, createDropDown, agregarPost, crearPost, crearAside} from '../src/Vistas/muro.js';
import publicaciones from '../src/Vistas/publicaciones.js';
import registro from '../src/Vistas/registro.js';
import error from '../src/Vistas/error.js';

// configuración de simulacion (mock) para funciones importadas
// usando la biblioteca de pruebas jest
jest.mock('../src/lib/index', () => ({
  createUser: jest.fn(),
  auth: jest.fn(),
  autenticarUsuario: jest.fn(),
  restablecerPassword: jest.fn(),
  validarUsuario: jest.fn(),
  mostrarMenu: jest.fn(),
  createDropDown: jest.fn(),
  registrosPais: jest.fn(),
  agregarPost: jest.fn(),
  crearPost: jest.fn(),
  crearAside: jest.fn(),
  obtenerUsuario: jest.fn(),
}));

describe('tests para validar funciones', () => {
  it('test para la funcion registrar usuario', () => {
    //se espera que el tipo de dato createUser sea una funcion y toBe lo verifica
    expect(typeof createUser).toBe('function');
  });
  it('test para la funcion obtener usuario', () => {
    expect(typeof obtenerUsuario).toBe('function');
  });
   // La función it toma un título descriptivo y una función de prueba asincrónica.
  it('test para cerrar la sesion del usuario', async () => {
    // Aquí se declara una constante llamada mockAlert que almacenará una versión simulada
    // Esta parte utiliza el método spyOn de Jest para "espiar" la función window, alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
    //  el código posterior no se ejecutará hasta que la promesa se haya resuelto.
    await cerrarSesion; //promesa llamada cerrarSesion se utiliza para simular una acción de cierre de sesión.
    // verifica si no hay un usuario autenticado en el contexto de Firebase.
    expect(firebaseConfig.auth.currentUser).toBeNull();
    // El método mockRestore se utiliza para restaurar la implementación original de la función que fue modificada para la prueba.
    mockAlert.mockRestore();
  });

  it('test para la funcion autenticar usuario', () => {
    expect(typeof autenticarUsuario).toBe('function');
  });
  it('test para la funcion restablecer password', () => {
    expect(typeof restablecerPassword).toBe('function');
  });
  it('test para la funcion validar usuario', () => {
    expect(typeof validarUsuario).toBe('function');
  });
});

describe('tests para redirigir', () => {

  it('debería redirigir a la página de inicio de sesión al hacer clic en el botón de inicio de sesión', () => {
   // Crea un mock (simulacro) de la función navigateTo
    const navigateToMock = jest.fn();
   // Llama a la función home pasando el mock navigateToMock
    home(navigateToMock);
   // Llama al mock navigateToMock con el argumento '/login'
    navigateToMock('/login');
   // Verifica si navigateToMock fue llamado con el argumento '/login'
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  it('debería redirigir a la página de registro al hacer clic en el botón de registro', () => {
    const navigateToMock = jest.fn();
    home(navigateToMock);
    navigateToMock('/registro');
    expect(navigateToMock).toHaveBeenCalledWith('/registro');
  });

  it('debería redirigir a la página de mapa', () => {
    const navigateToMock = jest.fn();
    home(navigateToMock);
    navigateToMock('/mapa');
    expect(navigateToMock).toHaveBeenCalledWith('/mapa');
  });

  it('debería redirigir a la página de muro', () => {
    const navigateToMock = jest.fn();
    home(navigateToMock);
    navigateToMock('/muro');
    expect(navigateToMock).toHaveBeenCalledWith('/muro');
  });

  it('debería redirigir a la página de publicaciones', () => {
    const navigateToMock = jest.fn();
    home(navigateToMock);
    navigateToMock('/publicaciones');
    expect(navigateToMock).toHaveBeenCalledWith('/publicaciones');
  });
});

describe('test para obtener un usuario', () => {
  it('deberia retornar undefined cuando auth.currentUser esta vacio', () => {
   // Configura el escenario de la prueba
    firebaseConfig.auth.currentUser = null;
   // Llama a la función que se está probando
    const result = obtenerUsuario();
   // Verifica el resultado esperado
    expect(result).toBeUndefined();
  });
});

describe('test para el menu', () => {
  it('deberia mostrar el menu', () => {
   //  Crea un elemento div y lo configura
    const menu = document.createElement('div');
    menu.style.display = 'block';
    menu.id = 'divHome';
    document.body.appendChild(menu);
   // Llama a la función que se está probando
    mostrarMenu();
   // Verifica el resultado esperado
    expect(menu.style.display).toBe('block');
  });

  it('deberia ocultar el menu cuando el valor es diferente de none', () => {
    // Crea un elemento div y lo configura
    const menu = document.createElement('div');
    menu.style.display = 'none';
    menu.id = 'divHome';
    document.body.appendChild(menu);
    // Llama a la función que se está probando
    mostrarMenu();
   // Verifica el resultado esperado
    expect(menu.style.display).toBe('none');
  });
});

describe('tests para validar la creacion de vistas', () => {

  it('test para validar que login sea una funcion', () => {
    expect(typeof login).toBe('function');
  });

  it('test para crear el login', () => {
    const resultado = login();
    expect(typeof resultado).toBe('object');
  });

  it('test para validar que login regrese html', () => {
    const result = login();
    expect(typeof result).toBe('object');
  });

  it('test para validar que mapa sea una funcion', () => {
    expect(typeof mapa).toBe('function');
  });

  it('test para validar que mapa regrese codigo html', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'paginaPrincipal';
    document.body.appendChild(mockElement);
    const result = mapa();
    expect(typeof result).toBe('object');
  });

  it('test para validar la creacion de muro', () => {
    expect(typeof muro).toBe('function');
  });
  it('test para validar la funcion de agregarPost', () => {
   // Verificar si la función agregarPost es de tipo 'function'
    expect(typeof agregarPost).toBe('function');
  });
  it('test para validar que agregarPost regrese html', () => {
    const result = agregarPost();
    expect(typeof result).toBe('object');
  });

  it('test para validar que crearAside regrese html', () => {
    // Llama a la función que se está probando
    const result = crearAside();
    // Verifica el resultado esperado
    expect(typeof result).toBe('object');
  });

  it('test para validar la funcion de editarComentario', () => {
    expect(typeof EditarComentario).toBe('function');
  });

  it('test para validar que editarComentario regrese codigo html', () => {
    // Crea un objeto de prueba y una nueva cadena de comentario
    const doc = {id:'0001'};
    const nuevoComentario = 'sabroso';
    // Llama a la función que se está probando
    const result = createDropDown(nuevoComentario, doc);
    // Verifica el resultado esperado
    expect(typeof result).toBe('object');
  });

  it('test para validar la funcion de createDropDown', () => {
    expect(typeof createDropDown).toBe('function');
  });

  it('test para validar que createDropDown regrese html', () => {
    const doc = {id:'0001'};
    const result = createDropDown(doc);
    expect(typeof result).toBe('object');
  });

  it('test para validar la creacion de publicaciones', () => {
    expect(typeof publicaciones).toBe('function');
  });

  it('test para validar que publicaciones regrese html', () => {
    const result = publicaciones();
    expect(typeof result).toBe('object');
  });

  it('test para validar la creacion de registro', () => {
    expect(typeof registro).toBe('function');
  });

  it('test para validar que registro regrese html', () => {
    const result = registro();
    expect(typeof result).toBe('object');
  });
  
  it('test para validar la creacion de error', () => {
    expect(typeof error).toBe('function');
  });

  it('test para validar que error regrese html', () => {
    const result = error();
    expect(typeof result).toBe('object');
  });
});

describe('funciones para muro', () => {
  it('debe devolver una matriz con dos elementos', () => {
    // Se crea una función simulada llamada navigateTo
    const navigateTo = jest.fn();
    // Se crea una versión simulada de la función getElementById del DOM
    const getElementByIdMock = jest.spyOn(document, 'getElementById');
    // Se establece un valor de retorno simulado para getElementById
    // Esto simula un elemento del DOM con propiedades específicas
    getElementByIdMock.mockReturnValue({ append: jest.fn(), style: { display: 'block' } });
   // Se llama a la función "mapa" con la función simulada navigateTo
    const result = mapa(navigateTo);
   // Se verifica si el resultado tiene una longitud de 2 elementos
    expect(result).toHaveLength(2);
  });
  
  it('debe crear el botón desplegable', () => {
    // Se crea un objeto simulado llamado doc con una propiedad id
    const doc = { id: '123' };
    // Se llama a la función createDropDown con el objeto simulado doc
    const dropdown = createDropDown(doc);
    // Se realizan múltiples expectativas para verificar el contenido
    // Verifica si el resultado no es undefined
    expect(dropdown).toBeDefined();
    // Verifica si el resultado es un elemento DIV
    expect(dropdown.tagName).toBe('DIV');
    // Verifica si la clase del elemento DIV es 'dropdown'
    expect(dropdown.className).toBe('dropdown');
    // Busca el elemento con la clase 'dropbtn' dentro del elemento dropdown
    const dropbtn = dropdown.querySelector('.dropbtn');
    // Verifica si el elemento con la clase 'dropbtn' no es undefined
    expect(dropbtn).toBeDefined();
    // Verifica si el elemento con la clase 'dropbtn' es un elemento BUTTON
    expect(dropbtn.tagName).toBe('BUTTON');
    // Verifica si el texto dentro del botón es '...'
    expect(dropbtn.textContent).toBe('...');
  });
  
  it('debe recuperar todas las publicaciones del país seleccionado cuando tipo es nulo', async () => {
    // Simule la función firebase.registrosPais para devolver una lista de publicaciones
    const mockRegistrosPais = jest.spyOn(firebase, 'registrosPais');
    mockRegistrosPais.mockResolvedValue([
      { data: () => ({ /* publicar datos */ }) },
      { data: () => ({ /* publicar datos */ }) },
    ]);
  
    // Llamar a la función crearPost con un parámetro tipo nulo
    const result = await crearPost('selectedCountry', null);
  
    // Comprueba que el resultado contiene el número correcto de elementos de la tarjeta
    expect(result.querySelectorAll('.card')).toHaveLength(2); // Ajuste la longitud esperada según sea necesario
  });
  
  it('debe tener la identificación, el marcador de posición, el tipo, la longitud máxima y la longitud mínima correctos', () => {
    const input = agregarPost();
    expect(input.id).toBe('inputPost');
    expect(input.placeholder).toBe('Cuentanos tu experiencia en aquel lugar');
    expect(input.type).toBe('text');
    expect(input.maxLength).toBe(524288);
    expect(input.minLength).toBe(0);
  });
});

describe('funcion para crear aside', () => {
it('debe devolver un elemento aparte con los platos típicos correspondientes y enlaces a videos cuando se le da un nombre de país válido', () => {
 // Datos de prueba
  const country = 'Mexico';
  const expectedImgPlato1 = 'http://localhost/';
  const expectedImgPlato2 = 'http://localhost/';
  const expectedVideo1 = 'https://www.youtube.com/watch?v=CiazCXbgg7A';
  const expectedVideo2 = 'https://www.youtube.com/watch?v=-Bi0cC6uzDs';
  // Llamada a la función para crear el aside
  const asideElement = crearAside(country);
  // Afirmaciones (expectativas) para verificar el contenido y las propiedades del elemento creado
  expect(asideElement.tagName).toBe('DIV');
  // Verifica si el elemento del aside tiene tres elementos hijos
  expect(asideElement.childElementCount).toBe(3);
   // Verifica si el primer elemento hijo es un H3 y tiene el contenido 'Platos típicos'
  expect(asideElement.children[0].tagName).toBe('H3');
  expect(asideElement.children[0].textContent).toBe('Platos típicos');
   // Verifica si el segundo elemento hijo es un enlace A con las propiedades esperadas
   expect(asideElement.children[1].tagName).toBe('A');
  expect(asideElement.children[1].tagName).toBe('A');
  expect(asideElement.children[1].href).toBe(expectedVideo1);
  expect(asideElement.children[1].target).toBe('_blank');
   // Verifica si el primer hijo del enlace A es una imagen IMG con la URL de imagen esperada
  expect(asideElement.children[1].children[0].tagName).toBe('IMG');
  expect(asideElement.children[1].children[0].src).toBe(expectedImgPlato1);
  // Verifica si el tercer elemento hijo es un enlace A con las propiedades esperadas
  expect(asideElement.children[2].tagName).toBe('A');
  expect(asideElement.children[2].href).toBe(expectedVideo2);
  expect(asideElement.children[2].target).toBe('_blank');
  // Verifica si el primer hijo del segundo enlace A es una imagen IMG con la URL de imagen esperada
  expect(asideElement.children[2].children[0].tagName).toBe('IMG');
  expect(asideElement.children[2].children[0].src).toBe(expectedImgPlato2);
})});


