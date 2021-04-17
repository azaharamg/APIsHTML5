'use strict';

const handleFileSelected = (e) => {
  e.preventDefault();

  const videoEl = document.getElementById('videoEl');
  const videoOverlayEl = document.getElementById('videoOverlayEl');

  if (!window.File && !window.FileReader) {
    alert('La API de File no la soporta este navegador. Por favor, use otro navegador diferente');
    return;
  }

  /**
   * Obtener el fichero y verificar que la extensión es válida
   */
  let file = null;
  if (e.target.files) {
    // Obtener el fichero mediante el input
    file = e.target.files[0];
  } else if (e.dataTransfer) {
    // Obtener el fichero mediante drag&drop
    file = e.dataTransfer.items[0].getAsFile();
  } else {
    return;
  }

  if (!file.type.match('video.*')) {
    alert(`El fichero ${file.type} no se puede reproducir, sólo se aceptan videos.`);
    return;
  }

  /**
   * Leer y cargar el video
   */
  const reader = new FileReader();
  reader.onload = (e) => {
    // Utilizo el setTimeout para simular que el video carga lento y poder mostrar el loading
    setTimeout(() => {
      const data = e.target.result;
      document.getElementById('videoEl').src = data;

      showVideoInformation(file);

      videoOverlayEl.style.display = 'none';
      videoEl.load();
    }, 1000);
  };
  reader.readAsDataURL(file);

  /**
   * Mostrar loading si el video se está cargando
   */
  if (reader.readyState === 1) {
    videoEl.poster = './images/loading.gif';
    videoOverlayEl.style.display = 'block';
  }
};

/**
 * Mostrar el nombre y tamaño del video que se ha seleccionado
 */
const showVideoInformation = (file) => {
  const selectedFile = document.getElementById('selected-file');
  selectedFile && selectedFile.remove();

  const fileName = document.createElement('p');
  fileName.className = 'drop_container-file';
  fileName.id = 'selected-file';
  const fileNameText = document.createTextNode(`Fichero seleccionado: ${file.name} (${file.size} bytes)`);
  fileName.appendChild(fileNameText);
  const dropContainer = document.getElementById('dropContainerEl');
  dropContainer.appendChild(fileName);
};

/**
 * Subir el video usando drag&drop
 */
const dropHandler = (e) => {
  handleFileSelected(e);
  e.dataTransfer.items ? e.dataTransfer.items.clear() : e.dataTransfer.clearData();
};
const dragOverHandler = (e) => e.preventDefault();
