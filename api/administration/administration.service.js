
async function sendSms( percentage ) {
	try {
		const accountSid = 'AC5469677ee6f6268066308f74120edc3f';
		const authToken = '6f5526a4105a51bdb3ae58aba8e479fb';

		const twilio = require('twilio');
		const client = new twilio(accountSid, authToken);
		const message = await client.messages.create({
			body: `The current percentage of taken rooms is: ${percentage}%`,
			from: '+19706877960',
			to: '+972545919662'
		});
		console.log(message.sid);
	} catch (err) {
		throw err;
	}
}

module.exports = {
	sendSms
};
