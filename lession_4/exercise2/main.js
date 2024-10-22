// B1: Thiết lập cấu trúc html
// B2: Tạo câu hỏi trắc nghiệm và các phương án
// B3: hiện thị câu hỏi trắc nghiệm
// B4: Xử lý thông tin người dùng và chấm điểm
// B5: Tính toán kết quả
import questions from "./db.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const quiz = {
   // fake data
   // questions: [
   //    {
   //       content: "Câu hỏi 1: Đông Lào là nước nào ?",
   //       answers: ["A.Việt Nam", "B.Lào", "C.Philipine", "D.Indonesia"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 2: Tây Lào là nước nào",
   //       answers: ["A.Miến Điện", "B.Ấn Độ", "C.Nepal", "D.Thái Lan"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 3: Nam Lào là nước nào",
   //       answers: ["A.Campuchia", "B.Malaysia", "C.Singapore", "D.Việt Nam"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 4: Bắc Lào là nước nào",
   //       answers: ["A.Trung Quốc", "B.Hàn Quốc", "C.Nhật Bản", "D.Hoa Kỳ"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 5: Lào có bao nhiêu tỉnh thành",
   //       answers: ["A.14", "B.15", "C.16", "D.17"],
   //       correctAnswer: 1,
   //    },
   //    {
   //       content: "Câu hỏi 6: Đâu là thủ đô của Lào",
   //       answers: ["A.Hà Nội", "B.Bangkok", "C.Vientiane", "D.Phnom Penh"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 7: Lào có biển không",
   //       answers: ["A.Có", "B.Không", "C.Có và không", "D.Không và có"],
   //       correctAnswer: 1,
   //    },
   //    {
   //       content: "Câu hỏi 8: Lào có sân bay quốc tế không",
   //       answers: ["A.Có", "B.Không", "C.Có và không", "D.Không và có"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 9: Lào có biên giới với Việt Nam không",
   //       answers: ["A.Có", "B.Không", "C.Có và không", "D.Không và có"],
   //       correctAnswer: 0,
   //    },
   //    {
   //       content: "Câu hỏi 10: Thủ đô của Brueni là gì",
   //       answers: [
   //          "A.Bangkok",
   //          "B.Bandar Seri Begawan",
   //          "C.Vientiane",
   //          "D.Phnom Penh",
   //       ],
   //       correctAnswer: 1,
   //    },
   // ],

   // variables
   questions: questions,
   questionIndex: 0,
   score: 0,
   render: function () {
      if (this.questionIndex < this.questions.length) {
         const question = this.questions[this.questionIndex];
         const htmls = `
         <div>
            <p class="question">${question.content}</p>
            ${question.answers
               .map((item, i) => {
                  return `
                  <div class="answers">
                     <div class="answer" data-index="${i}">${item}</div>
                  </div> 
               `;
               })
               .join("")}
         </div>
      `;
         $("#content_question").innerHTML = htmls;
         $("#next-question").style.display = "none";
      } else {
         this.showResult();
      }
   },

   handleAnwers: function () {
      const answers = $$(".answer");
      answers.forEach((answer) => {
         answer.addEventListener("click", () => {
            answer.classList.add("active");
            const selectAnswerIndex = Number(answer.getAttribute("data-index"));
            this.checkAnswers(selectAnswerIndex);
            answers.forEach((ans) => {
               if (ans !== answer) {
                  ans.classList.add("disabled");
               }
            });
         });
      });
   },

   checkAnswers: function (selectedAnswerIndex) {
      const question = this.questions[this.questionIndex];
      if (selectedAnswerIndex === question.correctAnswer) {
         this.score++;
         alert("Bạn đã chọn đáp án đúng!");
         this.updateScore();
      } else {
         alert("Bạn đã chọn đáp án sai!");
      }
      $("#next-question").style.display = "block";
   },

   updateScore: function () {
      $("#score").innerText = this.score;
   },

   showResult: function () {
      $("#content_question").innerHTML = `
         <div class="flex justify-center">
            <p class="result text-[60px]">Bạn đã trả lời đúng ${this.score}/${this.questions.length} câu hỏi!</p>
         </div>
      `;
   },

   nextQuestion: function () {
      this.questionIndex++;
      if (this.questionIndex < this.questions.length) {
         this.render();
         this.handleAnwers();
      } else {
         alert("Bạn đã hoàn thành hết tất cả những câu hỏi");
         this.showResult();
         $("#next-question").style.display = "none";
      }
   },

   start: function () {
      this.render();
      this.handleAnwers();

      $("#next-question").addEventListener("click", () => this.nextQuestion());
   },
};

quiz.start();
