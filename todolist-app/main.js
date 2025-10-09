const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// 할 일 추가 함수
function addTask() {
  if (inputBox.value === "") {
    alert("할 일을 입력하세요!");
  } else {
    let liEl = document.createElement("li");
    liEl.innerHTML = inputBox.value;
    listContainer.appendChild(liEl);
    let spanEl = document.createElement("span");
    spanEl.innerHTML = "\u00d7";
    liEl.appendChild(spanEl);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
