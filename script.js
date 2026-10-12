// PARTE 1: REGISTRO CANCION + CATALOGO (20 Canciones Estructuradas)
// Generos: 0: ROCK, 1: POP, 2: JAZZ, 3: ELECTRONICA, 4: REGGAETON
const GENEROS_NOMBRES = ["ROCK", "POP", "JAZZ", "ELECTRONICA", "REGGAETON"];

const CATALOGO = [
  { titulo: "All The Way Live", artista: "Metro Boomin, Future", genero: 1, duracion: 245, streams: 1200 },
  { titulo: "Annihilate", artista: "Metro Boomin, Swae Lee", genero: 1, duracion: 210, streams: 980 },
  { titulo: "Star Gazer", artista: "Nova", genero: 1, duracion: 225, streams: 750 },
  { titulo: "Rock Star", artista: "AC/DC", genero: 0, duracion: 200, streams: 1500 },
  { titulo: "Thunderstruck", artista: "AC/DC", genero: 0, duracion: 290, streams: 3000 },
  { titulo: "Fly Me to the Moon", artista: "Frank Sinatra", genero: 2, duracion: 147, streams: 2100 },
  { titulo: "Take Five", artista: "Dave Brubeck", genero: 2, duracion: 324, streams: 890 },
  { titulo: "Strobe", artista: "deadmau5", genero: 3, duracion: 637, streams: 1100 },
  { titulo: "Titanium", artista: "David Guetta", genero: 3, duracion: 245, streams: 2500 },
  { titulo: "Gasolina", artista: "Daddy Yankee", genero: 4, duracion: 192, streams: 4000 },
  { titulo: "Love Yourself", artista: "BTS", genero: 1, duracion: 212, streams: 3500 },
  { titulo: "Dynamite", artista: "BTS", genero: 1, duracion: 199, streams: 4800 },
  { titulo: "DISCIPLE", artista: "The Warning", genero: 0, duracion: 220, streams: 850 },
  { titulo: "AUTOMATIC SUN", artista: "The Warning", genero: 0, duracion: 205, streams: 920 },
  { titulo: "Smooth Operator", artista: "Sade", genero: 2, duracion: 258, streams: 1300 },
  { titulo: "One More Time", artista: "Daft Punk", genero: 3, duracion: 320, streams: 3100 },
  { titulo: "Despacito", artista: "Luis Fonsi", genero: 4, duracion: 228, streams: 5000 },
  { titulo: "Like Crazy", artista: "Jimin", genero: 1, duracion: 212, streams: 2900 },
  { titulo: "Seven", artista: "Jungkook", genero: 1, duracion: 184, streams: 4100 },
  { titulo: "Haegeum", artista: "Agust D", genero: 1, duracion: 168, streams: 2300 }
];

// PARTE 2: VECTORES DE BITS DE PREFERENCIAS
let prefAmigo1 = [1, 1, 0, 0, 0]; // Rock, Pop
let prefAmigo2 = [0, 1, 1, 1, 0]; // Pop, Jazz, Elec

let playlistComunGeneros = [];
let mostrandoCatalogoCompleto = false;

// ELEMENTOS DOM
const vector1Display = document.getElementById("vectorAmigo1");
const vector2Display = document.getElementById("vectorAmigo2");
const resultGenresDisplay = document.getElementById("resultGenres");
const pistasContainer = document.getElementById("pistasContainer");
const songCountDisplay = document.getElementById("songCount");
const btnIntersect = document.getElementById("btnIntersect");
const btnToggleCatalog = document.getElementById("btnToggleCatalog");

const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const btnPlay = document.getElementById("btnPlay");

