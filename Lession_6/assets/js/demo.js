const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Tạo các biến
const player = $(".player");
const cdThumd = $(".cd-thumb");
const heading = $(".infor h5");
const author = $(".infor h4");
const audio = $("#audio");
const timePlayed = $(".progress__time-playing");
const timeTotal = $(".progress__total-time");
const playlists = $(".playlist");
const progress = $(".progress___range");
const progressBar = $(".progress-bar");

// btns controls
const repeatBtn = $(".btn-repeat");
const prevBtn = $(".btn-prev");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");

const app = {
   currentIndex: 0,
   isPlaying: false,
   isRepeat: false,
   songs: [
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
   ],

   handleEvents: function () {
      const _this = this;
      playBtn.onclick = function () {
         if (_this.isPlaying) {
            audio.pause();
         } else {
            audio.play();
         }
      };
      audio.onplay = () => {
         _this.isPlaying = true;
         player.classList.add("playing");
      };

      audio.onpause = function () {
         _this.isPlaying = false;
         player.classList.remove("playing");
      };

      nextBtn.onclick = function () {
         _this.nextSong();
         audio.play();
         _this.render();
      };

      prevBtn.onclick = function () {
         _this.prevSong();
         audio.play();
         _this.render();
      };
      repeatBtn.onclick = function () {
         _this.isRepeat = !_this.isRepeat;
         repeatBtn.classList.toggle("active", _this.isRandom);
      };
      // progress
      audio.ontimeupdate = function () {
         if (audio.duration) {
            const progressPercent = Math.floor(
               (audio.currentTime / audio.duration) * 100
            );
            progress.style.width = `${progressPercent}%`;
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            const formattedSeconds = String(seconds).padStart(2, "0");
            timePlayed.textContent = `${minutes}:${formattedSeconds}`;

            // Tính toán và hiển thị thời gian còn lại
            const remainingTime = audio.duration - audio.currentTime;
            const remainingMinutes = Math.floor(remainingTime / 60);
            const remainingSeconds = Math.floor(remainingTime % 60);
            const formattedRemainingSeconds = String(remainingSeconds).padStart(
               2,
               "0"
            );
            timeTotal.textContent = `-${remainingMinutes}:${formattedRemainingSeconds}`;
         }
      };

      // progressBar.addEventListener("click", (e) => {
      //    // Lấy chiều rộng của thanh
      //    const width = progressBar.clientWidth;
      //    // Vị trí click trên thanh
      //    const clickX = e.offsetX;
      //    const duration = audio.duration;
      //    audio.currentTime = (clickX / width) * duration;
      // });

      // Hàm xử lý khi kéo
      function setProgress(e) {
         const width = progressBar.clientWidth;
         const clickX = e.offsetX;
         const duration = audio.duration;
         audio.currentTime = (clickX / width) * duration;
      }
      // Xử lý bắt đầu kéo
      progressBar.addEventListener("mousedown", (e) => {
         isDragging = true;
         setProgress(e);
      });

      // Xử lý khi kéo
      progressBar.addEventListener("mousemove", (e) => {
         if (isDragging) {
            setProgress(e);
         }
      });

      // Xử lý khi kết thúc kéo
      document.addEventListener("mouseup", () => {
         isDragging = false;
      });

      // Xử lý khi rời chuột ra ngoài mà không nhả
      progressBar.addEventListener("mouseleave", () => {
         isDragging = false;
      });

      //   khi click vào playlist
      playlists.onclick = function (e) {
         const songNode = e.target.closest(".song:not(.active");
         _this.currentIndex = Number(songNode.dataset.index);
         _this.loadCurrentSong();
         _this.render();
         audio.play();
      };

      audio.onended = () => {
         if (_this.isRepeat) {
            audio.play();
         } else {
            nextBtn.click();
         }
      };
   },

   render: function () {
      const htmls = this.songs.map((song, index) => {
         return `
         <div class="song ${
            index === this.currentIndex ? "active" : ""
         } " data-index="${index}">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class=" body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `;
      });
      playlists.innerHTML = htmls.join("");
   },

   defineProperties: function () {
      Object.defineProperty(this, "currentSong", {
         get: function () {
            return this.songs[this.currentIndex];
         },
      });
   },

   loadCurrentSong: function () {
      heading.textContent = this.currentSong.name;
      author.textContent = this.currentSong.singer;
      cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;
   },

   nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
         this.currentIndex = 0;
      }
      this.loadCurrentSong();
   },

   prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
         this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
   },

   start: function () {
      this.defineProperties();
      this.loadCurrentSong();
      this.handleEvents();
      this.render();
   },
};

app.start();
