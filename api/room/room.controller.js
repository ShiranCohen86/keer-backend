const roomService = require('./room.service');

async function getAvailableRooms(req, res) {
	try {
		const rooms = await roomService.getAvailableRooms();
		res.send(rooms);
	} catch (err) {
		res.status(500).send({ err: 'Failed to get available rooms' });
	}
}
async function getCouplesRooms(req, res) {
	try {
		const rooms = await roomService.getCouplesRooms();
		res.send(rooms);
	} catch (err) {
		res.status(500).send({ err: 'Failed to get couples rooms' });
	}
}

module.exports = {
	getAvailableRooms,
	getCouplesRooms
};
