const dbService = require('../../services/db.service');

async function getGuestFamilies() {
	try {
		const guestsCollection = await dbService.getCollection('guests');
		const roomsCollection = await dbService.getCollection('rooms');

		const familiesRoomsByCapacity = await roomsCollection
			.aggregate([
				{ $group: { _id: '$number', capacity: { $first: '$capacity' } } },
				{ $match: { capacity: { $gt: 2 } } }
			])
			.toArray();
		const familiesRoomsNumbers = familiesRoomsByCapacity.map((room) => room._id);
		return guestsCollection.find({ room: { $in: familiesRoomsNumbers } }).toArray();
	} catch (err) {
		throw err;
	}
}

module.exports = {
	getGuestFamilies
};
