function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    document.getElementById('themeBtn').innerText = targetTheme === 'dark' ? '☀️ 라이트모드' : '🌙 다크모드';
}

function startTest() {
    const myName = document.getElementById('myName').value.trim();
    const partnerName = document.getElementById('partnerName').value.trim();

    if (!myName || !partnerName) {
        alert('이름을 모두 입력해주세요!');
        return;
    }

    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}