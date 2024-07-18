const boxContainer = document.getElementById("boxContainer");

// shuffle array
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const array = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 0, 0];
const shuffledArray = shuffle(array);

// create boxes
const BOX_NUM = 16;
for (let i = 0; i < BOX_NUM; i++) {
  const box = document.createElement("div");
  box.id = `${i}`;
  box.classList.add("box");
  box.dataValue = shuffledArray.pop();
  box.addEventListener("click", handleBoxClick);
  boxContainer.append(box);
}

function closeBox(...boxes) {
  for (box of boxes) {
    box.textContent = "";
  }
}

function openBox(...boxes) {
  for (box of boxes) {
    box.textContent = box.dataValue;
  }
}

// game logic
let selecteds = [];
let correctAns = 0;
function handleBoxClick(e) {
  openBox(e.target);
  e.target.removeEventListener("click", handleBoxClick);

  if (selecteds.length === 2) {
    if (selecteds[0].value === selecteds[1].value) {
      selecteds.forEach((box) =>
        box.removeEventListener("click", handleBoxClick)
      );
      correctAns++;
      if (correctAns === BOX_NUM / 2 - 1) {
        const win = document.createElement("h1");
        h1.textContent = "FINISH";
        document.body.append(win);
      }
    } else {
      selecteds.forEach((box) => {
        box.element.addEventListener("click", handleBoxClick);
        closeBox(box);
      });
    }
    selecteds = [];
    console.log(correctAns);
  }

  selecteds.push(e.target);
}
