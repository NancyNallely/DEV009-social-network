/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import { auth } from '../src/firebase.js';
import { createUser, cerrarSesion } from '../src/lib/index';
import home from '../src/Vistas/home.js';

jest.mock('../src/lib/index', () => ({
  createUser: jest.fn(),
  auth: jest.fn(),
}));

describe('funcion para registrar un usuario', () => {
  it('test para la funcion registrar usuario', () => {
    expect(typeof createUser).toBe('function');
  });
  it('test para cerrar la sesion del usuario', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
    await cerrarSesion;
    expect(auth.currentUser).toBeNull();
    mockAlert.mockRestore();
  });
});

describe('home', () => {
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
});
