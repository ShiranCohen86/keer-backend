const guestService = require('./guest.service');

async function getGuestFamilies(req, res) {
	try {
		const guests = await guestService.getGuestFamilies();
		res.send(guests);
	} catch (err) {
		res.status(500).send({ err: 'Failed to get guests' });
	}
}

module.exports = {
	getGuestFamilies
};
