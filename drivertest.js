const Driver = require('./webdriverutils');

(async function example() {
	Driver.initializeFirefox();

	try {
		Driver.goToPage("http://www.jogatina.com/");
		await Driver.sleep(10000);

	}
	finally {
		//Driver.sleep(10000);
		Driver.quit();
	}
})();