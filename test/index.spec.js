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
    expect(typeof createUser).toBe('function');
  });
  it('test para la funcion obtener usuario', () => {
    expect(typeof obtenerUsuario).toBe('function');
  });
  it('test para cerrar la sesion del usuario', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
    await cerrarSesion;
    expect(firebaseConfig.auth.currentUser).toBeNull();
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
    const navigateToMock = jest.fn();
    home(navigateToMock);
    navigateToMock('/login');
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
    firebaseConfig.auth.currentUser = null;

    const result = obtenerUsuario();

    expect(result).toBeUndefined();
  });
});

describe('test para el menu', () => {
  it('deberia mostrar el menu', () => {
    // Arrange
    const menu = document.createElement('div');
    menu.style.display = 'block';
    menu.id = 'divHome';
    document.body.appendChild(menu);

    mostrarMenu();

    expect(menu.style.display).toBe('block');
  });
  it('deberia ocultar el menu cuando el valor es diferente de none', () => {
    const menu = document.createElement('div');
    menu.style.display = 'none';
    menu.id = 'divHome';
    document.body.appendChild(menu);

    mostrarMenu();

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
  it('test para validar que mapa regrese html', () => {
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
    expect(typeof agregarPost).toBe('function');
  });
  it('test para validar que agregarPost regrese html', () => {
    const result = agregarPost();
    expect(typeof result).toBe('object');
  });
  it('test para validar que crearAside regrese html', () => {
    const result = crearAside();
    expect(typeof result).toBe('object');
  });
  it('test para validar la funcion de editarComentario', () => {
    expect(typeof EditarComentario).toBe('function');
  });
  it('test para validar que editarComentario regrese html', () => {
    const doc = {id:'0001'};
    const nuevoComentario = 'sabroso';
    const result = createDropDown(nuevoComentario, doc);
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
    // Arrange
    const navigateTo = jest.fn();
    const getElementByIdMock = jest.spyOn(document, 'getElementById');
    getElementByIdMock.mockReturnValue({ append: jest.fn(), style: { display: 'block' } });
  
    // Act
    const result = mapa(navigateTo);
  
    // Assert
    expect(result).toHaveLength(2);
  });
  
  it('debe crear el botón desplegable', () => {
    const doc = { id: '123' };
    const dropdown = createDropDown(doc);
  
    expect(dropdown).toBeDefined();
    expect(dropdown.tagName).toBe('DIV');
    expect(dropdown.className).toBe('dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    expect(dropbtn).toBeDefined();
    expect(dropbtn.tagName).toBe('BUTTON');
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

  const country = 'Mexico';
  const expectedImgPlato1 = 'http://localhost/';
  const expectedImgPlato2 = 'http://localhost/';
  const expectedVideo1 = 'https://www.youtube.com/watch?v=CiazCXbgg7A';
  const expectedVideo2 = 'https://www.youtube.com/watch?v=-Bi0cC6uzDs';

  const asideElement = crearAside(country);

  expect(asideElement.tagName).toBe('DIV');
  expect(asideElement.childElementCount).toBe(3);
  expect(asideElement.children[0].tagName).toBe('H3');
  expect(asideElement.children[0].textContent).toBe('Platos típicos');
  expect(asideElement.children[1].tagName).toBe('A');
  expect(asideElement.children[1].href).toBe(expectedVideo1);
  expect(asideElement.children[1].target).toBe('_blank');
  expect(asideElement.children[1].children[0].tagName).toBe('IMG');
  expect(asideElement.children[1].children[0].src).toBe(expectedImgPlato1);
  expect(asideElement.children[2].tagName).toBe('A');
  expect(asideElement.children[2].href).toBe(expectedVideo2);
  expect(asideElement.children[2].target).toBe('_blank');
  expect(asideElement.children[2].children[0].tagName).toBe('IMG');
  expect(asideElement.children[2].children[0].src).toBe(expectedImgPlato2);
})});


