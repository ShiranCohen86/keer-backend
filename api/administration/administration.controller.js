const administrationService = require('./administration.service');
const roomService = require('../room/room.service');

async function sendStatus(req, res) {
	try {
		const takenRoomsPercentage = await roomService.getTakenRoomPercentage();
		await administrationService.sendSms(takenRoomsPercentage);
		res.send('ok');
	} catch (err) {
		res.status(500).send({ err: 'Failed to send sms' });
	}
}

module.exports = {
	sendStatus
};
