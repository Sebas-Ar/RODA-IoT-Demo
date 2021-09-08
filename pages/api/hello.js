// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import awsIot from 'aws-iot-device-sdk'
import path from 'path'

export default function handler(req, res) {


  const device = awsIot.device({
    clientId: 'Browser',
    host: 'a33lelep6oufus-ats.iot.us-west-2.amazonaws.com',
    port: 8883,
    keyPath: path.resolve(__dirname, '../../../../public/aws/Browser.private.key'),
    certPath: path.resolve(__dirname, '../../../../public/aws/Browser.cert.pem'),
    caPath: path.resolve(__dirname, '../../../../public/aws/AmazonRootCA1.pem'),
  });

  const topic = "inTopic"

  console.log('deberia conectarse')

  device.on('connect', () => {
    console.log('Connecting to AWS  IoT Core');
    /* setInterval(() => { */
    console.log(`Sending data`)
    device.publish(topic, 'hola mundo');
    /* }, 3000) */
  })

  device.on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
  });

  res.status(200).json({ name: 'John Doe' })
}
