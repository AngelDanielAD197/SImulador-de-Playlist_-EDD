// =========================================================================
// 1. DEFINICIÓN DEL CATÁLOGO ACADÉMICO (20 CANCIONES)
// =========================================================================
const GENEROS_NOMBRES = ["URBANO", "POP", "KPOP", "R&B 80s"];

const CATALOGO_COMPLETO = [
  { id: 0, title: "All The Way Live", artist: "Metro Boomin, Future", genero: 0, file: "audio/All The Way Live.mp3", img: "img/P1.jpeg", gif: "gifs/SPI.gif", streams: "142M" },
  { id: 1, title: "Andrea", artist: "Bad Bunny, Buscabulla", genero: 0, file: "audio/andrea.mp3", img: "img/P2.jpg", gif: "gifs/playa.gif", streams: "285M" },
  { id: 2, title: "All Night Long", artist: "Mary Janes", genero: 3, file: "audio/ANL.mp3", img: "img/P3.jpeg", gif: "gifs/Ciudad.gif", streams: "98M" },
  { id: 3, title: "Body to Body", artist: "BTS", genero: 2, file: "audio/BTB.mp3", img: "img/P4.jpeg", gif: "gifs/BT.webp", streams: "45M" },
  { id: 4, title: "Call Me", artist: "Go West", genero: 3, file: "audio/CM.mp3", img: "img/P5.jpeg", gif: "gifs/Ciudad.gif", streams: "120M" },
  { id: 5, title: "EoO", artist: "Bad Bunny", genero: 0, file: "audio/EoO.mp3", img: "img/P6.jpeg", gif: "gifs/EoO.gif", streams: "67M" },
  { id: 6, title: "Feeling Lucky", artist: "Jackson Wang & BIBI", genero: 2, file: "audio/FL.mp3", img: "img/P7.jpeg", gif: "gifs/rosas.gif", streams: "210M" },
  { id: 7, title: "Handlebars", artist: "Jennie & Dualipa", genero: 2, file: "audio/HD.mp3", img: "img/P8.jpeg", gif: "gifs/HB.gif", streams: "180M" },
  { id: 8, title: "Hummingbird", artist: "Metro Boomin & James Blake", genero: 1, file: "audio/HMB.mp3", img: "img/P9.jpeg", gif: "gifs/200.webp", streams: "92M" },
  { id: 9, title: "Dont Go Insane", artist: "DPR IAN", genero: 1, file: "audio/IAN.mp3", img: "img/P10.jpeg", gif: "gifs/ian.gif", streams: "115M" },
  { id: 10, title: "Lemon Drop", artist: "ATEEZ", genero: 2, file: "audio/LD.mp3", img: "img/P11.jpeg", gif: "gifs/LD.gif", streams: "450M" },
  { id: 11, title: "Love Me Again", artist: "V", genero: 2, file: "audio/LMA.mp3", img: "img/P12.png", gif: "gifs/LM.gif", streams: "380M" },
  { id: 12, title: "Matilda", artist: "Harry Styles", genero: 1, file: "audio/Matilda.mp3", img: "img/P13.jpeg", gif: "gifs/MT.gif", streams: "310M" },
  { id: 13, title: "Otra Noche en Miami", artist: "Bad Bunny", genero: 0, file: "audio/ONEM.mp3", img: "img/P14.jpeg", gif: "gifs/miami.gif", streams: "520M" },
  { id: 14, title: "Out of Touch", artist: "Daryl Hall & John Oates", genero: 3, file: "audio/OT.mp3", img: "img/P15.jpeg", gif: "gifs/VC.gif", streams: "34M" },
  { id: 15, title: "Satellite", artist: "Harry Styles", genero: 1, file: "audio/Satelite.mp3", img: "img/P13.jpeg", gif: "gifs/201.webp", streams: "290M" },
  { id: 16, title: "Self Control", artist: "Laura Branigan", genero: 3, file: "audio/SC2.mp3", img: "img/P16.jpeg", gif: "gifs/VC2.gif", streams: "175M" },
  { id: 17, title: "Sin Contrato", artist: "Maluma", genero: 0, file: "audio/SC.mp3", img: "img/P17.jpeg", gif: "img/P17.jpeg", streams: "680M" },
  { id: 18, title: "Tip Toe", artist: "HYBS", genero: 1, file: "audio/Tip.mp3", img: "img/P18.jpeg", gif: "gifs/203.webp", streams: "58M" },
  { id: 19, title: "You Rock My World", artist: "Michael Jackson", genero: 1, file: "audio/YRMW.mp3", img: "img/P19.jpeg", gif: "img/P19.jpeg", streams: "420M" }
];

