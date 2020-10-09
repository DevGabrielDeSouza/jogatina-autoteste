const Driver = require('../webdriverutils');

const LoginPage = require('../loginpage');

(async function example() {
	Driver.initializeChrome();
	Driver.setImplicitTimeOut(10000);
	Driver.goToPage("http://www.jogatina.com/");

	LoginPage.initialize(Driver);

	try {
		await LoginPage.login("gab@test.com", "teste123");
	}
	finally {
		Driver.quit();
	}
})();