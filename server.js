const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 1000;

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