let playlistsGuardadas = [];
let playlistActiva = [];
let indicePistaActual = 0;

const audio = document.getElementById('localAudio');
const botonReproducir = document.getElementById('playBtn');
const barraProgreso = document.getElementById('seekBar');
const elementoTiempoActual = document.getElementById('currentTime');
const elementoDuracion = document.getElementById('duration');
const elementoTituloPista = document.getElementById('trackTitle');
const elementoArtistaPista = document.getElementById('trackArtist');
const elementoTituloFooter = document.getElementById('footerTitle');
const elementoArtistaFooter = document.getElementById('footerArtist');
const miniaturaFooter = document.getElementById('footerThumbIcon');
const listaPistasContenedor = document.getElementById('listaPistas');
const bibliotecaLateralContenedor = document.getElementById('sidebarBiblioteca');
const encabezadoTituloPlaylist = document.getElementById('playlistTitleHeader');
const gifCanvas = document.getElementById('canvasGif');

const atributoArtista = document.getElementById('attrArtist');
const atributoGenero = document.getElementById('attrGenre');
const atributoDuracion = document.getElementById('attrDuration');
const atributoStreams = document.getElementById('attrStreams');

document.addEventListener("DOMContentLoaded", () => {
  inicializarSelectorCanciones();
});

// =========================================================================
// 2. GESTIÓN DE PESTAÑAS
// =========================================================================
function cambiarPestana(pestana) {
  const vistaCrear = document.getElementById('vistaCrear');
  const vistaInicio = document.getElementById('vistaInicio');
  const vistaAmigos = document.getElementById('vistaAmigos');
  const iconosNavegacion = document.querySelectorAll('.danyfest-sidebar .nav-icono');

  iconosNavegacion.forEach(icon => icon.classList.remove('active'));

  if (pestana === 'crear') {
    if (vistaCrear) vistaCrear.style.display = 'flex';
    if (vistaInicio) vistaInicio.style.display = 'none';
    if (vistaAmigos) vistaAmigos.style.display = 'none';
    if (iconosNavegacion[0]) iconosNavegacion[0].classList.add('active');
  } else if (pestana === 'inicio') {
    if (vistaCrear) vistaCrear.style.display = 'none';
    if (vistaInicio) vistaInicio.style.display = 'flex';
    if (vistaAmigos) vistaAmigos.style.display = 'none';
    if (iconosNavegacion[1]) iconosNavegacion[1].classList.add('active');
  } else if (pestana === 'amigos') {
    if (vistaCrear) vistaCrear.style.display = 'none';
    if (vistaInicio) vistaInicio.style.display = 'none';
    if (vistaAmigos) vistaAmigos.style.display = 'flex';
    if (iconosNavegacion[2]) iconosNavegacion[2].classList.add('active');
    renderizarPlaylistsGuardadas();
  }
}

// =========================================================================
// 3. CREACIÓN Y REGISTRO DE PLAYLISTS
// =========================================================================
function inicializarSelectorCanciones() {
  const contenedorSelector = document.getElementById('selectorCancionesCatalogo');
  if (!contenedorSelector) return;
  contenedorSelector.innerHTML = '';
  
  CATALOGO_COMPLETO.forEach((cancion, indice) => {
    const etiqueta = document.createElement('label');
    etiqueta.style.cssText = "display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #cbd5e1; cursor: pointer;";
    etiqueta.innerHTML = `<input type="checkbox" value="${indice}" class="chk-cancion" style="accent-color: #00f2fe;"> ${cancion.title} — <span style="color: #94a3b8;">${cancion.artist}</span> [${GENEROS_NOMBRES[cancion.genero]}]`;
    contenedorSelector.appendChild(etiqueta);
  });
}

