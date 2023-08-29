function error() {
  // Creación de un elemento h2 para mostrar un mensaje de error
  const title = document.createElement('h2');
  // Establecimiento del contenido de texto del elemento h2
  title.textContent = 'Error 404 page no found please go home';
  // Devolución del elemento h2
  return title;
}
export default error;
