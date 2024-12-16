const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("Event received:", JSON.stringify(event)); // 디버깅 로그

    const params = {
        TableName: "CatchLiarParticipants", // DynamoDB 테이블 이름
    };

    try {
        const data = await dynamoDB.scan(params).promise(); // 데이터 조회
        const participants = data.Items || [];
        console.log("Participants retrieved successfully:", participants);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // CORS 허용
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
                count: participants.length,
                participants: participants.map((p) => ({
                    participantId: p.participantId,
                    timestamp: p.timestamp,
                })),
            }),
        };
    } catch (error) {
        console.error("Error fetching participants:", error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
                error: "Failed to fetch participants.",
            }),
        };
    }
};
