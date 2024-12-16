const addParticipantUrl = 'https://hvvpkbqa6a.execute-api.ap-northeast-2.amazonaws.com/prod/participants/add';
const getParticipantsUrl = 'https://hvvpkbqa6a.execute-api.ap-northeast-2.amazonaws.com/prod/participants';
const resetParticipantsUrl = 'https://hvvpkbqa6a.execute-api.ap-northeast-2.amazonaws.com/prod/participants/reset';

// 참가자 추가 (입장)
async function enterParticipant() {
    try {
        const participantId = `user-${Date.now()}`;
        const response = await fetch(addParticipantUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ participantId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("참가자 입장 성공:", result.message);

        // 참가자 리스트 갱신
        await fetchParticipants();
    } catch (error) {
        console.error("참가자 입장 중 오류 발생:", error);
    }
}

// 참가자 리스트 가져오기
async function fetchParticipants() {
    try {
        const response = await fetch(getParticipantsUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("참가자 데이터:", result);

        // 화면에 참가자 수 및 리스트 업데이트
        document.getElementById('participant-count').innerText = `현재 참가자: ${result.count}명`;
        const listContainer = document.getElementById('participant-list');
        listContainer.innerHTML = '';

        result.participants.forEach((participant) => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${participant.participantId}`;
            listContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error("참가자 정보를 가져오는 중 오류 발생:", error);
    }
}

// 참가자 초기화
async function resetParticipants() {
    try {
        const response = await fetch(resetParticipantsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("초기화 성공:", result.message);

        // 화면 갱신: 새로고침
        location.reload();
    } catch (error) {
        console.error("초기화 중 오류 발생:", error);
    }
}

// 게임 시작
async function startGame() {
    try {
        const response = await fetch(getParticipantsUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("게임 시작 확인:", result);

        if (result.count < 5) {
            alert("참가자가 5명 이상이어야 게임을 시작할 수 있습니다.");
        } else {
            window.location.href = "sel.html"; // 게임 화면으로 이동
        }
    } catch (error) {
        console.error("게임 시작 중 오류 발생:", error);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Live reload enabled.');

    // 초기 참가자 정보 불러오기
    await fetchParticipants();

    // 초기화 버튼 이벤트 리스너
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetParticipants);
    }

    // 참가자 입장 시 자동으로 추가
    await enterParticipant();

    // 업데이트 버튼 이벤트 리스너
    const updateButton = document.getElementById('update-participants');
    if (updateButton) {
        updateButton.addEventListener('click', fetchParticipants);
    }

    // 게임 시작 버튼 이벤트 리스너
    const startButton = document.getElementById('start-game');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});
