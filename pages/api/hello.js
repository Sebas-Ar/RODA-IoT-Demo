import AWS from 'aws-sdk'

export default function handler(req, res) {

	AWS.config.region = 'us-east-1'

	const endpoint = 'a33lelep6oufus-ats.iot.us-east-1.amazonaws.com'
	/* const iot = new AWS.Iot() */
	const iotdata = new AWS.IotData({ endpoint: endpoint })
	const topic = "inTopic";
	/* const type = "MySmartIoTDevice" */

	/* iot.createThing('device').on('success', function (response) {
		//Thing Created!
		console.log('created')
	}).on('error', function (response) {
		console.log(response);
	}).send(); */

	const registrationData = 'hola';

	const registrationParams = {
		topic: topic,
		payload: registrationData,
		qos: 0
	};

	iotdata.publish(registrationParams, (err, data) => {
		if (err) console.log(err, err.stack); // an error occurred
		// else Published Successfully!
		console.log('publicado', data)
	});

	res.status(200).json({ name: 'John Doe' })
}
