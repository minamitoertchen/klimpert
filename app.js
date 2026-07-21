// =========================================================
// klimper Player – App-Logik (Native Audio / MP3)
// =========================================================

// ---------------------------------------------------------
// DEINE PLAYLISTS & MP3-DATEIEN
// Lege deine MP3s in den Ordner "assets/audio/"
// ---------------------------------------------------------
const PLAYLISTS = {
  fruehling: {
    themeName: 'Frühling',
    tracks: [
      {
        url: 'assets/audio/CuckooinSpring.mp3', // Pfad zu deiner MP3-Datei
        eyebrow: 'On hearing the first Cuckoo in Spring',
        title: 'On hearing the first Cuckoo in Spring',
        composer: 'Frederick Delius',
      },
      {
        url: 'assets/audio/voegel.mp3',
        eyebrow: 'Karneval der Tiere',
        title: 'Die Vögel',
        composer: 'Camille Saint-Saëns',
      },
    ],
  },
  weltall: {
    themeName: 'Weltall',
    tracks: [
      {
        url: 'assets/audio/jupiter.mp3',
        eyebrow: 'Die Planeten',
        title: 'Jupiter',
        composer: 'Gustav Holst',
      },
    ],
  },
};

// Fallback-Playlist, falls kein Parameter in der URL steht
const DEFAULT_PLAYLIST_KEY = 'fruehling';

// ---------------------------------------------------------
// QR-Code Parameter auslesen
// ---------------------------------------------------------
function getPlaylistKeyFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('playlist');
  return PLAYLISTS[key] ? key : DEFAULT_PLAYLIST_KEY;
}

const currentPlaylistKey = getPlaylistKeyFromUrl();
const activePlaylist = PLAYLISTS[currentPlaylistKey];

let currentIndex = 0;
let isSeeking = false;

// ---------------------------------------------------------
// DOM-Referenzen
// ---------------------------------------------------------
const audio = document.getElementById('audioPlayer');
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
// Audio & UI Initialisierung
// ---------------------------------------------------------
function loadTrack(index) {
  currentIndex = index;
  const track = activePlaylist.tracks[currentIndex];

  audio.src = track.url;
  audio.load();

  renderTrackUI();
  resetProgress();
}

function renderTrackUI() {
  const track = activePlaylist.tracks[currentIndex];
  
  if (elThemeName) elThemeName.textContent = activePlaylist.themeName;
  if (elEyebrow) elEyebrow.textContent = track.eyebrow || '';
  if (elTitle) elTitle.textContent = track.title || '';
  if (elComposer) elComposer.textContent = track.composer || '';
}

function renderPlayIcon() {
  const isPlaying = !audio.paused;
  if (elPlayIcon) elPlayIcon.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
  if (elPlayBtn) elPlayBtn.setAttribute('aria-label', isPlaying ? 'Pausieren' : 'Abspielen');
}

// ---------------------------------------------------------
// Wiedergabesteuerung
// ---------------------------------------------------------
function togglePlay() {
  if (audio.paused) {
    audio.play().catch((err) => console.log('Autoplay blockiert:', err));
  } else {
    audio.pause();
  }
}

function goToNext() {
  const wasPlaying = !audio.paused;
  const nextIndex = (currentIndex + 1) % activePlaylist.tracks.length;
  loadTrack(nextIndex);
  if (wasPlaying) audio.play();
}

function goToPrev() {
  const wasPlaying = !audio.paused;
  const prevIndex = (currentIndex - 1 + activePlaylist.tracks.length) % activePlaylist.tracks.length;
  loadTrack(prevIndex);
  if (wasPlaying) audio.play();
}

// ---------------------------------------------------------
// Native Audio Events
// ---------------------------------------------------------
audio.addEventListener('play', renderPlayIcon);
audio.addEventListener('pause', renderPlayIcon);

// Aktualisiert den Fortschrittsbalken während der Wiedergabe
audio.addEventListener('timeupdate', () => {
  if (isSeeking || !audio.duration) return;
  const ratio = audio.currentTime / audio.duration;
  updateProgressUI(ratio, audio.currentTime);
});

// Automatischer Wechsel zum nächsten Lied am Ende
audio.addEventListener('ended', () => {
  goToNext();
  audio.play();
});

// ---------------------------------------------------------
// Fortschrittsanzeige & Spulen
// ---------------------------------------------------------
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

function seekFromClientX(clientX) {
  if (!audio.duration) return;
  const rect = elProgressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  updateProgressUI(ratio, ratio * audio.duration);
  return ratio * audio.duration;
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
    const targetTime = seekFromClientX(event.clientX);
    if (typeof targetTime === 'number') {
      audio.currentTime = targetTime;
    }
  });

  elProgressTrack.addEventListener('pointercancel', () => {
    isSeeking = false;
  });
}

// ---------------------------------------------------------
// Button Listeners
// ---------------------------------------------------------
if (elPlayBtn) elPlayBtn.addEventListener('click', togglePlay);
if (elPrevBtn) elPrevBtn.addEventListener('click', goToPrev);
if (elNextBtn) elNextBtn.addEventListener('click', goToNext);

// Erstes Lied laden
loadTrack(0);
