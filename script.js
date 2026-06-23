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
  title: "Tum Hi Ho",
  artist: "Arijit Singh",
  duration: "4:27",
  src: "_Tum Hi Ho_ Aashiqui 2 Full Song With Lyrics _ Aditya Roy Kapur_ Shraddha Kapoor(MP3_160K)(1).mp3",
  cover: "aa.png"
},
{
  id: 2,
  title: "Ae Dil Hai Mushkil",
  artist: "Arijit Singh",
  duration: "5:00",
  src: "Ae Dil Hai Mushkil Title SongI Official Lyric VideoI Karan Johar_ Aishwarya_ Ranbir_ Anushka_ Pritam(MP3_160K)(1).mp3",
  cover: "ae dil.png"
},
{
  id: 3,
  title: "Agar Tum Saath Ho",
  artist: "Alka Yagnik & Arijit Singh",
  duration: "5:41",
  src: "Agar Tum Saath Ho FULL AUDIO Song _ Tamasha _ Ranbir Kapoor_ Deepika Padukone _ T-Series(MP3_160K)(1).mp3",
  cover: "agar tum.png"
},
{
  id: 4,
  title: "Samjhawan",
  artist: "Arijit Singh & Shreya Ghoshal",
  duration: "4:25",
  src: "Arijit Singh_ Shreya Ghoshal - Samjhawan - Lyric video _ Alia B_ Varun D _ Humpty Sharma Ki Dulhania(MP3_160K)(1).mp3",
  cover: "samjth.png"
},
{
  id: 5,
  title: "Chand Sifarish",
  artist: "Shaan & Kailash Kher",
  duration: "4:36",
  src: "Chand Sifarish _ Full Song _ Fanaa _ Aamir Khan_ Kajol _ Shaan_ Kailash Kher _ Jatin-Lalit _ Prasoon(MP3_160K)(1).mp3",
  cover: "chand.png"
},
{
  id: 6,
  title: "Channa Mereya",
  artist: "Arijit Singh",
  duration: "2:31",
  src: "Channa Mereya -  Ae Dil Hai Mushkil _ Karan Johar _ Ranbir _ Anushka _ Pritam _ Arijit Singh(MP3_160K)(1).mp3",
  cover: "channa.png"
},
{
  id: 7,
  title: "Galliyan",
  artist: "Ankit Tiwari",
  duration: "5:40",
  src: "Ek Villain_ Galliyan Full Audio Song _ Ankit Tiwari _ Sidharth Malhotra _ Shraddha Kapoor(MP3_160K)(1).mp3",
  cover: "galliyan.png"
},
{
  id: 8,
  title: "Guzarish",
  artist: "Javed Ali & Sonu Nigam",
  duration: "5:07",
  src: "Full Video_ Guzarish _ Ghajini _ Aamir Khan_ Asin _ A.R. Rahman _ Javed Ali_ Sonu Nigam(MP3_160K)(1).mp3",
  cover: "gazarish.png"
},
{
  id: 9,
  title: "Gerua",
  artist: "Arijit Singh & Antara Mitra",
  duration: "4:47",
  src: "Gerua - Shah Rukh Khan _ Kajol _ Dilwale _ Pritam _ Arijit Singh _ Antara Mitra(MP3_160K)(1).mp3",
  cover: "gerua.png"
},
{
  id: 10,
  title: "Billian Billian",
  artist: "Guri",
  duration: "3:17",
  src: "Guri _ Billian Billian (Official Video) Sukhe _ Satti Dhillon _ Punjabi Song _ GK Digital _ Geet MP3(M4A_128K)(1).m4a",
  cover: "billian billian.png"
},
{
  id: 11,
  title: "Jab Tak",
  artist: "Armaan Malik",
  duration: "2:25",
  src: "JAB TAK Video Song _ M.S. DHONI -THE UNTOLD STORY _ Armaan Malik_ Amaal Mallik _Sushant Singh Rajput(MP3_160K)(1).mp3",
  cover: "jab tak.png"
},
{
  id: 12,
  title: "Jattwaad",
  artist: "Harf Cheema & Gurlez Akhtar",
  duration: "3:37",
  src: "Jattwaad _ Harf Cheema _ Gurlez Akhtar (Official Song) Punjabi Songs _ Punjabi Hit Song _ Geet MP3(M4A_128K)(1).m4a",
  cover: "jattw.png"
},
{
  id: 13,
  title: "Kabhi Alvida Naa Kehna",
  artist: "Sonu Nigam & Alka Yagnik",
  duration: "6:43",
  src: "Kabhi Alvida Naa Kehna Full Video - Shahrukh Khan_ Rani _ Preity _ Abhishek _ Alka Yagnik(MP3_160K)(1).mp3",
  cover: "kabhi alvida.png"
},
{
  id: 14,
  title: "Kabhi Kabhie Mere Dil Mein",
  artist: "Lata Mangeshkar",
  duration: "4:39",
  src: "Kabhi Kabhie Mere Dil Mein (Female) - Full Song _ Kabhi Kabhie _ Shashi _ Rakhee _ Lata Mangeshkar(MP3_160K)(1).mp3",
  cover: "mera dil.png"
},
{
  id: 15,
  title: "Kaise Mujhe",
  artist: "Benny Dayal & Shreya Ghoshal",
  duration: "4:20",
  src: "Kaise Mujhe [Full Song] - Ghajini(MP3_160K)(1).mp3",
  cover: "kaise mujha.png"
},
{
  id: 16,
  title: "Kal Ho Naa Ho",
  artist: "Sonu Nigam",
  duration: "4:47",
  src: "Kal Ho Naa Ho (Title Track) - Full Video _ Shah Rukh Khan_ Saif Ali Khan_ Preity Zinta _ Sonu Nigam(MP3_160K)(1).mp3",
  cover: "kal ho.png"
},
{
  id: 17,
  title: "Kaun Tujhe",
  artist: "Palak Muchhal",
  duration: "4:01",
  src: "KAUN TUJHE Full Audio Song _ M.S. DHONI -THE UNTOLD STORY _ Sushant Singh_ Disha Patani _ T- Series(MP3_160K)(1).mp3",
  cover: "kaun tujha.png"
},
{
  id: 18,
  title: "Khuda Jaane",
  artist: "KK & Shilpa Rao",
  duration: "5:13",
  src: "Khuda Jaane _ Full Song _ Bachna Ae Haseeno _ Ranbir Kapoor_ Deepika _ Vishal _ Shekhar_ KK_ Shilpa(MP3_160K)(1).mp3",
  cover: "khuda.png"
},
{
  id: 19,
  title: "Do Pal",
  artist: "Lata Mangeshkar & Sonu Nigam",
  duration: "4:26",
  src: "Lyrical_ Do Pal Song with Lyrics _ Veer-Zaara _ Shah Rukh Khan _ Preity Zinta _ Javed Akhtar(MP3_160K)(1).mp3",
  cover: "do pal.png"
},
{
  id: 20,
  title: " Main Agar Kahoon",
  artist: "Sonu Nigam & Shreya Ghoshal",
  duration: "3:54",
  src:"Main Agar Kahoon Full HD Video Song Om Shanti Om _ ShahRukh Khan(MP3_160K).mp3",
  cover: "main agar.png"
}
,
{
  id: 21,
  title: "Mill Lo Na",
  artist: "Guri ft. Sukhe",
  duration: "3:00",
  src: "Mill Lo Na _ Guri Ft. Sukhe (Official Video) Jaani _ Satti Dhillon _ Punjabi Songs _ GK _ Geet MP3(M4A_128K).m4a",
  cover: "mill lo.png"
},
{
  id: 22,
  title: "NIRA ISHQ",
  artist: "Guri",
  duration: "3:14",
  src: "NIRA ISHQ _ GURI (Official Song) Satti Dhillon _ Romantic Song _ GK Digital _  Geet MP3(M4A_128K).m4a",
  cover: "nira.png"
},
{
  id: 23,
  title: "O Re Piya",
  artist: "Rahat Fateh Ali Khan",
  duration: "11:52",
  src: "O Re Piya Song _ Extended Version _ Aaja Nachle _ Madhuri Dixit_ Rahat Fateh Ali Khan_ Jaideep Sahni(MP3_160K).mp3",
  cover: "o re.png"
},
{
  id: 24,
  title: "Pheli Nazar Mein Kaise Jaado Kar Diya",
  artist: "Atif Aslam",
  duration: "3:36",
  src:"Pehli Nazar Mein Kaise Jaado Kar Diya _ Atif Aslam Hits _ Race I Akshaye_ Bipasha _ Saif Ali(MP3_160K).mp3",
  cover: "pehli nazar.png"
},
{
  id: 25,
  title: "PHIR KABHI",
  artist: "Arijit Singh",
  duration: "4:47",
  src:"PHIR KABHI- Full Song _ M.S. DHONI -THE UNTOLD STORY _ Arijit Singh _ Sushant Singh Disha Patani(MP3_160K).mp3",
  cover: "phir kabhi.png"
},
{
  id: 26,
  title: "Phulkari",
  artist: "Karan Randhawa & Simar Kaur",
  duration: "3:24",
  src: "Phulkari _ Karan Randhawa (Official Video) Simar Kaur _ Rav Dhillon _ GK Digital _ Geet MP3(M4A_128K).m4a",
  cover: "phulkari.png"
},
{
  id: 27,
  title: "PRADA",
  artist: "Jass Manak",
  duration: "3:11",
  src: "PRADA - JASS MANAK (Official Video) Satti Dhillon _ Latest Punjabi Song 2018 _ GK.DIGITAL _ Geet MP3(M4A_128K).m4a",
  cover: "prada.png"
},
{
  id: 28,
  title: "Sunn Raha Hai Na Tu",
  artist: "Ankit Tiwari",
  duration: "6:30",
  src: "Sunn Raha Hai Na Tu Aashiqui 2 Full Song With Lyrics _ Aditya Roy Kapur_ Shraddha Kapoor(MP3_160K).mp3",
  cover: "sunn raha.png"
},
{
  id: 29,
  title: "Tere Liye",
  artist: "Lata Mangeshkar & Roop Kumar Rathod",
  duration: "5:34",
  src:"Tere liye _ Song with Lyrics _ Veer-Zaara _ Shah Rukh Khan_ Preity Zinta _ Javed Akhtar_ Madan Mohan(MP3_160K).mp3",
  cover: "tere liya.png"
},
{
  id: 30,
  title: "Teri Khair Mangdi",
  artist: "Bilal Saeed",
  duration: "2:57",
  src: "Teri Khair Mangdi - Baar Baar Dekho _ Sidharth Malhotra _ Katrina Kaif _ Bilal Saeed(MP3_160K).mp3",
  cover: "teri khair.png"
},
{
  id: 31,
  title: "Tujh Mein Rab Dikhta Hai",
  artist: "Roop Kumar Rathod",
  duration: "4:41",
  src:"Tujh Mein Rab Dikhta Hai Song _ Rab Ne Bana Di Jodi _ Shah Rukh Khan_ Anushka Sharma _ Roop Kumar(MP3_160K).mp3",
  cover: "tujh mein rab.png"
},
{
  id: 32,
  title: "Yaar Beli",
  artist: "Guri",
  duration: "3:46",
  src: "Yaar Beli _ Guri (Official Video) Deep Jandu _ Parmish Verma _ Punjabi Song _ GK Digital _ Geet MP3(M4A_128K).m4a",
  cover: "yaar belli.png"
},
{
  id: 33,
  title: "Yeh Fitoor Mera",
  artist: "Arijit Singh",
  duration: "4:50",
  src: "Yeh Fitoor Mera - Full Song _ Fitoor _ Arijit Singh _ Aditya Roy Kapur_ Katrina Kaif _ Amit Trivedi(MP3_160K).mp3",
  cover: "yeh fitoor.png"
},
{
  id: 34,
  title: "Aarambh Hai Prachand",
  artist: "Piyush Mishra",
  duration: "4:46",
  src: "आरंभ है प्रचंड बोले मस्तको के झुंड _ Aarambh hai Prachand _ Full Song _ with हिन्दी(M4A_1).m4a",
  cover: "aarambh.png"
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
    recentlyPlayed: JSON.parse(localStorage.getItem('recentlyPlayed') || '[]'),
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

  function renderRecentSongs(){
    const recentList = document.getElementById('recentList');
    if (!recentList) return;

    recentList.innerHTML = '';
    const ids = Array.isArray(state.recentlyPlayed) ? state.recentlyPlayed : [];

    ids.forEach((id) => {
      const song = getSong(id);
      if (!song) return;

      const li = document.createElement('li');
      li.className = 'recent-item';
      li.innerHTML = `
        <span>${song.title}</span>
        <small>${song.artist}</small>
      `;
      li.addEventListener('click', () => loadSong(song.id, true));
      recentList.appendChild(li);
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

    state.recentlyPlayed = [
      id,
      ...(Array.isArray(state.recentlyPlayed) ? state.recentlyPlayed : []).filter((songId) => songId !== id)
    ].slice(0, 5);

    localStorage.setItem('recentlyPlayed', JSON.stringify(state.recentlyPlayed));
    renderRecentSongs();

 
    audio.pause();
    audio.currentTime = 0;
    audio.src = normalizedSrc;
    audio.load();

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
    renderList();
    renderRecentSongs();
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
  renderRecentSongs();
})();
