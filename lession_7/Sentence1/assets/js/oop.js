const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class MusicPlayer {
   constructor() {
      this.player = $(".player");
      this.cdThumb = $(".cd-thumb");
      this.heading = $(".infor h5");
      this.author = $(".infor h4");
      this.audio = $("#audio");
      this.timePlayed = $(".progress__time-playing");
      this.timeTotal = $(".progress__total-time");
      this.playlists = $(".playlist");
      this.progress = $(".progress___range");
      this.progressBar = $(".progress-bar");

      // btns controls
      this.repeatBtn = $(".btn-repeat");
      this.prevBtn = $(".btn-prev");
      this.playBtn = $(".btn-toggle-play");
      this.nextBtn = $(".btn-next");
      this.randomBtn = $(".btn-random");

      this.currentIndex = 0;
      this.isPlaying = false;
      this.isRepeat = false;

      this.songs = [
         {
            name: "Noi nay co anh",
            singer: "Son Tung mtp",
            path: "./assets/musics/NoiNayCoAnh-SonTungMTP-4772041.mp3",
            image: "./assets/images/noinaycoanh.jpg",
         },
         {
            name: "Thien ly oi",
            singer: "jack",
            path: "./assets/musics/thienlyoi.mp4",
            image: "./assets/images/thienlyoi.webp",
         },
         {
            name: "Chay ngay di",
            singer: "Son Tung mtp",
            path: "./assets/musics/chayngaydi.mp4",
            image: "./assets/images/chayngaydi.jpg",
         },
      ];

      this.isDragging = false;
      this.defineProperties();
      this.loadCurrentSong();
      this.handleEvents();
      this.render();
   }

   handleEvents() {
      const _this = this;

      this.playBtn.onclick = function () {
         _this.isPlaying ? _this.audio.pause() : _this.audio.play();
      };

      this.audio.onplay = () => {
         _this.isPlaying = true;
         _this.player.classList.add("playing");
      };

      this.audio.onpause = function () {
         _this.isPlaying = false;
         _this.player.classList.remove("playing");
      };

      this.nextBtn.onclick = function () {
         _this.nextSong();
         _this.audio.play();
         _this.render();
      };

      this.prevBtn.onclick = function () {
         _this.prevSong();
         _this.audio.play();
         _this.render();
      };

      this.repeatBtn.onclick = function () {
         _this.isRepeat = !_this.isRepeat;
         _this.repeatBtn.classList.toggle("active", _this.isRepeat);
      };

      this.audio.ontimeupdate = function () {
         if (_this.audio.duration) {
            const progressPercent = Math.floor(
               (_this.audio.currentTime / _this.audio.duration) * 100
            );
            _this.progress.style.width = `${progressPercent}%`;
            const minutes = Math.floor(_this.audio.currentTime / 60);
            const seconds = Math.floor(_this.audio.currentTime % 60);
            const formattedSeconds = String(seconds).padStart(2, "0");
            _this.timePlayed.textContent = `${minutes}:${formattedSeconds}`;

            const remainingTime =
               _this.audio.duration - _this.audio.currentTime;
            const remainingMinutes = Math.floor(remainingTime / 60);
            const remainingSeconds = Math.floor(remainingTime % 60);
            const formattedRemainingSeconds = String(remainingSeconds).padStart(
               2,
               "0"
            );
            _this.timeTotal.textContent = `-${remainingMinutes}:${formattedRemainingSeconds}`;
         }
      };

      this.progressBar.addEventListener("mousedown", (e) => {
         this.isDragging = true;
         this.setProgress(e);
      });

      this.progressBar.addEventListener("mousemove", (e) => {
         if (this.isDragging) {
            this.setProgress(e);
         }
      });

      document.addEventListener("mouseup", () => {
         this.isDragging = false;
      });

      this.progressBar.addEventListener("mouseleave", () => {
         this.isDragging = false;
      });

      this.playlists.onclick = function (e) {
         const songNode = e.target.closest(".song:not(.active)");
         if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            _this.audio.play();
         }
      };

      this.audio.onended = () => {
         if (_this.isRepeat) {
            _this.audio.play();
         } else {
            _this.nextBtn.click();
         }
      };
   }

   render() {
      const htmls = this.songs.map((song, index) => {
         return `
            <div class="song ${
               index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                   song.image
                }')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
      });
      this.playlists.innerHTML = htmls.join("");
   }

   defineProperties() {
      Object.defineProperty(this, "currentSong", {
         get: function () {
            return this.songs[this.currentIndex];
         },
      });
   }

   loadCurrentSong() {
      this.heading.textContent = this.currentSong.name;
      this.author.textContent = this.currentSong.singer;
      this.cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      this.audio.src = this.currentSong.path;
   }

   nextSong() {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
         this.currentIndex = 0;
      }
      this.loadCurrentSong();
   }

   prevSong() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
         this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
   }

   setProgress(e) {
      const width = this.progressBar.clientWidth;
      const clickX = e.offsetX;
      const duration = this.audio.duration;
      this.audio.currentTime = (clickX / width) * duration;
   }
}

const musicPlayer = new MusicPlayer();
