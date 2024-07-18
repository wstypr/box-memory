const BOX_NUM = 16;
const boxContainer = document.getElementById("boxContainer");
const btnStart = document.getElementById("btnStart");
const controlContainer = document.getElementById("controlContainer");
const moveTracker = document.createElement("div");

let boxes = [];
let moveNumber = 0;

renderBoxes();

// handle start button
btnStart.addEventListener("click", startGame);

async function startGame() {
  moveNumber = 0;
  btnStart.removeEventListener("click", startGame);
  btnStart.style.borderColor = "transparent";
  btnStart.classList.add("disabled");

  for (box of boxes) {
    box.addEventListener("click", handleBoxClick);
  }

  await timeMemorization(openAllBoxes, closeAllBoxes);
  moveTracker.classList.add("btn");
  moveTracker.classList.add("disabled");
  moveTracker.style.borderColor = "transparent";
  moveTracker.textContent = `NUMBER OF MOVE : ${moveNumber}`;
  controlContainer.innerHTML = "";
  controlContainer.append(moveTracker);
}

function timeMemorization(beforeTimer, afterTimer) {
  return new Promise((resolve) => {
    beforeTimer();
    let time = 6;
    btnStart.textContent = `MEMORIZE NOW ... ${time}s`;
    const timer = setInterval(() => {
      time--;
      btnStart.textContent = `MEMORIZE NOW ... ${time}s`;
      if (time === 0) {
        clearInterval(timer);
        afterTimer();
        resolve();
      }
    }, 1000);
  });
}

function openAllBoxes() {
  openBox(...boxes);
}

function closeAllBoxes() {
  closeBox(...boxes);
}

// create boxes
function renderBoxes() {
  // create shuffled data
  boxes = [];
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
  const shuffledData = data.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 16; i++) {
    const box = document.createElement("div");
    box.dataValue = shuffledData.pop();
    box.className = "box";
    boxes.push(box);
    boxContainer.append(box);
  }
}

function openBox(...boxes) {
  for (box of boxes) {
    box.textContent = box.dataValue;
    box.removeEventListener("click", handleBoxClick);
  }
}

function closeBox(...boxes) {
  for (box of boxes) {
    box.textContent = "";
    box.addEventListener("click", handleBoxClick);
  }
}

// game logic
let selecteds = [];
let rightAns = 0;
function handleBoxClick(e) {
  if (selecteds.length === 2) {
    closeBox(...selecteds);
    selecteds = [];
  }

  selecteds.push(e.target);
  openBox(e.target);

  if (selecteds.length === 2) {
    updateMoveTracker();
    if (isSelectionsMatch()) {
      rightAns++;
      selecteds = [];
    }
  }
}

function isSelectionsMatch() {
  return selecteds[0].dataValue === selecteds[1].dataValue;
}

function updateMoveTracker() {
  moveNumber++;
  moveTracker.textContent = `NUMBER OF MOVE : ${moveNumber}`;
}
