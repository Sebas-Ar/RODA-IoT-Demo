import AWS from 'aws-sdk'

export default function handler(req, res) {

	let test = ''

	AWS.config.region = 'us-east-1'
	test = '1'
	const endpoint = 'a33lelep6oufus-ats.iot.us-east-1.amazonaws.com'
	const iotdata = new AWS.IotData({ endpoint: endpoint })
	const topic = "inTopic";
	test = '2'
	const registrationData = 'hola';

	const registrationParams = {
		topic: topic,
		payload: registrationData,
		qos: 0
	};
	test = '3'
	iotdata.publish(registrationParams, (err, data) => {
		if (err) console.log(err, err.stack); // an error occurred
		// else Published Successfully!
		test = '4'
		console.log('publicado', data)
	});

	res.status(200).json({ name: 'John Doe', test })
}
