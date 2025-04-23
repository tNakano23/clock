function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // 各桁を取得して、それぞれの要素に値を設定
  document.getElementById('digit1').textContent = hours.charAt(0);
  document.getElementById('digit2').textContent = hours.charAt(1);
  document.getElementById('digit3').textContent = minutes.charAt(0);
  document.getElementById('digit4').textContent = minutes.charAt(1);

  // アニメーションをリセットするためにクラスを一時的に削除
  const digits = document.querySelectorAll('.digit');
  digits.forEach(digit => {
    digit.classList.remove('animate');
    void digit.offsetWidth; // 強制的にリフローをトリガー
    digit.classList.add('animate');
  });
}

// 1秒ごとに時刻を更新
setInterval(updateTime, 1000);

// 初期呼び出し
updateTime();



// const box = document.querySelector('#draggableElement');
// const toggleButton = document.querySelector('#toggleDrag');
// let isDragging = false;
// let offsetX, offsetY;
// let isDragEnabled = true; // 初期状態でドラッグ有効

// toggleButton.addEventListener('click', () => {
//     isDragEnabled = !isDragEnabled; // ドラッグの有効/無効を切り替え
//     if (isDragEnabled) {
//         box.classList.remove('disabled');
//         box.style.cursor = "grab";
//     } else {
//         box.classList.add('disabled');
//         box.style.cursor = "not-allowed";
//     }
// });

// // ドラッグ開始
// box.addEventListener('mousedown', (e) => {
//     if (!isDragEnabled) return; // ドラッグ無効時は何もしない
//     isDragging = true;
//     offsetX = e.clientX - box.offsetLeft;
//     offsetY = e.clientY - box.offsetTop;
//     box.style.cursor = "grabbing";
// });

// // ドラッグ中の移動
// document.addEventListener('mousemove', (e) => {
//     if (!isDragging || !isDragEnabled) return;
//     let x = e.clientX - offsetX;
//     let y = e.clientY - offsetY;

//     // ウィンドウ内で移動制限
//     const maxX = window.innerWidth - box.offsetWidth;
//     const maxY = window.innerHeight - box.offsetHeight;

//     x = Math.max(0, Math.min(x, maxX));
//     y = Math.max(0, Math.min(y, maxY));

//     box.style.left = `${x}px`;
//     box.style.top = `${y}px`;
// });

// // ドラッグ終了
// document.addEventListener('mouseup', () => {
//     if (!isDragEnabled) return;
//     isDragging = false;
//     box.style.cursor = "grab";
// });


const today = new Date();

// 年、月、日を取得
const year = today.getFullYear();
const month = today.getMonth() + 1;  // 月は0から始まるため、1を足す
const day = today.getDate();

// 曜日を取得
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
const weekday = daysOfWeek[today.getDay()];

// 結果を表示
const dateString = `　${year}年${month}月${day}日（${weekday}）`;

const over_circle = document.querySelector('#over_circle');
const toggleLing = document.querySelector('#toggleLing');
const toggleDate = document.querySelector('#toggleDate');
const toggleBell = document.querySelector('#toggleBell');
const hideo = document.querySelector('#hideo');
const date_type1 = document.querySelector('#date_type1');

date_type1.innerText = dateString;

hideo.addEventListener('click', () => {
  // console.log("clicked!");
  if (hideo.style.opacity === '1') {
    hideo.style.opacity = '0';
  } else {
    hideo.style.opacity = '1';
  }
});

over_circle.addEventListener('click', () => {
  // console.log("clicked!");
  if (over_circle.style.opacity === '1') {
    over_circle.style.opacity = '0';
  } else {
    over_circle.style.opacity = '1';
  }
});

date_type1.addEventListener('click', () => {
  // console.log("clicked!");
  if (date_type1.style.opacity === '0') {
    date_type1.style.opacity = '1';
    date_type1.style.animation = 'fadeInBtn 0.2s ease-in-out';
  } else {
    date_type1.style.opacity = '0';
  }
});

// console.log(dateString);

toggleBell.addEventListener('click', () => {
  // console.log("clicked!");
  if (Notification.permission !== 'denied') {
    Notification.requestPermission()
  } else {
    Notification.requestPermission()
  }
});


function updateBeforeState() {
  if (Notification.permission === "granted") {
    toggleBell.classList.add("no-before"); // 拒否or未決定ならbefore非表示
  } else {
    toggleBell.classList.remove("no-before"); // 通知許可ならbefore表示
  }
}

toggleBell.addEventListener("click", () => {
  if (Notification.permission === "default") {
    Notification.requestPermission().then(updateBeforeState);
  } else {
    alert("通知の設定はブラウザの設定から変更してください。");
  }
});

updateBeforeState();


const knob = document.getElementById("knob");
const progress = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const endTimeDisplay = document.getElementById("endTime");
const container = document.querySelector(".clock_container_relative");
let dragging = false;
let angle = 0;
let countdown;
let remainingMinutes = 0;
let fullCircles = 0;