function guardarPlaylistCliente() {
  const inputNombre = document.getElementById('inputNombrePlaylist');
  const casillasSeleccionadas = document.querySelectorAll('.chk-cancion:checked');
  
  const nombreCliente = inputNombre.value.trim();
  if (!nombreCliente) {
    alert('Por favor ingresa un nombre para la playlist.');
    return;
  }
  if (casillasSeleccionadas.length === 0) {
    alert('Selecciona al menos una canción del catálogo.');
    return;
  }

  let pistasSeleccionadas = [];
  let conjuntoGeneros = new Set();
  
  casillasSeleccionadas.forEach(casilla => {
    let idCancion = parseInt(casilla.value);
    let pista = CATALOGO_COMPLETO[idCancion];
    pistasSeleccionadas.push(pista);
    conjuntoGeneros.add(pista.genero);
  });

  const nuevaPlaylist = {
    id: Date.now(),
    nombre: nombreCliente,
    pistas: pistasSeleccionadas,
    generos: Array.from(conjuntoGeneros)
  };

  playlistsGuardadas.push(nuevaPlaylist);

  // Cargar como playlist activa
  playlistActiva = pistasSeleccionadas;
  if (encabezadoTituloPlaylist) {
    encabezadoTituloPlaylist.innerText = `🎵 ${nuevaPlaylist.nombre} (${playlistActiva.length} Pistas)`;
  }

  if (playlistActiva.length > 0) {
    cargarPista(0);
    seleccionarYReproducirPista(0);
  }

  // Abrir automáticamente el panel visualizador de la derecha al guardar y reproducir
  const canvasHero = document.getElementById('canvasHero');
  const botonVisual = document.getElementById('toggleVisualBtn');
  if (canvasHero) canvasHero.classList.remove('compact');
  if (botonVisual) botonVisual.innerText = '👁 Ocultar Visual';
  visualOculto = false;

  // Limpiar formulario
  inputNombre.value = '';
  casillasSeleccionadas.forEach(casilla => casilla.checked = false);

  // Cambiar automáticamente a la pestaña de inicio
  cambiarPestana('inicio');
}

// =========================================================================
// 4. SECCIÓN DE AMIGOS Y OPERACIONES LÓGICAS DE CONJUNTOS
// =========================================================================
function renderizarPlaylistsGuardadas() {
  const contenedorGuardadas = document.getElementById('listaPlaylistsGuardadas');
  if (!contenedorGuardadas) return;

  contenedorGuardadas.innerHTML = '';
  if (playlistsGuardadas.length === 0) {
    contenedorGuardadas.innerHTML = `<div style="font-size:12px; color:#64748b; text-align:center; padding:15px;">No hay playlists registradas todavía. Crea una desde el icono (➕).</div>`;
    return;
  }

  playlistsGuardadas.forEach((pl, indice) => {
    const tarjeta = document.createElement('div');
    tarjeta.style.cssText = "background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;";

    let nombresGeneros = pl.generos.map(g => GENEROS_NOMBRES[g]).join(', ');

    tarjeta.innerHTML = `
      <div>
        <h4 style="font-size: 13px; color: #fff; margin-bottom: 2px;">👤 ${pl.nombre}</h4>
        <p style="font-size: 10.5px; color: #94a3b8; margin: 0;">Pistas: ${pl.pistas.length} | Géneros: [ ${nombresGeneros} ]</p>
      </div>
      <button class="btn-accion" onclick="reproducirPlaylistGuardada(${indice})" style="padding: 5px 12px; font-size: 10.5px; cursor: pointer;">▶ Cargar y Escuchar</button>
    `;
    contenedorGuardadas.appendChild(tarjeta);
  });
}

