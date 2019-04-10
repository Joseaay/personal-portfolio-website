const express = require('express');
const next = require('next');
const compression = require('compression');

const app = next();
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();
		server.use(compression());

		// Disabled as SSL certificates are now installed
		// server.use(
		// 	frameguard({
		// 		action: 'allow-from',
		// 		domain: 'http://www.joseayllonllamas.com',
		// 	})
		// );

		// server.use(
		// 	frameguard({
		// 		action: 'allow-from',
		// 		domain: 'http://joseayllonllamas.com',
		// 	})
		// );

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(3000, 'localhost', err => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	});
