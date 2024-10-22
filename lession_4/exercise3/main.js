// import questions from "./db.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const content = $("#main");
const inputAnswer = $("#userAnswer");
const gameWord = {
   questions: [
      {
         content: "Sông nào chảy qua Hà Nội",
         image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/MatnuocSongHong-06112008333.JPG",
         correctAnswer: "Sông Hồng",
         maxShowingCharacter: 2,
      },
      {
         content: "Ai là người phát minh ra bóng đèn sợi đốt",
         image: "https://st.quantrimang.com/photos/image/2016/10/25/thomsa-edison-4.jpg",
         correctAnswer: "Edison",
         maxShowingCharacter: 3,
      },
      {
         content: "Nguời giàu nhất thế giới ",
         image: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455",
         correctAnswer: "Jezz Bezos",
         maxShowingCharacter: 2,
      },
      {
         content: "Thủ đô của Belarus",
         image: "",
         correctAnswer: "Minsk",
         maxShowingCharacter: 3,
      },
   ],
   currentQuestionIndex: 0,
   render: function () {
      const questions = this.questions[this.currentQuestionIndex];
      const correctAnswer = questions.correctAnswer;
      const answerLong = correctAnswer
         .split("")
         .filter((char) => char.trim() !== "");
      const htmls = `
        <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img src=${questions.image}
                alt="card-image" class="w-full h-full object-cover" />
        </div>
        <div class="px-4 mt-4 flex justify-center">
            <div class="mb-2">
                <h6 class="text-slate-800 text-xl font-semibold">
                ${questions.content} ?
                </h6>
            </div>
        </div>
        <div class="group w-full my-3 inline-flex flex-wrap justify-center items-center gap-2">
            ${answerLong
               .map((item, index) => {
                  return `
                  <div>
                        <div id="key-${index}"
                           class="rounded-full cursor-pointer border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm">
                        </div>
                  </div>
                  `;
               })
               .join("")}  
            </div>
        `;
      content.innerHTML = htmls;
   },

   checkResult: function () {
      const questions = this.questions[this.currentQuestionIndex];
      const correctAnswer = questions.correctAnswer.trim();
      const valueUserAnswer = inputAnswer.value.trim();
      const normalizedCorrectAnswer = correctAnswer
         .normalize("NFD")
         .toLowerCase();
      const normalizedUserAnswer = valueUserAnswer
         .normalize("NFD")
         .toLowerCase();
      if (normalizedUserAnswer === normalizedCorrectAnswer) {
         alert("đúng rồi");
         correctAnswer
            .split("")
            .filter((char) => char.trim() !== "")
            .forEach((key, index) => {
               const element = $(`#key-${index}`);
               if (element) {
                  element.textContent = key;
                  inputAnswer.value = "";
               }
            });
         this.startCountdown(3);
      } else {
         alert("sai rồi");
         correctAnswer
            .split("")
            .filter((char) => char.trim() !== "")
            .forEach((key, index) => {
               const element = $(`#key-${index}`);
               if (element) {
                  element.textContent = key;
               }
            });
         setTimeout(() => {
            this.currentQuestionIndex = 0;
            inputAnswer.value = "";
            this.render();
         }, 2000);
      }
   },

   startCountdown: function (seconds) {
      const countdownElement = $("#countdown");

      const interval = setInterval(() => {
         countdownElement.textContent = `Câu tiếp theo sẽ xuất hiện trong: ${seconds}s`;
         seconds--;
         if (seconds < 0) {
            this.nextQuestion();
            this.render();
            countdownElement.textContent = "";
            clearInterval(interval);
         }
      }, 1000);
   },

   nextQuestion: function () {
      this.currentQuestionIndex++;
   },

   start: function () {
      this.render();

      $("#form").addEventListener("submit", (e) => {
         e.preventDefault();
         this.checkResult();
      });
   },
};

gameWord.start();