function mostrarSelectorGeneros() {
  const contenedorFiltro = document.getElementById('contenedorFiltroGenero');
  const contenedorBotones = document.getElementById('botonesGenerosFiltro');
  if (!contenedorFiltro || !contenedorBotones) return;

  contenedorFiltro.style.display = 'block';
  contenedorBotones.innerHTML = '';

  GENEROS_NOMBRES.forEach((nombreGenero, idGenero) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.innerText = nombreGenero;
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      document.querySelectorAll('#botonesGenerosFiltro .chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      aplicarFiltroGenero(idGenero, nombreGenero);
    };
    contenedorBotones.appendChild(btn);
  });
}

function aplicarFiltroGenero(idGenero, nombreGenero) {
  let pistasFiltradas = [];
  playlistsGuardadas.forEach(pl => {
    pl.pistas.forEach(pista => {
      if (pista.genero === idGenero && !pistasFiltradas.some(p => p.title === pista.title)) {
        pistasFiltradas.push(pista);
      }
    });
  });

  const contenedorResultados = document.getElementById('contenedorResultadosLogicos');
  if (contenedorResultados) {
    if (pistasFiltradas.length === 0) {
      contenedorResultados.innerHTML = `<span style="color:#f43f5e;">No hay canciones con el género <b>${nombreGenero}</b> en las playlists guardadas.</span>`;
    } else {
      let listaHtml = pistasFiltradas.map(p => `• ${p.title} (${p.artist})`).join('<br>');
      contenedorResultados.innerHTML = `<b>Filtro por Género: ${nombreGenero}</b> (${pistasFiltradas.length} pistas)<br>${listaHtml}`;
    }
  }

  playlistActiva = pistasFiltradas;
  if (playlistActiva.length > 0) {
    if (encabezadoTituloPlaylist) encabezadoTituloPlaylist.innerText = `🔍 Filtro: ${nombreGenero} (${playlistActiva.length} Pistas)`;
    seleccionarYReproducirPista(0);
  }
}

// 1. Canciones en Común (Intersección exacta de pistas)
function ejecutarCancionesEnComun() {
  const contenedorResultados = document.getElementById('contenedorResultadosLogicos');
  if (playlistsGuardadas.length < 2) {
    if (contenedorResultados) contenedorResultados.innerHTML = `<span style="color:#f43f5e;">Registra al menos 2 playlists para calcular canciones en común.</span>`;
    return;
  }

  let comunes = playlistsGuardadas[0].pistas;
  for (let i = 1; i < playlistsGuardadas.length; i++) {
    let pistasDeOtra = playlistsGuardadas[i].pistas;
    comunes = comunes.filter(p1 => pistasDeOtra.some(p2 => p2.title === p1.title));
  }

  if (contenedorResultados) {
    if (comunes.length === 0) {
      contenedorResultados.innerHTML = `<b>Canciones en Común (A ∩ B):</b> Ninguna canción coincide exactamente en todas las playlists.`;
    } else {
      let listaHtml = comunes.map(p => `• ${p.title} — ${p.artist}`).join('<br>');
      contenedorResultados.innerHTML = `<b>Canciones en Común (A ∩ B):</b><br>${listaHtml}`;
    }
  }

  playlistActiva = comunes;
  if (playlistActiva.length > 0) {
    if (encabezadoTituloPlaylist) encabezadoTituloPlaylist.innerText = `🔗 Canciones en Común (${playlistActiva.length} Pistas)`;
    seleccionarYReproducirPista(0);
  }
}

// 2. Unión de Playlists (A ∪ B)
function ejecutarUnionPlaylists() {
  const contenedorResultados = document.getElementById('contenedorResultadosLogicos');
  if (playlistsGuardadas.length === 0) {
    if (contenedorResultados) contenedorResultados.innerHTML = `<span style="color:#f43f5e;">No hay playlists guardadas.</span>`;
    return;
  }

  let unionPistas = [];
  playlistsGuardadas.forEach(pl => {
    pl.pistas.forEach(pista => {
      if (!unionPistas.some(p => p.title === pista.title)) {
        unionPistas.push(pista);
      }
    });
  });

  if (contenedorResultados) {
    let listaHtml = unionPistas.map(p => `• ${p.title} (${GENEROS_NOMBRES[p.genero]})`).join('<br>');
    contenedorResultados.innerHTML = `<b>Unión de Playlists (A ∪ B):</b> Total ${unionPistas.length} pistas únicas<br>${listaHtml}`;
  }

  playlistActiva = unionPistas;
  if (playlistActiva.length > 0) {
    if (encabezadoTituloPlaylist) encabezadoTituloPlaylist.innerText = `∪ Unión de Playlists (${playlistActiva.length} Pistas)`;
    seleccionarYReproducirPista(0);
  }
}

