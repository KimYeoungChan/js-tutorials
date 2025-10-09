const questions = [
  {
    question: "세상에서 가장 큰 동물은 무엇인가?",
    answers: [
      { text: "상어", correct: false },
      { text: "흰수염고래", correct: true },
      { text: "코끼리", correct: false },
      { text: "기린", correct: false },
    ],
  },
  {
    question: "지구상에서 영토(면적)가 가장 넓은 나라는 어디인가요?",
    answers: [
      { text: "캐나다", correct: false },
      { text: "중국", correct: false },
      { text: "러시아", correct: true },
      { text: "미국", correct: false },
    ],
  },
  {
    question: "물의 화학식은 무엇인가요?",
    answers: [
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "소설 '어린 왕자'의 작가는 누구인가요?",
    answers: [
      { text: "빅토르 위고", correct: false },
      { text: "알베르 카뮈", correct: false },
      { text: "앙투안 드 생텍쥐페리", correct: true },
      { text: "마르셀 프루스트", correct: false },
    ],
  },
];

// 선택자 선언
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); // nextButton으로 통일

// 인덱스 저장
let currentQuestionIndex = 0;
// 점수
let score = 0;

// 시작 함수
function startQuiz() {
  currentQuestionIndex = 0; // 첫 번째 질문 부터 시작
  score = 0; // 점수 0 초기화
  nextButton.innerHTML = "Next"; // 💡 수정: nextBtn -> nextButton
  showQuestion(); //  질문 표시 함수 실행
}

// 질문 표시 함수
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex]; // 사용자에게 보여줄 질문 번호를 계산합니다. (배열 인덱스 + 1)
  let questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer); // 💡 수정: 주석 해제
  });
}

function resetState() {
  nextButton.style.display = "none"; // 💡 수정: nextBtn -> nextButton
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"; // 💡 수정: 불리언(true) 대신 문자열("true") 비교
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      // 💡 수정: 불리언(true) 대신 문자열("true") 비교
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block"; // 💡 수정: nextBtn -> nextButton
}

function showScore() {
  resetState();
  questionEl.innerHTML = `퀴즈가 끝났습니다! 당신은 총 ${questions.length}개 중 ${score}개를 맞혔습니다.`;
  nextButton.innerHTML = "다시 시작하기"; // 💡 수정: nextBtn -> nextButton
  nextButton.style.display = "block"; // 💡 수정: nextBtn -> nextButton
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
