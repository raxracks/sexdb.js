const WebSocket = require('ws');

class SexDB {
	constructor(url) {
		this.url = url;
		this.ws = new WebSocket(this.url);
		this.ready = false;
	}

	wait() {
		return new Promise((res, rej) => {
			if(this.ready) res();
			this.ws.once('open', () => {
				this.ready = true;
				res();
			});
		});
	}

	set(key, value) {
		return new Promise((res, rej) => {
			this.ws.send(`SET ${key} ${value}`);
			this.ws.once('message', (data) => {
				data = data.toString();
				if(!data.startsWith("ERROR:")) res(data);
				else rej(data);
			});
		});
	}

	get(key) {
		return new Promise((res, rej) => {
			this.ws.send(`GET ${key}`);
			this.ws.once('message', (data) => {
				data = data.toString();
				if(!data.startsWith("ERROR:")) res(data);
				else rej(data);
			});
		});
	}
}

module.exports = SexDB;