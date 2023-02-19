const SexDB = require("./lib");
let db = new SexDB("ws://127.0.0.1:9001");

(async () => {
	await db.wait();
	for(let i = 0; i < 1000; i++) {
		await db.set(i, i);
	}

	for(let i = 0; i < 1000; i++) {
		console.log(await db.get(i));
	}
})();
