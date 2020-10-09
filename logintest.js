const Driver = require('./webdriverutils');

const LoginPage = require('./loginpage');

(async function example() {
	Driver.initializeChrome();
	LoginPage.initialize(Driver);

	try {
		Driver.goToPage("http://www.jogatina.com/");
		Driver.setImplicitTimeOut(10000);


		await LoginPage.login("gab@test.com", "teste123");

	}
	finally {
		Driver.quit();
	}
})();