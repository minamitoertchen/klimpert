// =========================================================
// klimper Player – App-Logik (Manuelle Playlists)
// =========================================================

// ---------------------------------------------------------
// DEINE PLAYLISTS & TRACKS (Hier eintragen!)
// ---------------------------------------------------------
const PLAYLISTS = {
  // Playlist 1: Aufrufbar via ?playlist=fruehling
  fruehling: {
    themeName: 'Frühling',
    tracks: [
      {
        id: 'L4u_5jC1ZGE', // YouTube Video-ID
        eyebrow: 'Karneval der Tiere',
        title: 'Die Vögel',
        composer: 'Camille Saint-Saëns',
      },
      {
        id: 'v2AC41dglnM',
        eyebrow: 'Die vier Jahreszeiten',
        title: 'Der Frühling',
        composer: 'Antonio Vivaldi',
      },
    ],
  },

  // Playlist 2: Aufrufbar via ?playlist=weltall
  weltall: {
    themeName: 'Weltall',
    tracks: [
      {
        id: 'dQw4w9WgXcQ',
        eyebrow: 'Die Planeten',
        title: 'Jupiter',
        composer: 'Gustav Holst',
      },
    ],
  },
};

// Fallback, falls kein Parameter in der URL steht
const DEFAULT_PLAYLIST_KEY = 'fruehling';

// ---------------------------------------------------------
// QR-Code Parameter auslesen & Playlist bestimmen
// ---------------------------------------------------------
function getPlaylistKeyFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('playlist');
  return PLAYLISTS[key] ? key : DEFAULT_PLAYLIST_KEY;
}

const currentPlaylistKey = getPlaylistKeyFromUrl();
const activePlaylist = PLAYLISTS[currentPlaylistKey];

let currentIndex = 0;
let player = null;
let isPlaying = false;
let progressTimer = null;
let isSeeking = false;

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
// YouTube API Initialisierung
// ---------------------------------------------------------
function loadYouTubeIframeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    videoId: activePlaylist.tracks[currentIndex].id,
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
  renderTrackUI();
}

function handleStateChange(event) {
  isPlaying = event.data === YT.PlayerState.PLAYING;
  renderPlayIcon();

  if (isPlaying) {
    startProgressLoop();
  } else {
    stopProgressLoop();
  }

  // Automatischer Wechsel zum nächsten Track bei Liedende
  if (event.data === YT.PlayerState.ENDED) {
    goToNext();
  }
}

// ---------------------------------------------------------
// Steuerung
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
  currentIndex = (currentIndex + 1) % activePlaylist.tracks.length;
  loadAndPlayCurrentTrack();
}

function goToPrev() {
  currentIndex = (currentIndex - 1 + activePlaylist.tracks.length) % activePlaylist.tracks.length;
  loadAndPlayCurrentTrack();
}

function loadAndPlayCurrentTrack() {
  renderTrackUI();
  resetProgress();
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(activePlaylist.tracks[currentIndex].id);
  }
}

// ---------------------------------------------------------
// UI Rendering & Progress Bar
// ---------------------------------------------------------
function renderTrackUI() {
  const track = activePlaylist.tracks[currentIndex];
  
  if (elThemeName) elThemeName.textContent = activePlaylist.themeName;
  if (elEyebrow) elEyebrow.textContent = track.eyebrow || '';
  if (elTitle) elTitle.textContent = track.title || '';
  if (elComposer) elComposer.textContent = track.composer || '';
}

function renderPlayIcon() {
  if (elPlayIcon) elPlayIcon.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
  if (elPlayBtn) elPlayBtn.setAttribute('aria-label', isPlaying ? 'Pausieren' : 'Abspielen');
}

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function resetProgress() {
  if (elProgressFill) elProgressFill.style.width = '0%';
  if (elProgressHandle) elProgressHandle.style.left = '0%';
  if (elTime) elTime.textContent = '0:00';
}

function updateProgressUI(ratio, currentSeconds) {
  const percent = Math.min(100, Math.max(0, ratio * 100));
  if (elProgressFill) elProgressFill.style.width = `${percent}%`;
  if (elProgressHandle) elProgressHandle.style.left = `${percent}%`;
  if (elTime) elTime.textContent = formatTime(currentSeconds);
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
// Spulen (Seek) Event-Handling
// ---------------------------------------------------------
function seekFromClientX(clientX) {
  if (!player || typeof player.getDuration !== 'function') return;
  const rect = elProgressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const duration = player.getDuration();
  updateProgressUI(ratio, ratio * duration);
  return ratio * duration;
}

if (elProgressTrack) {
  elProgressTrack.addEventListener('pointerdown', (event) => {
    isSeeking = true;
    elProgressTrack.setPointerCapture(event.pointerId);
    seekFromClientX(event.clientX);
  });

  elProgressTrack.addEventListener('pointermove', (event) => {
    if (!isSeeking) return;
    seekFromClientX(event.clientX);
  });

  elProgressTrack.addEventListener('pointerup', (event) => {
    if (!isSeeking) return;
    isSeeking = false;
    const target = seekFromClientX(event.clientX);
    if (player && typeof player.seekTo === 'function' && typeof target === 'number') {
      player.seekTo(target, true);
    }
  });

  elProgressTrack.addEventListener('pointercancel', () => {
    isSeeking = false;
  });
}

// Event-Listener für Buttons
if (elPlayBtn) elPlayBtn.addEventListener('click', togglePlay);
if (elPrevBtn) elPrevBtn.addEventListener('click', goToPrev);
if (elNextBtn) elNextBtn.addEventListener('click', goToNext);

// Start
renderTrackUI();
renderPlayIcon();
loadYouTubeIframeAPI();
