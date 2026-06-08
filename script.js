function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    document.getElementById('themeBtn').innerText = targetTheme === 'dark' ? '☀️ 라이트모드' : '🌙 다크모드';
}

emailjs.init("YOUR_USER_ID"); 

function startTest() {
    const myName = document.getElementById('myName').value.trim();
    const partnerName = document.getElementById('partnerName').value.trim();

    if (!myName || !partnerName) {
        alert('이름을 모두 입력해주세요!');
        return;
    }

    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    let width = 0;
    const progressBar = document.getElementById('progressBar');
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            showResult(myName, partnerName);
        } else {
            width += 5;
            progressBar.style.width = width + '%';
        }
    }, 150);

    const templateParams = {
        from_name: "두근두근 시스템",
        message: `매칭 발생 - 본인: ${myName} / 상대방: ${partnerName}`
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => console.log('데이터 전송 완료'))
        .catch(err => console.log('서버 전송 대기 중...', err));
}
function showResult(my, partner) {
   
    const score = Math.floor(Math.random() * 100) + 1;
    document.getElementById('scoreValue').innerText = score + '%';

    let desc = "";
    if (score >= 80) desc = "💖 평생 함께할 완벽한 찰떡궁합입니다!";
    else if (score >= 50) desc = "👍 서로 조금만 양보하면 아주 좋은 관계가 됩니다.";
    else desc = " 노력이 조금 더 필요한 타이밍입니다!";

    document.getElementById('resultDesc').innerText = desc;
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
}

function saveResult() {
    const card = document.getElementById('resultCard');
    html2canvas(card).then(canvas => {
        const link = document.createElement('a');
        link.download = '궁합결과.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function resetAll() {
    document.getElementById('myName').value = '';
    document.getElementById('partnerName').value = '';
    
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}