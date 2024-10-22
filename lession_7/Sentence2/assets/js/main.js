const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let score = 0;
const circles = $(".circles");
const bin = $(".bin");
const scoreDisplay = $("#score");
const binRect = bin.getBoundingClientRect();
let binPosition = bin.getBoundingClientRect().left;
let currentCircleChar = "";
let currentCirclePosition = "";
const game = {
   // Tạo vòng tròn để rơi xuống
   createCircle: function () {
      const circle = document.createElement("div");
      const windowHeight = window.innerHeight;
      const keyWords = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      const randomIndex = Math.floor(Math.random() * keyWords.length);
      circle.className =
         "circle flex items-center absolute top-0 justify-center w-16 h-16 bg-blue-500 text-white text-lg font-bold rounded-full";
      currentCircleChar = keyWords[randomIndex];
      circle.textContent = currentCircleChar;
      circle.style.backgroundColor = this.getRandomColor();
      currentCirclePosition = `${Math.random() * (window.innerWidth - 64)}`;
      circle.style.left = `${currentCirclePosition}px`;
      circles.appendChild(circle);
      setTimeout(() => {
         circle.classList.add("falling");
      }, 50);
      const removeAndScoreInterval = setInterval(() => {
         const circleRect = circle.getBoundingClientRect();
         const binRect = bin.getBoundingClientRect();
         if (circleRect.top >= windowHeight - circleRect.height) {
            circle.remove();
            clearInterval(removeAndScoreInterval);
         }

         if (
            circleRect.bottom >= binRect.top &&
            circleRect.left >= binRect.left &&
            circleRect.left <= binRect.right
         ) {
            score++;
            scoreDisplay.textContent = score;
            circle.remove();
            clearInterval(removeAndScoreInterval);
         }
      }, 100);
   },
   // Làm cho cái thùng di chuyển
   moveBin: function () {
      document.addEventListener("keydown", (e) => {
         const binWidth = bin.offsetWidth;
         const windowWidth = window.innerWidth;
         const keydown = e.key.toUpperCase();
         if (keydown === currentCircleChar) {
            binPosition = currentCirclePosition + binRect.width;
         }

         if (e.key === "ArrowLeft") {
            binPosition = Math.max(binPosition - 20, binWidth / 2);
         } else if (e.key === "ArrowRight") {
            binPosition = Math.min(
               binPosition + 20,
               windowWidth - binWidth / 2
            );
         }

         bin.style.left = `${binPosition}px`;
      });
   },

   getRandomColor: function () {
      let color = "#";
      const letters = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   },

   start() {
      this.createCircle();
      this.moveBin();
      setInterval(this.createCircle.bind(this), 3700);
   },
};

game.start();
