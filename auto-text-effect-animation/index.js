const containerEl = document.querySelector(".container");

const carees = ["Youtuber", "Web Developer", "App Developer", "Freelancer"];

let careeIndex = 0;
let characterIndex = 0;

updateText();

function updateText() {
  // 1. 현재 직업 문자열 가져오기
  const currentCareer = carees[careeIndex];

  // 2. 타이핑될 부분만 slice로 자르기 (핵심 수정 부분)
  const typedText = currentCareer.slice(0, characterIndex);

  // 3. 'a' 또는 'an' 결정
  // 'A', 'E', 'I', 'O', 'U'로 시작하는지 확인해야 하지만,
  // 예시처럼 'I'로 시작하는지 (혹은 모음으로 시작하는지)만 간단히 체크
  const article =
    currentCareer.toLowerCase().startsWith("a") ||
    currentCareer.toLowerCase().startsWith("e") ||
    currentCareer.toLowerCase().startsWith("i") ||
    currentCareer.toLowerCase().startsWith("o") ||
    currentCareer.toLowerCase().startsWith("u")
      ? "an"
      : "a";

  // 4. HTML 업데이트
  containerEl.innerHTML = `<h1>I am ${article} ${typedText}</h1>`;

  // 5. 다음 글자로 이동
  characterIndex++;

  // 6. 모든 글자가 출력되었는지 확인 후 다음 직업으로 전환
  if (characterIndex > currentCareer.length) {
    careeIndex++; // 다음 직업으로 이동
    characterIndex = 0; // 글자 인덱스 초기화
  }

  // 7. 직업 배열의 끝에 도달하면 처음으로 돌아가기
  if (careeIndex >= carees.length) {
    careeIndex = 0;
  }

  setTimeout(updateText, 400); // 속도를 조금 빠르게 조정
}
