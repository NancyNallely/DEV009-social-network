/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import * as firebaseConfig from '../src/firebase.js';
import * as firebase from '../src/lib/index.js';
import home, { mostrarMenu } from '../src/Vistas/home.js';

jest.mock('../src/lib/index', () => ({
  createUser: jest.fn(),
  auth: jest.fn(),
}));

describe('funcion para registrar un usuario', () => {
  it('test para la funcion registrar usuario', () => {
    expect(typeof firebase.createUser).toBe('function');
  });
  it('test para cerrar la sesion del usuario', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
    await firebase.cerrarSesion;
    expect(firebaseConfig.auth.currentUser).toBeNull();
    mockAlert.mockRestore();
  });
});

describe('funcion para redirigir', () => {
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

describe('funcion para obtener un usuario', () => {
  it('deberia retornar undefined cuando auth.currentUser esta vacio', () => {
    firebaseConfig.auth.currentUser = null;

    const result = firebase.obtenerUsuario;

    expect(result).toBeUndefined();
  });
});

describe('funcion para abrir el menu', () => {
  it('deberia mostrar el menu', () => {
    // Arrange
    const menu = document.createElement('div');
    menu.style.display = 'block';
    menu.id = 'divHome';
    document.body.appendChild(menu);

    mostrarMenu();

    expect(menu.style.display).toBe('none');
  });
  it('deberia ocultar el menu cuando el valor es diferente es none', () => {
    const menu = document.createElement('div');
    menu.style.display = 'none';
    menu.id = 'divHome';
    document.body.appendChild(menu);

    mostrarMenu();

    expect(menu.style.display).toBe('none');
  });
});
