// =========================================================
// klimper Player – App-Logik (Unterstützt YouTube Playlists)
// =========================================================

// ---------------------------------------------------------
// Standard-Playlist ID (Fallback, falls kein ?playlist= Parameter in der URL steht)
// Ersetze diese ID durch deine gewünschte YouTube-Playlist-ID!
// ---------------------------------------------------------
const DEFAULT_PLAYLIST_ID = 'PLDISKg8WiWVzP_lE2K5C3C-D8_9J8x_X2';

// ---------------------------------------------------------
// DOM-Referenzen
// ---------------------------------------------------------
const elThemeName = document.getElementById('themeName');
const elEyebrow = document.getElementById('trackEyebrow');
const elTitle = document.getElementById('trackTitle');
const elComposer = document.getElementById('trackComposer');
const elProgressTrack = document.getElementById('progressTrack');
const elProgressFill = document.getElementById('progressFill');
const elProgressHandle = document.getElementById('progressHandle');
const elTime = document.getElementById('timeDisplay');
const elPlayBtn = document.getElementById('playBtn');
const elPlayIcon = document.getElementById('playIcon');
const elPrevBtn = document.getElementById('prevBtn');
const elNextBtn = document.getElementById('nextBtn');

const ICON_PLAY = '<path d="M8 5 L19 12 L8 19 Z" />';
const ICON_PAUSE = '<path d="M7 5 H10 V19 H7 Z M14 5 H17 V19 H14 Z" />';

// ---------------------------------------------------------
// QR-Code-Steuerung: ?playlist=YOUTUBE_PLAYLIST_ID lesen
// ---------------------------------------------------------
function getPlaylistIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('playlist');
}

const activePlaylistId = getPlaylistIdFromUrl() || DEFAULT_PLAYLIST_ID;

// ---------------------------------------------------------
// YouTube IFrame API laden
// ---------------------------------------------------------
let player = null;
let isPlaying = false;
let progressTimer = null;
let isSeeking = false;

function loadYouTubeIframeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      iv_load_policy: 3,
      origin: window.location.origin,
      listType: 'playlist',      // Sagt der API, dass es eine Playlist ist
      list: activePlaylistId,    // Übergibt die Playlist-ID aus dem QR-Code
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handleStateChange,
    },
  });
};

function handlePlayerReady() {
  updateMetadata();
}

function updateMetadata() {
  try {
    if (player && typeof player.getVideoData === 'function') {
      const data = player.getVideoData();
      if (data && data.title) {
        elTitle.textContent = data.title;
        elComposer.textContent = data.author || '';
        if (elEyebrow) elEyebrow.textContent = 'Playlist';
      }
    }
  } catch (err) {
    // Falls Metadaten noch nicht verfügbar sind
  }
}

function handleStateChange(event) {
  isPlaying = event.data === YT.PlayerState.PLAYING;
  renderPlayIcon();

  if (isPlaying) {
    updateMetadata(); // Aktualisiert Titel & Komponist beim Songwechsel
    startProgressLoop();
  } else {
    stopProgressLoop();
  }

  // Wenn ein Song zu Ende ist, springt die Playlist automatisch weiter
  if (event.data === YT.PlayerState.ENDED) {
    resetProgress();
  }
}

// ---------------------------------------------------------
// Wiedergabesteuerung
// ---------------------------------------------------------
function togglePlay() {
  if (!player || typeof player.getPlayerState !== 'function') return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function goToNext() {
  if (player && typeof player.nextVideo === 'function') {
    player.nextVideo(); // Befehl an YouTube: Nächster Titel der Playlist
  }
}

function goToPrev() {
  if (player && typeof player.previousVideo === 'function') {
    player.previousVideo(); // Befehl an YouTube: Vorheriger Titel der Playlist
  }
}

// ---------------------------------------------------------
// UI-Rendering & Fortschritts-Anzeige
// ---------------------------------------------------------
function renderPlayIcon() {
  elPlayIcon.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
  elPlayBtn.setAttribute('aria-label', isPlaying ? 'Pausieren' : 'Abspielen');
}

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function resetProgress() {
  elProgressFill.style.width = '0%';
  elProgressHandle.style.left = '0%';
  elTime.textContent = '0:00';
  elProgressTrack.setAttribute('aria-valuenow', '0');
}

function updateProgressUI(ratio, currentSeconds) {
  const percent = Math.min(100, Math.max(0, ratio * 100));
  elProgressFill.style.width = `${percent}%`;
  elProgressHandle.style.left = `${percent}%`;
  elTime.textContent = formatTime(currentSeconds);
  elProgressTrack.setAttribute('aria-valuenow', String(Math.round(percent)));
}

function startProgressLoop() {
  stopProgressLoop();
  progressTimer = window.setInterval(() => {
    if (isSeeking || !player || typeof player.getCurrentTime !== 'function') return;
    const duration = player.getDuration();
    const current = player.getCurrentTime();
    if (!duration) return;
    updateProgressUI(current / duration, current);
  }, 250);
}

function stopProgressLoop() {
  if (progressTimer) {
    window.clearInterval(progressTimer);
    progressTimer = null;
  }
}

// ---------------------------------------------------------
// Fortschrittsleiste: Klick & Drag zum Spulen
// ---------------------------------------------------------
function seekFromClientX(clientX) {
  if (!player || typeof player.getDuration !== 'function') return;
  const rect = elProgressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const duration = player.getDuration();
  updateProgressUI(ratio, ratio * duration);
  return ratio * duration;
}

elProgressTrack.addEventListener('pointerdown', (event) => {
  isSeeking = true;
  elProgressTrack.setPointerCapture(event.pointerId);
  seekFromClientX(event.clientX);
});

elProgressTrack.addEventListener('pointermove', (event) => {
  if (!isSeeking) return;
  seekFromClientX(event.clientX);
});

function endSeek(event) {
  if (!isSeeking) return;
  isSeeking = false;
  const target = seekFromClientX(event.clientX);
  if (player && typeof player.seekTo === 'function' && typeof target === 'number') {
    player.seekTo(target, true);
  }
}

elProgressTrack.addEventListener('pointerup', endSeek);
elProgressTrack.addEventListener('pointercancel', () => {
  isSeeking = false;
});

// ---------------------------------------------------------
// Button-Events
// ---------------------------------------------------------
elPlayBtn.addEventListener('click', togglePlay);
elPrevBtn.addEventListener('click', goToPrev);
elNextBtn.addEventListener('click', goToNext);

// ---------------------------------------------------------
// Initialisierung
// ---------------------------------------------------------
renderPlayIcon();
loadYouTubeIframeAPI();