function reproducirPlaylistGuardada(indice) {
  const pl = playlistsGuardadas[indice];
  playlistActiva = pl.pistas;
  if (encabezadoTituloPlaylist) {
    encabezadoTituloPlaylist.innerText = `🎵 ${pl.nombre} (${playlistActiva.length} Pistas)`;
  }
  if (playlistActiva.length > 0) {
    seleccionarYReproducirPista(0);
  }
  cambiarPestana('inicio');
}

// =========================================================================
// 5. REPRODUCTOR Y CONTROL DE AUDIO
// =========================================================================
function cargarPista(indice) {
  if (playlistActiva.length === 0) return;
  indicePistaActual = indice;
  const pista = playlistActiva[indicePistaActual];
  
  if (elementoTituloPista) elementoTituloPista.innerText = pista.title;
  if (elementoArtistaPista) elementoArtistaPista.innerText = `${pista.artist} • [${GENEROS_NOMBRES[pista.genero]}]`;
  if (elementoTituloFooter) elementoTituloFooter.innerText = pista.title;
  if (elementoArtistaFooter) elementoArtistaFooter.innerText = pista.artist;

  if (atributoArtista) atributoArtista.innerText = pista.artist;
  if (atributoGenero) atributoGenero.innerText = GENEROS_NOMBRES[pista.genero];
  if (atributoStreams) atributoStreams.innerText = pista.streams || "100M+";

  if (gifCanvas) {
    gifCanvas.src = pista.gif || pista.img || "gifs/BT.webp";
  }

  if (miniaturaFooter) {
    miniaturaFooter.innerHTML = `<img src="${pista.img || 'img/P1.jpeg'}" alt="Cover">`;
  }
  
  if (pista.file) {
    audio.src = pista.file;
    audio.load();
  } else {
    audio.src = "";
  }
  
  renderizarListaReproduccion();
  renderizarBibliotecaLateral();
}

function renderizarListaReproduccion() {
  if (!listaPistasContenedor) return;
  listaPistasContenedor.innerHTML = '';
  playlistActiva.forEach((pista, indice) => {
    const item = document.createElement('div');
    item.className = `track-item ${indice === indicePistaActual ? 'active' : ''}`;
    item.onclick = () => seleccionarYReproducirPista(indice);

    item.innerHTML = `
        <span class="item-num">${indice + 1}</span>
        <div class="item-info">
            <div class="item-name">${pista.title}</div>
            <div class="item-artist">${pista.artist} • <span style="color:#00f2fe;">${GENEROS_NOMBRES[pista.genero]}</span></div>
        </div>
    `;
    listaPistasContenedor.appendChild(item);
  });
}

function renderizarBibliotecaLateral() {
  if (!bibliotecaLateralContenedor) return;
  bibliotecaLateralContenedor.innerHTML = '';
  
  playlistActiva.forEach((pista, indice) => {
    const miniTarjeta = document.createElement('div');
    miniTarjeta.className = `lib-mini-card ${indice === indicePistaActual ? 'active' : ''}`;
    miniTarjeta.title = `${pista.title} - ${pista.artist}`;
    miniTarjeta.onclick = () => seleccionarYReproducirPista(indice);

    miniTarjeta.innerHTML = `<img src="${pista.img || 'img/P1.jpeg'}" alt="Mini Cover">`;
    bibliotecaLateralContenedor.appendChild(miniTarjeta);
  });
}

