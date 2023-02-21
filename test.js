const SexDB = require("./lib");
let db = new SexDB("ws://127.0.0.1:9001");

(async () => {
	await db.wait();
	let promises = [];
	let t = Date.now();
	for(let i = 0; i < 10000; i++) {
		promises.push(db.set(i, i));
	}

	Promise.all(promises).then(() => {
		console.log(`completed 10000 writes in ${Date.now() - t}ms`);
		t = Date.now();
		for(let i = 0; i < 10000; i++) {
			promises.push(db.get(i));
		}

		Promise.all(promises).then(() => {
			console.log(`completed 10000 reads in ${Date.now() - t}ms`);
		});
	});
})();
