import AWS from 'aws-sdk'

export default function handler(req, res) {

	AWS.config.region = 'us-east-1'

	const endpoint = 'a33lelep6oufus-ats.iot.us-east-1.amazonaws.com'
	const iotdata = new AWS.IotData({ endpoint: endpoint })
	const topic = "inTopic";

	const registrationData = 'hola';

	const registrationParams = {
		topic: topic,
		payload: registrationData,
		qos: 0
	};

	iotdata.publish(registrationParams, (err, data) => {
		if (err) console.log(error)
		// else Published Successfully!
	});

	res.status(200).json({ name: 'John Doe', test })
}