function seleccionarYReproducirPista(indice) {
  cargarPista(indice);
  audio.play().then(() => {
      if (botonReproducir) botonReproducir.innerText = "❚❚";
  }).catch(err => {
      console.log("Reproducción pausada o no interactuada:", err);
      if (botonReproducir) botonReproducir.innerText = "▶";
  });
}

function alternarReproduccion() {
  if (playlistActiva.length === 0) return;
  if (audio.paused) {
      if (!audio.src || audio.src === window.location.href) {
          cargarPista(indicePistaActual);
      }
      audio.play().then(() => {
          if (botonReproducir) botonReproducir.innerText = "❚❚";
      }).catch(err => {
          console.log("Error al reproducir audio:", err);
      });
  } else {
      audio.pause();
      if (botonReproducir) botonReproducir.innerText = "▶";
  }
}

function formatearTiempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${minutos}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progreso = (audio.currentTime / audio.duration) * 100;
        if (barraProgreso) barraProgreso.value = progreso;
        if (elementoTiempoActual) elementoTiempoActual.innerText = formatearTiempo(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    if (elementoDuracion) elementoDuracion.innerText = formatearTiempo(audio.duration);
    if (atributoDuracion) atributoDuracion.innerText = formatearTiempo(audio.duration);
});

audio.addEventListener('ended', () => {
    pistaSiguiente();
});

if (barraProgreso) {
  barraProgreso.addEventListener('input', () => {
      if (audio.duration) {
          audio.currentTime = (barraProgreso.value / 100) * audio.duration;
      }
  });
}

function pistaAnterior() {
    if (playlistActiva.length === 0) return;
    const nuevoIndice = (indicePistaActual - 1 + playlistActiva.length) % playlistActiva.length;
    seleccionarYReproducirPista(nuevoIndice);
}

function pistaSiguiente() {
    if (playlistActiva.length === 0) return;
    const nuevoIndice = (indicePistaActual + 1) % playlistActiva.length;
    seleccionarYReproducirPista(nuevoIndice);
}

let visualOculto = true;
function alternarVisualizador() {
    const canvasHero = document.getElementById('canvasHero');
    const botonVisual = document.getElementById('toggleVisualBtn');
    visualOculto = !visualOculto;
    if (visualOculto) {
        if (canvasHero) canvasHero.classList.add('compact');
        if (botonVisual) botonVisual.innerText = '👁 Mostrar Visual';
    } else {
        if (canvasHero) canvasHero.classList.remove('compact');
        if (botonVisual) botonVisual.innerText = '👁 Ocultar Visual';
    }
}

// =========================================================================
// 6. FONDO 3D THREE.JS (PARTÍCULAS ESPACIALES EN MOVIMIENTO)
// =========================================================================
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camara.position.z = 5;

    const renderizador = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderizador.setClearColor(0x020205, 1);

    const cantidad = 2500;
    const geometria = new THREE.BufferGeometry();
    const posiciones = new Float32Array(cantidad * 3);
    const colores = new Float32Array(cantidad * 3);
    const color1 = new THREE.Color('#00f2fe');
    const color2 = new THREE.Color('#ff0080');

    for(let i = 0; i < cantidad * 3; i += 3) {
        posiciones[i] = (Math.random() - 0.5) * 12;
        posiciones[i+1] = (Math.random() - 0.5) * 12;
        posiciones[i+2] = (Math.random() - 0.5) * 12;

        const colorMix = color1.clone().lerp(color2, Math.random());
        colores[i] = colorMix.r;
        colores[i+1] = colorMix.g;
        colores[i+2] = colorMix.b;
    }

    geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));
    geometria.setAttribute('color', new THREE.BufferAttribute(colores, 3));

    const material = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.85 });
    const puntos = new THREE.Points(geometria, material);
    escena.add(puntos);

    function animar() {
        requestAnimationFrame(animar);
        puntos.rotation.y += 0.0008;
        puntos.rotation.x += 0.0004;
        renderizador.render(escena, camara);
    }
    animar();

    window.addEventListener('resize', () => {
        camara.aspect = window.innerWidth / window.innerHeight;
        camara.updateProjectionMatrix();
        renderizador.setSize(window.innerWidth, window.innerHeight);
    });
}