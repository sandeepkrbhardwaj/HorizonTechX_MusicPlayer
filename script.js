/* ===================================================================
   WAX — Glass Turntable Music Player
   Vanilla JS, ES6+. No frameworks, no build step.
   =================================================================== */

(() => {
  'use strict';

  /* ---------------------------------------------------------------
     1. DATA — sample playlist
     Audio: royalty-free demo tracks from SoundHelix (commonly used
     as placeholder audio). Covers: seeded Picsum images so every
     song gets a unique, stable piece of "album art".
  --------------------------------------------------------------- */
  const SONGS = [
  {
    id: 1,
    title: "Aarambh Hai Prachand",
    artist: "Piyush Mishra",
    duration: "4:58",
    src: "songs/आरंभ है प्रचंड बोले मस्तको के झुंड _ Aarambh hai Prachand _ Full Song _ with हिन्दी(M4A_1.m4a",
    cover: "images/ram1.jpg"
  },
  {
    id: 2,
    title: "Mhara Ujjain Ka Maharaja",
    artist: "Bhajan",
    duration: "6:40",
    src: "songs/खम्मा रे खम्मा _ Mhara Ujjain Ka Maharaja Ne Khamma Re Khamma _  Nitin bagwan(M4A_128K).m4a",
    cover:"images/ram2.jpg"
  },
  {
    id: 3,
    title: "Govind Tumhare Charno Mein",
    artist: "Bhajan",
    duration: "6:12",
    src: "songs/गोविंद तुम्हारे चरणों में एक प्रेम पुजारी आया है _ Govind tumhare charn(M4A_1.m4a",
    cover: "images/ram3.jpg"
  },
  {
    id: 4,
    title: "Daya Thodi Si Kar Do Na",
    artist: "Khatu Shyam Bhajan",
    duration: "7:30",
    src: "songs/दया थोड़ी सी कर दो ना _ Khatu Shyam Bhajan 2021 _ Daya Thodi Si Kar Do Na by Nisha Dwivedi(M4A_128K).m4a",
    cover: "images/ram4.jpg"
  },
  {
    id: 5,
    title: "Shri Ram Ki Gali Mein Tum Jana",
    artist: "Ram Bhajan",
    duration: "3:15",
    src: "songs/श्री राम की गली में तुम जाना (Nachte Milenge Hanumana) Tanvi Senjaliya(M4A_128K).m4a",
    cover: "images/ram5.jpg"
  },
  {
    id: 6,
    title: "Wahan Nachte Milenge Hanuman",
    artist: "Hanuman Bhajan",
    duration: "3:30",
    src: "songs/वहाँ नाचते मिलेंगे हनुमान _ Wahan Nachte Milenge Hanuman _ Full Song _ with हिन्दी(M4A_1.m4a",
    cover: "images/ram6.jpg"
  },
  {
    id: 7,
    title: "Shree Hanuman Chalisa",
    artist: "Hariharan",
    duration: "9:30",
    src: "songs/श्री हनुमान चालिसा _ Shree Hanuman Chalisa _ Full Song _ with हिन्दी(M4A_1.m4a",
    cover: "images/ram7.jpg"
  },
  {
    id: 8,
    title: "Sitaram Sitaram Kahiye",
    artist: "Ram Bhajan",
    duration: "5:45",
    src: "songs/सिताराम सिताराम कहिये _ Sitaram Sitaram Kahiye _ Full Song _ with हिन्दी(M4A_1.m4a",
    cover: "images/ram8.jpg"
  }
];

  /* ---------------------------------------------------------------
     2. STATE
  --------------------------------------------------------------- */
  const state = {
    currentId: SONGS[0].id,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 'off',        // off | all | one
    favorites: new Set(JSON.parse(localStorage.getItem('wax-favorites') || '[]')),
    activeTab: 'all',         // all | favorites
    query: '',
    shuffleHistory: [],       // played order, for sensible "previous" while shuffling
  };

  /* ---------------------------------------------------------------
     3. DOM REFS
  --------------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const audio          = $('#audio');
  const vinyl           = $('#vinyl');
  const tonearm          = $('#tonearm');
  const albumArt          = $('#albumArt');
  const songTitle          = $('#songTitle');
  const songArtist          = $('#songArtist');
  const currentTimeEl        = $('#currentTime');
  const durationTimeEl        = $('#durationTime');
  const seekBar                 = $('#seekBar');
  const volumeBar                = $('#volumeBar');
  const playBtn                   = $('#playBtn');
  const prevBtn                    = $('#prevBtn');
  const nextBtn                     = $('#nextBtn');
  const shuffleBtn                   = $('#shuffleBtn');
  const repeatBtn                     = $('#repeatBtn');
  const repeatOneDot                   = $('#repeatOneDot');
  const favBtn                          = $('#favBtn');
  const trackListEl                      = $('#trackList');
  const searchInput                       = $('#searchInput');
  const tabs                               = document.querySelectorAll('.tab');
  const themeToggle                         = $('#themeToggle');
  const toastEl                              = $('#toast');

  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  /* ---------------------------------------------------------------
     4. HELPERS
  --------------------------------------------------------------- */
  const getSong = (id) => SONGS.find((s) => s.id === id);
  const currentSong = () => getSong(state.currentId);

  function formatTime(sec){
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  let toastTimer;
  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
  }

  function visibleList(){
    const q = state.query.trim().toLowerCase();
    return SONGS.filter((s) => {
      const inTab = state.activeTab === 'all' || state.favorites.has(s.id);
      const matchesQuery = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
      return inTab && matchesQuery;
    });
  }

  /* ---------------------------------------------------------------
     5. PLAYLIST RENDER
  --------------------------------------------------------------- */
  function renderList(){
    const list = visibleList();
    trackListEl.innerHTML = '';

    if (!list.length){
      const empty = document.createElement('li');
      empty.className = 'list-empty';
      empty.textContent = state.activeTab === 'favorites'
        ? 'No favorites yet — tap the heart on a song to save it here.'
        : 'No songs match your search.';
      trackListEl.appendChild(empty);
      return;
    }

    list.forEach((song) => {
      const li = document.createElement('li');
      li.className = 'track-item' + (song.id === state.currentId ? ' playing' : '');
      li.dataset.id = song.id;

      const isFav = state.favorites.has(song.id);
      li.innerHTML = `
        <img class="track-thumb" src="${song.cover}" alt="${song.title} cover" loading="lazy" />
        <div class="track-info-row">
          <h4>${song.title}</h4>
          <p>${song.artist}</p>
        </div>
        ${song.id === state.currentId && state.isPlaying
          ? '<div class="playing-bars"><span></span><span></span><span></span></div>'
          : `<span class="track-duration">${song.duration}</span>`}
        <button class="track-fav ${isFav ? 'active' : ''}" type="button" aria-label="Toggle favorite" title="Favorite">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10.2-9.3C.2 8.6 1.6 5 5.1 5c2 0 3.4 1.1 4.1 2.2C9.9 6.1 11.3 5 13.3 5c3.5 0 4.9 3.6 3.3 6.7C19 16.1 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
        </button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.closest('.track-fav')) return; // handled separately
        loadSong(song.id, true);
      });
      li.querySelector('.track-fav').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(song.id, e.currentTarget);
      });

      trackListEl.appendChild(li);
    });
  }

  function toggleFavorite(id, btn){
    const wasFav = state.favorites.has(id);
    wasFav ? state.favorites.delete(id) : state.favorites.add(id);
    localStorage.setItem('wax-favorites', JSON.stringify([...state.favorites]));

    btn?.classList.toggle('active', !wasFav);
    btn?.classList.add('bump');
    setTimeout(() => btn?.classList.remove('bump'), 350);

    if (id === state.currentId) syncFavButton();
    showToast(wasFav ? 'Removed from favorites' : 'Added to favorites');

    if (state.activeTab === 'favorites') renderList(); // keep favorites tab accurate
  }

  function syncFavButton(){
    favBtn.classList.toggle('active', state.favorites.has(state.currentId));
  }

  /* ---------------------------------------------------------------
     6. PLAYBACK
  --------------------------------------------------------------- */
  function loadSong(id, autoplay = false){
    const song = getSong(id);
    if (!song) return;
    state.currentId = id;

    audio.src = song.src;
    albumArt.src = song.cover;
    albumArt.alt = `${song.title} cover`;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    seekBar.value = 0;
    seekBar.style.setProperty('--p', '0%');
    currentTimeEl.textContent = '0:00';
    durationTimeEl.textContent = song.duration;

    syncFavButton();
    renderList();

    if (autoplay) play();
    if (!state.shuffleHistory.includes(id)) state.shuffleHistory.push(id);
  }

  function play(){
    audio.play().then(() => {
      state.isPlaying = true;
      updatePlayUI();
    }).catch(() => showToast('Tap play again — audio needs a user click to start'));
  }
  function pause(){
    audio.pause();
    state.isPlaying = false;
    updatePlayUI();
  }
  function updatePlayUI(){
    iconPlay.hidden = state.isPlaying;
    iconPause.hidden = !state.isPlaying;
    playBtn.setAttribute('aria-label', state.isPlaying ? 'Pause' : 'Play');
    vinyl.classList.toggle('spinning', state.isPlaying);
    tonearm.classList.toggle('playing', state.isPlaying);
    renderList(); // refresh playing-bars indicator
  }

  playBtn.addEventListener('click', () => (state.isPlaying ? pause() : play()));

  function getQueue(){
    return visibleList().length ? visibleList() : SONGS;
  }

  function nextSong(){
    const queue = getQueue();
    if (!queue.length) return;

    if (state.isShuffle){
      if (queue.length === 1){ loadSong(queue[0].id, true); return; }
      let pick;
      do { pick = queue[Math.floor(Math.random() * queue.length)]; } while (pick.id === state.currentId);
      loadSong(pick.id, true);
      return;
    }
    const idx = queue.findIndex((s) => s.id === state.currentId);
    const nextIdx = (idx + 1) % queue.length;
    if (idx === queue.length - 1 && state.repeatMode === 'off'){
      pause(); // reached end of queue, no repeat
      return;
    }
    loadSong(queue[nextIdx].id, true);
  }

  function prevSong(){
    // If we're more than 3s into the track, restart it instead of skipping back
    if (audio.currentTime > 3){ audio.currentTime = 0; return; }
    const queue = getQueue();
    if (!queue.length) return;
    const idx = queue.findIndex((s) => s.id === state.currentId);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    loadSong(queue[prevIdx].id, true);
  }

  nextBtn.addEventListener('click', nextSong);
  prevBtn.addEventListener('click', prevSong);

  audio.addEventListener('ended', () => {
    if (state.repeatMode === 'one'){
      audio.currentTime = 0;
      play();
    } else {
      nextSong();
    }
  });

  /* ---------------------------------------------------------------
     7. PROGRESS / SEEK
  --------------------------------------------------------------- */
  audio.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    seekBar.value = pct;
    seekBar.style.setProperty('--p', `${pct}%`);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  seekBar.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (seekBar.value / 100) * audio.duration;
    seekBar.style.setProperty('--p', `${seekBar.value}%`);
  });

  // Buffering feedback
  audio.addEventListener('waiting', () => playBtn.style.opacity = '.6');
  audio.addEventListener('canplay', () => playBtn.style.opacity = '1');

  /* ---------------------------------------------------------------
     8. VOLUME
  --------------------------------------------------------------- */
  function setVolume(v){
    audio.volume = Math.min(Math.max(v, 0), 100) / 100;
    volumeBar.value = v;
    volumeBar.style.setProperty('--p', `${v}%`);
    localStorage.setItem('wax-volume', String(v));
  }
  volumeBar.addEventListener('input', () => setVolume(Number(volumeBar.value)));

  let mutedVolume = 80;
  $('.vol-icon').addEventListener('click', () => {
    if (audio.volume > 0){
      mutedVolume = Number(volumeBar.value);
      setVolume(0);
    } else {
      setVolume(mutedVolume || 80);
    }
  });

  /* ---------------------------------------------------------------
     9. SHUFFLE / REPEAT
  --------------------------------------------------------------- */
  shuffleBtn.addEventListener('click', () => {
    state.isShuffle = !state.isShuffle;
    shuffleBtn.classList.toggle('active', state.isShuffle);
    showToast(state.isShuffle ? 'Shuffle on' : 'Shuffle off');
  });

  repeatBtn.addEventListener('click', () => {
    const order = ['off', 'all', 'one'];
    state.repeatMode = order[(order.indexOf(state.repeatMode) + 1) % order.length];
    repeatBtn.classList.toggle('active', state.repeatMode !== 'off');
    repeatOneDot.hidden = state.repeatMode !== 'one';
    showToast(`Repeat: ${state.repeatMode === 'off' ? 'off' : state.repeatMode === 'all' ? 'all tracks' : 'one track'}`);
  });

  /* ---------------------------------------------------------------
     10. FAVORITE (main player heart)
  --------------------------------------------------------------- */
  favBtn.addEventListener('click', () => toggleFavorite(state.currentId, favBtn));

  /* ---------------------------------------------------------------
     11. SEARCH + TABS
  --------------------------------------------------------------- */
  let searchDebounce;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.query = e.target.value;
      renderList();
    }, 150);
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeTab = tab.dataset.tab;
      renderList();
    });
  });

  /* ---------------------------------------------------------------
     12. THEME
  --------------------------------------------------------------- */
  function initTheme(){
    const saved = localStorage.getItem('wax-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.body.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
  }
  themeToggle.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('wax-theme', next);
  });

  /* ---------------------------------------------------------------
     13. KEYBOARD SHORTCUTS
  --------------------------------------------------------------- */
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return; // don't hijack typing in search
    switch (e.key){
      case ' ': e.preventDefault(); state.isPlaying ? pause() : play(); break;
      case 'ArrowRight': nextSong(); break;
      case 'ArrowLeft': prevSong(); break;
      case 'ArrowUp': e.preventDefault(); setVolume(Math.min(100, Number(volumeBar.value) + 5)); break;
      case 'ArrowDown': e.preventDefault(); setVolume(Math.max(0, Number(volumeBar.value) - 5)); break;
      case 's': case 'S': shuffleBtn.click(); break;
      case 'r': case 'R': repeatBtn.click(); break;
      case 'l': case 'L': favBtn.click(); break;
      case 'm': case 'M': $('.vol-icon').click(); break;
    }
  });

  /* ---------------------------------------------------------------
     14. INIT
  --------------------------------------------------------------- */
  initTheme();
  const savedVolume = Number(localStorage.getItem('wax-volume') || 80);
  setVolume(savedVolume);
  loadSong(state.currentId, false);
  renderList();
})();