function updateKnobPosition(angle) {
  const radius = 160;
  const centerX = 190;
  const centerY = 190;
  const radian = (angle - 90) * (Math.PI / 180);
  const x = centerX + radius * Math.cos(radian);
  const y = centerY + radius * Math.sin(radian);
  knob.style.left = `${x}px`;
  knob.style.top = `${y}px`;
}

function setTimer() {
  if (fullCircles === 0 && angle === 0) {
    remainingMinutes = 0;
  } else {
    remainingMinutes = Math.max(0, fullCircles * 60 + Math.round((angle / 360) * 60));
  }
  timeDisplay.innerText = `⏳️${remainingMinutes} 分`;
  updateEndTime();
}

function updateProgress(fullCircles, angle, reverse_order) {
  let intensity = Math.max(0, 255 - fullCircles * 80);
  let pastnsity = Math.max(0, 255 - (fullCircles - 1) * 80);
  if (fullCircles === 0) { pastnsity = 0; }
  // console.log("angle", angle);
  // console.log("intensity", intensity);
  // console.log("pastnsity", pastnsity);
  // console.log("審議", pastnsity==intensity);
  if (angle == 0 && reverse_order == 1) {
    let tmp = intensity;
    intensity = pastnsity;
    pastnsity = tmp;
  }
  // if (reverse_order == 2){
  //   intensity = 0;
  //   pastnsity = 0;
  // }
  if (pastnsity >= 250 && angle < 1) {
    intensity = 0;
    pastnsity = 0;
  }
  progress.style.background = `conic-gradient(
     rgb(${intensity}, ${intensity}, ${intensity}) ${angle}deg,
     rgb(${pastnsity}, ${pastnsity}, ${pastnsity}) ${angle}deg)`;
  // knob.style.background = `rgb(${5 + intensity}, ${5 + intensity}, ${5 + intensity})`;
}

function updateEndTime() {
  const now = new Date();
  const endTime = new Date(now.getTime() + remainingMinutes * 60000);
  const hours = endTime.getHours().toString().padStart(2, '0');
  const minutes = endTime.getMinutes().toString().padStart(2, '0');
  endTimeDisplay.innerText = `終了時間:${hours}:${minutes}`;
}

knob.addEventListener("mousedown", () => {
  dragging = true;
  clearInterval(countdown);
});

document.addEventListener("mousemove", (event) => {
  if (!dragging) return;
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  let newAngle = (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360;

  // if (angle < 60 && newAngle > 300) {
  if (angle < 90 && newAngle > 100) {
    fullCircles = fullCircles - 1;
  } else if (angle > 100 && newAngle < 90) {
    fullCircles++;
  }

  if (fullCircles < 0) {
    fullCircles = 0;
    angle = 0;
  } else {
    angle = newAngle;
  }


  updateKnobPosition(angle);
  updateProgress(fullCircles, angle, 0);
  setTimer();
});

document.addEventListener("mouseup", () => {
  if (!dragging) return;
  dragging = false;
  startCountdown();
});

function startCountdown() {
  countdown = setInterval(() => {
    if (remainingMinutes > 0) {
      remainingMinutes--;
      let reAngle = ((remainingMinutes / 60) - fullCircles) * 360;
      if (fullCircles == 0 && reAngle < 0) {
        fullCircles--;
        reAngle = 0;
      }
      if (reAngle < 0) {
        fullCircles--;
        reAngle = 0;
      }
      updateProgress(fullCircles, reAngle, 1);
      timeDisplay.innerText = `⏳️${remainingMinutes} 分`;
      updateEndTime();
    } else {
      updateProgress(0, 0, 2);
      clearInterval(countdown);
      console.log("おわり！");
      console.log("is_concetrate", is_concetrate);

      if (is_concetrate == true && Notification.permission === 'granted') {
        new Notification('タイマーwebアプリ', {
          body: 'タイマー終了',
          icon: 'src/スクリーンショット 2025-02-03 034010.png' // 任意でアイコンを指定
        });

      }

    }
  }, 60000);
  // }, 60000);
}

let timeout;
let is_concetrate = false;

function resetTimer() {
  console.log("計測開始");
  is_concetrate = false;
  console.log("集中", is_concetrate);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    is_concetrate = true;
    console.log("30秒間触らなかった");
    console.log("集中", is_concetrate);
  }, 30000);
  // }, 30000);
}
container.addEventListener('mouseup', resetTimer);


timeDisplay.addEventListener('click', () => {
  if (timeDisplay.style.opacity === '0') {
    timeDisplay.style.opacity = '1';
  } else {
    timeDisplay.style.opacity = '0';
  }
});

endTimeDisplay.addEventListener('click', () => {
  if (endTimeDisplay.style.opacity === '0') {
    endTimeDisplay.style.opacity = '1';
  } else {
    endTimeDisplay.style.opacity = '0';
  }
});


// 初期設定
updateKnobPosition(angle);
