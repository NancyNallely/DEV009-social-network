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