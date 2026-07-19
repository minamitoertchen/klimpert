// =========================================================
// klimper Player – App-Logik
// =========================================================

// ---------------------------------------------------------
// Standard-Playlist (Fallback, falls kein ?track=-Parameter
// in der URL steht). ACHTUNG: Platzhalter-IDs, bitte durch
// echte YouTube-Video-IDs ersetzen.
// ---------------------------------------------------------
const DEFAULT_PLAYLIST = [
  {
    id: 'REPLACE_WITH_YOUTUBE_ID_1',
    eyebrow: 'Karneval der Tiere',
    title: 'Die Vögel',
    composer: 'Camille Saint-Saëns',
  },
  {
    id: 'REPLACE_WITH_YOUTUBE_ID_2',
    eyebrow: 'Karneval der Tiere',
    title: 'Der Schwan',
    composer: 'Camille Saint-Saëns',
  },
];

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
// QR-Code-Steuerung: ?track=YOUTUBE_ID aus der URL lesen
// ---------------------------------------------------------
function getTrackIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('track');
}

const trackIdFromUrl = getTrackIdFromUrl();

// Wenn ein Track per QR-Parameter vorgegeben ist, wird er vorangestellt
// und direkt abgespielt. Titel/Komponist sind zunächst unbekannt und
// werden – soweit möglich – aus den YouTube-Metadaten übernommen.
let playlist = trackIdFromUrl
  ? [{ id: trackIdFromUrl, eyebrow: '', title: 'Wird geladen …', composer: '' }, ...DEFAULT_PLAYLIST]
  : [...DEFAULT_PLAYLIST];

let currentIndex = 0;

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

// Von der YouTube-API global erwarteter Callback-Name
window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    videoId: playlist[currentIndex].id,
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
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handleStateChange,
    },
  });
};

function handlePlayerReady() {
  if (trackIdFromUrl) {
    tryAdoptVideoMetadata();
  }
}

// player.getVideoData() ist Teil der IFrame API, aber nicht offiziell
// dokumentiert – daher defensiv mit try/catch verwendet.
function tryAdoptVideoMetadata() {
  try {
    const data = player.getVideoData && player.getVideoData();
    if (data && data.title) {
      playlist[currentIndex].title = data.title;
      playlist[currentIndex].composer = data.author || '';
      renderTrack();
    }
  } catch (err) {
    // Metadaten nicht verfügbar – Anzeige bleibt beim Platzhalter.
  }
}

function handleStateChange(event) {
  isPlaying = event.data === YT.PlayerState.PLAYING;
  renderPlayIcon();

  if (isPlaying) {
    startProgressLoop();
  } else {
    stopProgressLoop();
  }

  if (event.data === YT.PlayerState.ENDED) {
    goToNext();
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
  currentIndex = (currentIndex + 1) % playlist.length;
  playCurrentTrack();
}

function goToPrev() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  playCurrentTrack();
}

function playCurrentTrack() {
  renderTrack();
  resetProgress();
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(playlist[currentIndex].id);
  }
}

// ---------------------------------------------------------
// UI-Rendering
// ---------------------------------------------------------
function renderTrack() {
  const track = playlist[currentIndex];
  elEyebrow.textContent = track.eyebrow;
  elEyebrow.style.display = track.eyebrow ? '' : 'none';
  elTitle.textContent = track.title;
  elComposer.textContent = track.composer;
  elComposer.style.display = track.composer ? '' : 'none';
}

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
renderTrack();
renderPlayIcon();
loadYouTubeIframeAPI();
