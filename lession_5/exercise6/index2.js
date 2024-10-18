// Lấy dữ liệu từ modal và lưu vào localStorage
form.addEventListener("submit", (e) => {
   e.preventDefault();
   const title = inputTitle.value;
   const description = inputDescription.value;
   const newNote = {
      title: title,
      description: description,
   };

   const arrNote = getNotes(); // Lấy dữ liệu hiện có
   arrNote.push(newNote); // Thêm ghi chú mới vào mảng
   localStorage.setItem("arrNote", JSON.stringify(arrNote)); // Lưu lại vào localStorage

   inputTitle.value = ""; // Xóa trường nhập
   inputDescription.value = ""; // Xóa trường nhập
   renderNote(); // Render lại ghi chú
});

// Render ghi chú từ localStorage
function renderNote() {
   noteList.innerHTML = ""; // Xóa nội dung hiện tại trước khi render lại
   const storedArrayNote = getNotes(); // Lấy dữ liệu ghi chú
   if (storedArrayNote) {
      storedArrayNote.forEach((item, index) => {
         // Sử dụng forEach thay vì map
         const htmls = `
                <div key-data=${index} id="note-item"
                    class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                    <div>
                        <h4 class="text-gray-800 dark:text-gray-100 font-bold mb-3">${item.title}</h4>
                        <p class="text-gray-800 dark:text-gray-100 text-sm">${item.description}</p>
                    </div>
                    <div>
                        <div class="flex items-center justify-between text-gray-800 dark:text-gray-100">
                            <p class="text-sm">March 28, 2020</p>
                            <div class="flex gap-2">
                                <button
                                    class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    aria-label="edit note" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-pencil" width="20" height="20"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                        <path fill="#097eff"
                                            d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                    </svg>
                                </button>
                                <button
                                    class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    aria-label="delete note" role="button" onclick="deleteNote(${index})">
                                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
                                        <g>
                                            <path fill="#ff0000"
                                                d="M45.5,10H33V6c0-2.2-1.8-4-4-4h-6c-2.2,0-4,1.8-4,4v4H6.5C5.7,10,5,10.7,5,11.5v3C5,15.3,5.7,16,6.5,16h39
                                                c0.8,0,1.5-0.7,1.5-1.5v-3C47,10.7,46.3,10,45.5,10z M23,7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v3h-6V7z" />
                                            <path fill="#ff0000" d="M41.5,20h-31C9.7,20,9,20.7,9,21.5V45c0,2.8,2.2,5,5,5h24c2.8,0,5-2.2,5-5V21.5C43,20.7,42.3,20,41.5,20z
                                            M23,42c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z M33,42c0,0.6-0.4,1-1,1h-2
                                            c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
         noteList.innerHTML += htmls; // Thêm nội dung ghi chú vào noteList
      });
   }
}
