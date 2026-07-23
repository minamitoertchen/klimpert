// =========================================================
// klimper Player – App-Logik (Native Audio / MP3)
// =========================================================

// ---------------------------------------------------------
// DEINE PLAYLISTS & MP3-DATEIEN
// ---------------------------------------------------------
const PLAYLISTS = {
  // 🌸 FRÜHLING (?playlist=fruehling)
  fruehling: {
    themeName: 'Frühling',
    tracks: [
      {
        url: "assets/audio/der fruehling/Vivaldi Four Seasons： Spring (La Primavera) Full, original. Youssefian & Voices of Music RV 269 4K.mp3",
        eyebrow: 'Die vier Jahreszeiten',
        title: 'Der Frühling (La Primavera)',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/der fruehling/Beethoven - Violin Sonata No. 5, Op. 24 'Frühlingssonate' (1801).mp3",
        eyebrow: 'Violinsonate Nr. 5',
        title: 'Frühlingssonate',
        composer: 'Ludwig van Beethoven',
      },
      {
        url: "assets/audio/der fruehling/Max Richter - Spring 1 (2012) ｜ Recomposed： Vivaldi's Four Seasons (Official Audio).mp3",
        eyebrow: 'Neoklassik',
        title: 'Spring 1 (Recomposed)',
        composer: 'Max Richter / Vivaldi',
      },
      {
        url: "assets/audio/der fruehling/Symphonic Gems： Tchaikovsky - The Nutcracker - Waltz of the Flowers ｜ Concertgebouworkest.mp3",
        eyebrow: 'Der Nussknacker',
        title: 'Blumenwalzer',
        composer: 'Pjotr Iljitsch Tschaikowski',
      },
      {
        url: "assets/audio/der fruehling/Trittico Botticelliano： No. 1, La Primavera.mp3",
        eyebrow: 'Trittico Botticelliano',
        title: 'La Primavera',
        composer: 'Ottorino Respighi',
      },
      {
        url: "assets/audio/der fruehling/Fantasia on Greensleeves.mp3",
        eyebrow: 'Orchesterwerk',
        title: 'Fantasia on Greensleeves',
        composer: 'Ralph Vaughan Williams',
      },
      {
        url: "assets/audio/der fruehling/Jean-Yves Thibaudet - Marianelli： Dawn (From 'Pride & Prejudice' Soundtrack).mp3",
        eyebrow: 'Filmmusik',
        title: 'Dawn (Stolz und Vorurteil)',
        composer: 'Dario Marianelli',
      },
      {
        url: "assets/audio/der fruehling/Jeux d'eau： Très doux in E Major, M.30, IMR 21.mp3",
        eyebrow: 'Klavierstück',
        title: 'Jeux d\'eau (Wasserspiele)',
        composer: 'Maurice Ravel',
      },
      {
        url: "assets/audio/der fruehling/Les saisons (The Seasons) , Op. 37b： I. January： At the Fireside.mp3",
        eyebrow: 'Die Jahreszeiten',
        title: 'Januar: Am Kamin',
        composer: 'Pjotr Iljitsch Tschaikowski',
      },
      {
        url: "assets/audio/der fruehling/Lyric Pieces, Book I, Op. 12： No. 1, Arietta.mp3",
        eyebrow: 'Lyrische Stücke',
        title: 'Arietta',
        composer: 'Edvard Grieg',
      },
    ],
  },

  // 🚀 WELTALL (?playlist=weltall)
  weltall: {
    themeName: 'Weltall',
    tracks: [
      {
        url: "assets/audio/weltall/Flying (From 'E.T. The Extra-Terrestrial' Soundtrack).mp3",
        eyebrow: 'E.T. Der Außerirdische',
        title: 'Flying Theme',
        composer: 'John Williams',
      },
      {
        url: "assets/audio/weltall/Alan Hovhaness - Symphony No. 53, Op. 377 'Star Dawn'： I. Maestoso sostenuto.mp3",
        eyebrow: 'Symphonie Nr. 53',
        title: 'Star Dawn',
        composer: 'Alan Hovhaness',
      },
      {
        url: "assets/audio/weltall/NDR Radiophilharmonie, Ben Palmer, Pop-Up, Hans Zimmer - The Blue Planet.mp3",
        eyebrow: 'Dokumentation',
        title: 'The Blue Planet',
        composer: 'Hans Zimmer',
      },
      {
        url: "assets/audio/weltall/Crossing Mars.mp3",
        eyebrow: 'Weltraumklänge',
        title: 'Crossing Mars',
        composer: 'Unbekannt',
      },
      {
        url: "assets/audio/weltall/Lost in Space.mp3",
        eyebrow: 'Sci-Fi Thema',
        title: 'Lost in Space',
        composer: 'Unbekannt',
      },
      {
        url: "assets/audio/weltall/Pluto, the Renewer.mp3",
        eyebrow: 'Die Planeten',
        title: 'Pluto, the Renewer',
        composer: 'Colin Matthews',
      },
      {
        url: "assets/audio/weltall/Stravinsky： Le roi des étoiles, K14.mp3",
        eyebrow: 'Chorwerk',
        title: 'Le roi des étoiles',
        composer: 'Igor Strawinsky',
      },
      {
        url: "assets/audio/weltall/Venus.mp3",
        eyebrow: 'Die Planeten',
        title: 'Venus',
        composer: 'Gustav Holst',
      },
    ],
  },

  // 🪐 PLANETEN (?playlist=planeten)
  planeten: {
    themeName: 'Die Planeten',
    tracks: [
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： I. Mars, The Bringer of War.mp3",
        eyebrow: 'Die Planeten',
        title: 'Mars – Bringer des Krieges',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： II. Venus, The Bringer of Peace.mp3",
        eyebrow: 'Die Planeten',
        title: 'Venus – Bringerin des Friedens',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： III. Mercury, The Winged Messenger.mp3",
        eyebrow: 'Die Planeten',
        title: 'Merkur – Geflügelter Bote',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： IV. Jupiter, The Bringer of Jollity.mp3",
        eyebrow: 'Die Planeten',
        title: 'Jupiter – Bringer der Fröhlichkeit',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： V. Saturn, The Bringer of old Age.mp3",
        eyebrow: 'Die Planeten',
        title: 'Saturn – Bringer des Alters',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： VI. Uranus, The Magician.mp3",
        eyebrow: 'Die Planeten',
        title: 'Uranus – Der Magier',
        composer: 'Gustav Holst',
      },
      {
        url: "assets/audio/planeten/Holst： The Planets, Op. 32： VII. Neptune, The Mystic.mp3",
        eyebrow: 'Die Planeten',
        title: 'Neptun – Der Mystiker',
        composer: 'Gustav Holst',
      },
    ],
  },

  // 👾 SCIENCE FICTION (?playlist=scifi)
  scifi: {
    themeName: 'Science Fiction',
    tracks: [
      {
        url: "assets/audio/science fiction/Interstellar Official Soundtrack ｜ Cornfield Chase – Hans Zimmer ｜ WaterTower.mp3",
        eyebrow: 'Interstellar',
        title: 'Cornfield Chase',
        composer: 'Hans Zimmer',
      },
      {
        url: "assets/audio/science fiction/John Williams & Vienna Philharmonic – Williams： Imperial March (from “Star Wars”).mp3",
        eyebrow: 'Star Wars',
        title: 'The Imperial March',
        composer: 'John Williams',
      },
      {
        url: "assets/audio/science fiction/Star Trek - The Television Theme ｜ WDR Funkhausorchester.mp3",
        eyebrow: 'Star Trek',
        title: 'Titelthema',
        composer: 'Alexander Courage',
      },
      {
        url: "assets/audio/science fiction/Strauss： Also sprach Zarathustra ⧸ Dudamel · Berliner Philharmoniker.mp3",
        eyebrow: '2001: Odyssee im Weltraum',
        title: 'Also sprach Zarathustra',
        composer: 'Richard Strauss',
      },
      {
        url: "assets/audio/science fiction/John Williams - Wild Signals (Audio).mp3",
        eyebrow: 'Unheimliche Begegnung',
        title: 'Wild Signals',
        composer: 'John Williams',
      },
    ],
  },

  // 🕊️ VÖGEL (?playlist=voegel)
  voegel: {
    themeName: 'Vogelstimmen',
    tracks: [
      {
        url: "assets/audio/voegel/Carnival of the Animals： IX. The Cuckoo in the Depths of the Woods.mp3",
        eyebrow: 'Karneval der Tiere',
        title: 'Der Kuckuck im Wald',
        composer: 'Camille Saint-Saëns',
      },
      {
        url: "assets/audio/voegel/Carnival of the Animals： X. Aviary.mp3",
        eyebrow: 'Karneval der Tiere',
        title: 'Das Vogelhaus',
        composer: 'Camille Saint-Saëns',
      },
      {
        url: "assets/audio/voegel/Peter and the Wolf, Op. 67： The Bird.mp3",
        eyebrow: 'Peter und der Wolf',
        title: 'Der Vogel',
        composer: 'Sergei Prokofjew',
      },
      {
        url: "assets/audio/voegel/Respighi -- Gli Uccelli  V. 'Il Cucu'.mp3",
        eyebrow: 'Die Vögel (Gli Uccelli)',
        title: 'Il Cucù (Der Kuckuck)',
        composer: 'Ottorino Respighi',
      },
      {
        url: "assets/audio/voegel/Symphonie g-moll 'Die Henne'.mp3",
        eyebrow: 'Symphonie g-Moll',
        title: 'Die Henne',
        composer: 'Joseph Haydn',
      },
    ],
  },

  // 🎻 VIVALDI (?playlist=vivaldi)
  vivaldi: {
    themeName: 'Antonio Vivaldi',
    tracks: [
      {
        url: "assets/audio/Vivaldi/Vivaldi： The Four Seasons ⧸ Violin Concerto in G Minor, RV 315 'Summer'： III. Presto.mp3",
        eyebrow: 'Die vier Jahreszeiten',
        title: 'Der Sommer (Presto)',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/Vivaldi/Vivaldi： The Four Seasons, Winter, Violin Concerto in F Minor, RV 297, Op. 8 No. 4： I. Allegro....mp3",
        eyebrow: 'Die vier Jahreszeiten',
        title: 'Der Winter (Allegro)',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/Vivaldi/Gloria in D Major, RV 589： I. Gloria in excelsis Deo.mp3",
        eyebrow: 'Sakralmusik',
        title: 'Gloria in excelsis Deo',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/Vivaldi/Anne-Sophie Mutter, Mutter's Virtuosi - Vivaldi： Concerto 3 Violins in F Major, RV 551： III. Allegro.mp3",
        eyebrow: 'Konzert für 3 Violinen',
        title: 'Allegro in F-Dur',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/Vivaldi/Vivaldi： L'estro armonico, Concerto for 2 Violins in G Minor, RV 578, Op. 3 No. 2： III. Larghetto.mp3",
        eyebrow: 'L\'estro armonico',
        title: 'Larghetto in g-Moll',
        composer: 'Antonio Vivaldi',
      },
      {
        url: "assets/audio/Vivaldi/Vivaldi： Sinfonia for Strings in C, R. 111a - 1. Allegro.mp3",
        eyebrow: 'Sinfonia für Streicher',
        title: 'Allegro in C-Dur',
        composer: 'Antonio Vivaldi',
      },
    ],
  },

  // 🎨 IMPRESSIONISMUS (?playlist=impressionismus)
  impressionismus: {
    themeName: 'Impressionismus',
    tracks: [
      {
        url: "assets/audio/Impressionismus/Seong-Jin Cho – Debussy Suite bergamasque, L.75 III. Clair de lune - Deutsche Grammophon - DG (128k).mp3",
        eyebrow: 'Suite bergamasque',
        title: 'Clair de lune',
        composer: 'Claude Debussy',
      },
      {
        url: "assets/audio/Impressionismus/Erik Satie - Gnossienne No.3 - DistantMirrors (128k).mp3",
        eyebrow: 'Klavierstück',
        title: 'Gnossienne No. 3',
        composer: 'Erik Satie',
      },
      {
        url: "assets/audio/Impressionismus/Debussy Deux arabesques, L. 66 No. 1 Andante con moto - Menahem Pressler - Topic (128k).mp3",
        eyebrow: 'Zwei Arabesken',
        title: 'Deux arabesques No. 1',
        composer: 'Claude Debussy',
      },
      {
        url: "assets/audio/Impressionismus/Debussy La mer, CD 111 I. De l'aube à midi sur la mer - Berliner Philharmoniker (128k).mp3",
        eyebrow: 'La mer (Das Meer)',
        title: 'De l\'aube à midi sur la mer',
        composer: 'Claude Debussy',
      },
      {
        url: "assets/audio/Impressionismus/Bonis Soir, Matin, Op. 76 I. Soir - Boulanger Trio (128k).mp3",
        eyebrow: 'Kammermusik',
        title: 'Soir, Matin, Op. 76: I. Soir',
        composer: 'Mélanie Bonis',
      },
      {
        url: "assets/audio/Impressionismus/Lili Boulanger, Nocturne pour violon et piano (1911) - huakinthoi (128k).mp3",
        eyebrow: 'Violine & Klavier',
        title: 'Nocturne',
        composer: 'Lili Boulanger',
      },
    ],
  },

  // ⭐️ HOROSKOP (?playlist=horoskop)
  horoskop: {
    themeName: 'Horoskop',
    tracks: [
      {
        url: "assets/audio/horoskop/Debussy： Clair de lune ｜ Menahem Pressler, piano.mp3",
        eyebrow: 'Mondlicht',
        title: 'Clair de lune',
        composer: 'Claude Debussy',
      },
      {
        url: "assets/audio/horoskop/Saint-Saëns： Der Schwan ∙ hr-Sinfonieorchester ∙ Gautier Capuçon ∙ Alain Altinoglu.mp3",
        eyebrow: 'Karneval der Tiere',
        title: 'Der Schwan',
        composer: 'Camille Saint-Saëns',
      },
      {
        url: "assets/audio/horoskop/Hummelflug - Rimskij-Korsakow  ｜ WDR Funkhausorchester.mp3",
        eyebrow: 'Orchesterstück',
        title: 'Hummelflug',
        composer: 'Nikolai Rimski-Korsakow',
      },
      {
        url: "assets/audio/horoskop/Dukas - Der Zauberlehrling ｜ Martijn Dendievel ｜ WDR Sinfonieorchester.mp3",
        eyebrow: 'Symphonische Dichtung',
        title: 'Der Zauberlehrling',
        composer: 'Paul Dukas',
      },
      {
        url: "assets/audio/horoskop/Gustavo Dudamel - Beethoven： Symphony No. 5 - Mvmt 1 (Orquesta Sinfónica Simón Bolívar).mp3",
        eyebrow: 'Symphonie Nr. 5',
        title: 'Schicksalssymphonie (1. Satz)',
        composer: 'Ludwig van Beethoven',
      },
      {
        url: "assets/audio/horoskop/Carmen Oper -  Torrero Marsch.mp3",
        eyebrow: 'Oper Carmen',
        title: 'Torero-Marsch',
        composer: 'Georges Bizet',
      },
      {
        url: "assets/audio/horoskop/Lang Lang – Bach： The Well-Tempered Clavier： Book 1, 1.Prelude C Major, BWV 846.mp3",
        eyebrow: 'Wohltemperiertes Klavier',
        title: 'Präludium C-Dur',
        composer: 'Johann Sebastian Bach',
      },
      {
        url: "assets/audio/horoskop/Rafał Blechacz - Chopin： Waltz No. 7 in C-Sharp Minor, Op. 64 No. 2.mp3",
        eyebrow: 'Walzer',
        title: 'Walzer Nr. 7 in cis-Moll',
        composer: 'Frédéric Chopin',
      },
      {
        url: "assets/audio/horoskop/Amy Beach, Gaelic Symphony in E Minor – I. Allegro con fuoco.mp3",
        eyebrow: 'Gaelic Symphony',
        title: 'Allegro con fuoco',
        composer: 'Amy Beach',
      },
      {
        url: "assets/audio/horoskop/Boulanger - D’un matin de printemps ｜ Andris Poga ｜ WDR Sinfonieorchester.mp3",
        eyebrow: 'Orchesterwerk',
        title: 'D’un matin de printemps',
        composer: 'Lili Boulanger',
      },
      {
        url: "assets/audio/horoskop/Cécile Chaminade - Concertino for Flute and Piano (with Score).mp3",
        eyebrow: 'Flöte & Klavier',
        title: 'Concertino',
        composer: 'Cécile Chaminade',
      },
      {
        url: "assets/audio/horoskop/Tschaikowsky - Blumenwalzer - Der Nussknacker ｜ WDR Funkhausorchester.mp3",
        eyebrow: 'Der Nussknacker',
        title: 'Blumenwalzer',
        composer: 'Pjotr Iljitsch Tschaikowski',
      },
    ],
  },

  // 🎼 SCHERZO (?playlist=scherzo)
  scherzo: {
    themeName: 'Scherzo',
    tracks: [
      {
        url: "assets/audio/Scherzo/Klavierquintett in A-Dur, D.667： III. Scherzo Presto Trio.mp3",
        eyebrow: 'Forellenquintett',
        title: 'Scherzo (Presto)',
        composer: 'Franz Schubert',
      },
      {
        url: "assets/audio/Scherzo/Ludwig van Beethoven - Symphony No. 2 in D major op. 36 - III Scherzo. Allegro.mp3",
        eyebrow: 'Symphonie Nr. 2',
        title: 'Scherzo (Allegro)',
        composer: 'Ludwig van Beethoven',
      },
      {
        url: "assets/audio/Scherzo/Vienna Philharmonic – Mendelssohn： A Midsummer Night's Dream, Op. 61⧸4： Scherzo (SNC 2020).mp3",
        eyebrow: 'Ein Sommernachtstraum',
        title: 'Scherzo',
        composer: 'Felix Mendelssohn Bartholdy',
      },
      {
        url: "assets/audio/Scherzo/Quintet for Piano & Winds, Op. 8： III. Scherzo.mp3",
        eyebrow: 'Quintett Op. 8',
        title: 'Scherzo',
        composer: 'Heinrich von Herzogenberg',
      },
      {
        url: "assets/audio/Scherzo/Gravity.mp3",
        eyebrow: 'Filmmusik',
        title: 'Gravity',
        composer: 'Steven Price',
      },
    ],
  },

  // 🪕 THEREMIN (?playlist=theremin)
  theremin: {
    themeName: 'Theremin Klänge',
    tracks: [
      {
        url: "assets/audio/theremin/Fantasia for Theremin, Oboe, String Quartet, and Piano ｜ B. Martinů.mp3",
        eyebrow: 'Kammermusik',
        title: 'Fantasia für Theremin & Oboe',
        composer: 'Bohuslav Martinů',
      },
      {
        url: "assets/audio/theremin/Herrmann： The Day The Earth Stood Still.mp3",
        eyebrow: 'Der Tag, an dem die Erde stillstand',
        title: 'Hauptthema',
        composer: 'Bernard Herrmann',
      },
      {
        url: "assets/audio/theremin/Miklos Rozsa： Spellbound - Main Theme.mp3",
        eyebrow: 'Ich kämpfe um dich',
        title: 'Spellbound Theme',
        composer: 'Miklós Rózsa',
      },
      {
        url: "assets/audio/theremin/Kalevi Aho - Konzert für Theremin und Kammerorchester.mp3",
        eyebrow: 'Konzertstück',
        title: 'Konzert für Theremin',
        composer: 'Kalevi Aho',
      },
    ],
  },

  // 🎻 QUARTETT FRÜHLING (?playlist=quartettfruehling)
  quartettfruehling: {
    themeName: 'Quartett Frühling',
    tracks: [
      {
        url: "assets/audio/quartettfrühling/Vienna Philharmonic & Zubin Mehta - Grieg Morning Mood (Summer Night Concert 2015) - Sony Classical (128k).mp3",
        eyebrow: 'Peer Gynt',
        title: 'Morgenstimmung',
        composer: 'Edvard Grieg',
      },
      {
        url: "assets/audio/quartettfrühling/Delius On Hearing The First Cuckoo In Spring - English Chamber Orchestra - Topic (128k).mp3",
        eyebrow: 'Orchesterstück',
        title: 'On Hearing The First Cuckoo In Spring',
        composer: 'Frederick Delius',
      },
      {
        url: "assets/audio/quartettfrühling/The Hounds of Spring, Alfred Reed West Point Band - West Point Band (128k).mp3",
        eyebrow: 'Blasorchester',
        title: 'The Hounds of Spring',
        composer: 'Alfred Reed',
      },
      {
        url: "assets/audio/quartettfrühling/Vivaldi Four Seasons Spring (La Primavera) Full, original. Youssefian & Voices of Music RV 269 4K - Voices of Music (128k).mp3",
        eyebrow: 'Die vier Jahreszeiten',
        title: 'Der Frühling',
        composer: 'Antonio Vivaldi',
      },
    ],
  },

  // 🌊 DIE MOLDAU (?playlist=moldau)
  moldau: {
    themeName: 'Die Moldau',
    tracks: [
      {
        url: "assets/audio/Smetana ~ Moldau.mp3",
        eyebrow: 'Mein Vaterland',
        title: 'Die Moldau',
        composer: 'Bedřich Smetana',
      },
    ],
  },

  // 🎻 DVOŘÁK SCHERZO (?playlist=dvorak)
  dvorak: {
    themeName: 'Antonín Dvořák',
    tracks: [
      {
        url: "assets/audio/Dvořák： Piano Quintet No. 2 in A Major, Op. 81, B. 155： III. Scherzo (Furiant) . Molto vivace.mp3",
        eyebrow: 'Klavierquintett A-Dur',
        title: 'Scherzo (Furiant)',
        composer: 'Antonín Dvořák',
      },
    ],
  },

  // 🌌 JOHN CAGE (?playlist=johncage)
  johncage: {
    themeName: 'Neue Musik',
    tracks: [
      {
        url: "assets/audio/John Cage： Atlas Eclipticalis (1962).mp3",
        eyebrow: 'Neue Musik',
        title: 'Atlas Eclipticalis',
        composer: 'John Cage',
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
