const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'public')));
} else {
	const corsOptions = {
		origin: [ 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000' ],
		credentials: true
	};
	app.use(cors(corsOptions));
}

const roomRoutes = require('./api/room/room.routes');
const guestRoutes = require('./api/guest/guest.routes');
const administrationRoutes = require('./api/administration/administration.routes');

app.use('/api/room', roomRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/administration', administrationRoutes);

const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
	console.log('Express server listening on port ' + port);
});
