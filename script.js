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
  