let isPlaying = false;

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  setupGenreToggles();
  calcularInterseccionYFiltrar();

  btnIntersect.addEventListener("click", calcularInterseccionYFiltrar);

  btnToggleCatalog.addEventListener("click", () => {
    mostrandoCatalogoCompleto = !mostrandoCatalogoCompleto;
    btnToggleCatalog.textContent = mostrandoCatalogoCompleto 
      ? "Ver Playlist Filtrada" 
      : "Ver Catálogo Completo (20)";
    renderizarPistas();
  });

  btnPlay.addEventListener("click", () => {
    isPlaying = !isPlaying;
    btnPlay.textContent = isPlaying ? "⏸️" : "▶️";
  });
});

// CONFIGURACIÓN DE CHIPS TÁCTILES
function setupGenreToggles() {
  document.querySelectorAll("#genresAmigo1 .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const bit = parseInt(chip.dataset.bit);
      prefAmigo1[bit] = prefAmigo1[bit] === 1 ? 0 : 1;
      chip.classList.toggle("active");
      vector1Display.textContent = `[ ${prefAmigo1.join(", ")} ]`;
    });
  });

  document.querySelectorAll("#genresAmigo2 .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const bit = parseInt(chip.dataset.bit);
      prefAmigo2[bit] = prefAmigo2[bit] === 1 ? 0 : 1;
      chip.classList.toggle("active");
      vector2Display.textContent = `[ ${prefAmigo2.join(", ")} ]`;
    });
  });
}

// PARTE 3: INTERSECCIÓN DE CONJUNTOS (OPERADOR *)
function calcularInterseccionYFiltrar() {
  playlistComunGeneros = [];
  
  // Intersección bit a bit
  for (let i = 0; i < 5; i++) {
    if (prefAmigo1[i] === 1 && prefAmigo2[i] === 1) {
      playlistComunGeneros.push(i);
    }
  }

  // Actualizar UI de géneros comunes
  if (playlistComunGeneros.length === 0) {
    resultGenresDisplay.innerHTML = "Géneros en común: <span>NINGUNO</span>";
  } else {
    const nombres = playlistComunGeneros.map(g => GENEROS_NOMBRES[g]).join(", ");
    resultGenresDisplay.innerHTML = `Géneros en común: <span>${nombres}</span>`;
  }

  renderizarPistas();
}

// PARTE 4: FILTRAR CATÁLOGO SIN REPETIDOS
function obtenerPistasFiltradas() {
  if (mostrandoCatalogoCompleto) return CATALOGO;

  let yaAgregadas = []; // Control de duplicados (IDs o Títulos)

  for (let i = 0; i < CATALOGO.length; i++) {
    const cancion = CATALOGO[i];
    
    // Verificar si el género de la canción pertenece a la intersección
    if (playlistComunGeneros.includes(cancion.genero)) {
      // Control de duplicados
      if (!yaAgregadas.some(c => c.titulo === cancion.titulo)) {
        yaAgregadas.push(cancion);
      }
    }
  }

  return yaAgregadas;
}

// RENDERIZAR LISTA EN EL DOM
function renderizarPistas() {
  const lista = obtenerPistasFiltradas();
  pistasContainer.innerHTML = "";
  songCountDisplay.textContent = lista.length;

  if (lista.length === 0) {
    pistasContainer.innerHTML = `<p style="font-size:12px; color:#64748b; text-align:center; padding:12px;">No hay coincidencias en el catálogo para los géneros seleccionados.</p>`;
    return;
  }

  lista.forEach((cancion, index) => {
    const item = document.createElement("div");
    item.className = "pista-item";
    item.innerHTML = `
      <span class="pista-num">${index + 1}</span>
      <div class="pista-info">
        <h4>${cancion.titulo}</h4>
        <p>${cancion.artista} • <span style="color:#00f2fe;">${GENEROS_NOMBRES[cancion.genero]}</span></p>
      </div>
    `;

    item.addEventListener("click", () => {
      document.querySelectorAll(".pista-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      currentTitle.textContent = cancion.titulo;
      currentArtist.textContent = cancion.artista;
      isPlaying = true;
      btnPlay.textContent = "⏸️";
    });

    pistasContainer.appendChild(item);
  });
}
