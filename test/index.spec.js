/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import { auth } from '../src/firebase.js';
import { createUser, cerrarSesion } from '../src/lib/index';

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
    // Crear un objeto de navegación simulado (mock)
    const navigateToMock = jest.fn();

    // Llamar a la función home pasando el navigateToMock como argumento
    const section = home(navigateToMock);

    // Obtener el botón de inicio de sesión
    const logInButton = section.querySelector('.boton-login');

    // Crear una función simulada para el evento de clic
    const clickEvent = new Event('click');

    // Simular clic en el botón de inicio de sesión
    logInButton.dispatchEvent(clickEvent);

    // Verificar que navigateTo se llamó con la ruta "/login"
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  it('debería redirigir a la página de registro al hacer clic en el botón de registro', () => {
    // Crear un objeto de navegación simulado (mock)
    const navigateToMock = jest.fn();

    // Llamar a la función home pasando el navigateToMock como argumento
    const section = home(navigateToMock);

    // Obtener el botón de registro
    const registerButton = section.querySelector('.boton-registro');

    // Crear una función simulada para el evento de clic
    const clickEvent = new Event('click');

    // Simular clic en el botón de registro
    registerButton.dispatchEvent(clickEvent);

    // Verificar que navigateTo se llamó con la ruta "/register"
    expect(navigateToMock).toHaveBeenCalledWith('/register');
  });
});
