const Driver = require('../utils/webdriverutils');

const LoginPage = require('../pageobjects/loginpage');
const SideMenuPage = require('../pageobjects/sidemenupage');

(async function example() {
	Driver.initializeChrome();
	Driver.setImplicitTimeOut(10000);
	Driver.goToPage("http://www.jogatina.com/");

	LoginPage.initialize(Driver);
	SideMenuPage.initialize(Driver);

	try {
		await LoginPage.login("gab@test.com", "teste123");
		await SideMenuPage.mouseOverArrowButton();
		await SideMenuPage.popupChangeAvatar();
	}
	finally {
		Driver.quit();
	}
})();