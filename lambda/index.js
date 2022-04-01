const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {


	let response
	region = 'us-east-1'


	const dynamoDB = new AWS.DynamoDB({/*  endpoint, */ apiVersion: '2012-08-10', region: 'us-east-1' });

	if (event.httpMethod === 'GET') {

		const { userId } = event.queryStringParameters

		const resp = await dynamoDB.scan({
			TableName: 'tareas',
			FilterExpression: "userId = :userId",
			ExpressionAttributeValues: {
				":userId": { S: userId }
			},
		}).promise();

		response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			body: JSON.stringify({ resp, userId }),
		};

	} else if (event.httpMethod === 'POST') {

		const { title, userId } = JSON.parse(event.body)
		const id = uuidv4()

		const resp = await dynamoDB.putItem({
			TableName: 'tareas',
			Item: {
				id: { S: id },
				titulo: { S: title },
				userId: { S: userId }
			}
		}).promise();

		response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			body: JSON.stringify({ resp, id, userId }),
		};

	} else if (event.httpMethod === 'PUT') {

		const { taskEdited, id, userId } = JSON.parse(event.body)

		const resp = await dynamoDB.putItem({
			TableName: 'tareas',
			Item: {
				id: { S: id },
				titulo: { S: taskEdited },
				userId: { S: userId }
			}
		}).promise();

		response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			body: JSON.stringify({ resp, id, userId }),
		};
	} else if (event.httpMethod === 'DELETE') {

		const { id, titulo } = event.multiValueQueryStringParameters

		console.log(id, titulo)

		const resp = await dynamoDB.deleteItem({
			TableName: 'tareas',
			Key: {
				id: { S: id[0] },
				titulo: { S: titulo[0] }
			}
		}).promise()

		response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			body: JSON.stringify({ /* resp, */ id: id[0], titulo: titulo[0] }),
		};
	} else {

		response = {
			statusCode: 405,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			body: JSON.stringify({ message: 'method not allowed' }),
		};
	}

	return response;
};
