const WebSocket = require('ws');
const readlineSync = require('readline-sync');

let ws = new WebSocket("ws://127.0.0.1:9001");

ws.on('error', console.error);

ws.on('open', async () => {
	while(true) {
		let command = readlineSync.question("> ");
		console.log((await (() => {
			return new Promise((res, rej) => {
				ws.send(command);
				ws.once('message', data => {
					res(data);
				});
			});
		})()).toString());
	};
});