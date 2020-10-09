const { Builder, By, Key, until } = require('selenium-webdriver');

const Driver = require('./webdriverutils');

(async function example() {
	Driver.initializeChrome();

	try {
		Driver.goToPage("http://www.jogatina.com/");
		Driver.setImplicitTimeOut(10000);


		//await Driver.sleep(6000);

		//await Driver.driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/form/div/fieldset[3]/input")).click();



		//Path routines to test errors:
		//await Driver.findElement("/html/body/div[2]/div/div/div[1]/form/div/fieldset[3]/input", Driver.PathType.XPATH);
		//await Driver.clickElement("/html/body/div[2]/div/div/div[1]/form/div/fieldset[3]/input", Driver.PathType.XPATH);
		//await Driver.findElement("/html/body/div[2]/div/div/div[1]/form/div/fieldset[355]/input", Driver.PathType.XPATH);
		//await Driver.clickElement("/html/body/div[2]/div/div/div[1]/form/div/fieldset[355]/input", Driver.PathType.XPATH);

		//Id routines to test errors:
		//await Driver.findElement("botao", Driver.PathType.ID);
		//await Driver.clickElement("botao", Driver.PathType.ID);
		//await Driver.findElement("zzzqqq", Driver.PathType.ID);
		//await Driver.clickElement("zzzqqq", Driver.PathType.ID);





		//await Driver.clickElement("/html/body/div[1]/div/div[2]/a", Driver.PathType.XPATH);


		await Driver.sleep(6000);

	}
	finally {
		//Driver.sleep(10000);
		Driver.quit();
	}
})();