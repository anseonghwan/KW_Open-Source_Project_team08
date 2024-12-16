const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("Event received:", JSON.stringify(event)); // 디버깅 로그

    const httpMethod = event.httpMethod || "GET"; // HTTP 메서드 확인

    if (httpMethod === "POST") {
        const params = {
            TableName: 'CatchLiarParticipants',
            Item: {
                participantId: `user-${Date.now()}`, // 고유 ID 생성
                timestamp: Date.now(),
                isActive: true, // 현재 접속 중으로 설정
            },
        };

        try {
            await dynamoDB.put(params).promise();
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ message: 'Participant added successfully!' }),
            };
        } catch (error) {
            console.error('Error adding participant:', error);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Failed to add participant.' }),
            };
        }
    } else if (httpMethod === "GET") {
        const params = {
            TableName: 'CatchLiarParticipants',
            FilterExpression: "isActive = :active", // 활성화된 참가자만 필터링
            ExpressionAttributeValues: { ":active": true },
        };

        try {
            const data = await dynamoDB.scan(params).promise();
            const participants = data.Items || [];

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    count: participants.length,
                    participants: participants.map(p => ({ participantId: p.participantId })),
                }),
            };
        } catch (error) {
            console.error('Error fetching participants:', error);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Failed to fetch participants.' }),
            };
        }
    }
};
