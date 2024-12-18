const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 1000;

let votes = {}; // 투표 결과 저장
let liar = '라이어'; // 라이어 유저 (랜덤으로 설정해야 함)

// 투표 데이터 받기
app.post('/submit-vote', (req, res) => {
    const { vote } = req.body;
  
    // 투표 집계
    if (votes[vote]) {
      votes[vote]++;
    } else {
      votes[vote] = 1;
    }
  
    res.json({ message: `${vote}에게 투표 완료!` });
  });
  
  // 투표 결과 확인
  app.get('/result', (req, res) => {
    const results = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const topVoted = results[0]; // 가장 많은 표를 받은 유저
    const topUser = topVoted[0];
  
    if (topUser === liar) {
      res.json({ message: '라이어를 잡았습니다! 일반 유저 승리!', nextPage: '/win.html' });
    } else {
      res.json({ message: `${topUser} 탈락!`, nextPage: '/next-round.html' });
    }
  
    // 투표 초기화
    votes = {};
  });

app.use(express.static(__dirname));
app.use('/images', express.static(__dirname + '/images'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket 연결 관리
wss.on('connection', (ws) => {
    console.log('클라이언트가 연결되었습니다.');

    // 클라이언트로부터 메시지 수신
    ws.on('message', (message) => {
        console.log('수신된 메시지:', message);

        // 모든 클라이언트에게 메시지 브로드캐스트
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('클라이언트 연결이 종료되었습니다.');
    });
});

server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행되고 있습니다.`);
});
