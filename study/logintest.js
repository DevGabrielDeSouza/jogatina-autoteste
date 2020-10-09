const Driver = require('../utils/webdriverutils');

const LoginPage = require('../pageobjects/loginpage');
const SideMenuPage = require('../pageobjects/sidemenupage');
const ChangeAvatarPage = require('../pageobjects/changeavatarpage');

(async function example() {
	Driver.initializeChrome();
	Driver.setImplicitTimeOut(10000);
	Driver.goToPage("http://www.jogatina.com/");

	LoginPage.initialize(Driver);
	SideMenuPage.initialize(Driver);
	ChangeAvatarPage.initialize(Driver);

	try {
		await LoginPage.login("gab@test.com", "teste123");
		await SideMenuPage.mouseOverArrowButton();
		await SideMenuPage.popupChangeAvatar();

		await ChangeAvatarPage.selectAvatarRoutine(6);
	}
	finally {
		Driver.quit();
	}
})();