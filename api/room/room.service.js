const dbService = require('../../services/db.service');

async function getAvailableRooms() {
	try {
		const guestCollection = await dbService.getCollection('guests');
		const roomCollection = await dbService.getCollection('rooms');

		const takenRoomsGroupByGuest = await guestCollection.aggregate([ { $group: { _id: '$room' } } ]).toArray();
		const roomsNumbers = takenRoomsGroupByGuest.map((room) => room._id);
		return roomCollection.find({ number: { $nin: roomsNumbers } }).toArray();
	} catch (err) {
		throw err;
	}
}
async function getCouplesRooms() {
	try {
		const guestCollection = await dbService.getCollection('guests');
		const roomsCollection = await dbService.getCollection('rooms');

		const CouplesRoomsGroupByGuests = await guestCollection
			.aggregate([ { $group: { _id: '$room', count: { $sum: 1 } } }, { $match: { count: { $eq: 2 } } } ])
			.toArray();
		const couplesRoomsNumbers = CouplesRoomsGroupByGuests.map((room) => room._id);
		return roomsCollection.find({ number: { $in: couplesRoomsNumbers } }).toArray();
	} catch (err) {
		throw err;
	}
}
async function getTakenRoomPercentage() {
	try {
		const roomsCollection = await dbService.getCollection('rooms');
		const roomsCount = await roomsCollection.count();
		const countTakenRooms = await guestCollection.aggregate([ { $group: { _id: '$room' } } ]).toArray().length;
		const takenRoomsPercentage = countTakenRooms / roomsCount * 100;
		return takenRoomsPercentage;
	} catch (err) {
		throw err;
	}
}

module.exports = {
	getCouplesRooms,
	getAvailableRooms,
	getTakenRoomPercentage
};
