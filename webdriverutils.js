const { Builder, By, Key, until } = require('selenium-webdriver');

function Driver(_driver) {
	this.driver = _driver;
}

module.exports = {
	driver: Driver,

	initializeFirefox: async function () {
		this.driver = new Builder().forBrowser("firefox").build();
	},
	initializeChrome: async function () {
		this.driver = new Builder().forBrowser("chrome").build();
	},
	quit : function (){
		this.driver.quit();
	},
	goToPage: async function (url) {
		this.driver.get(url);
	},
	setImplicitTimeOut: function (timeoutWait) {
		this.driver.manage().setTimeouts({ implicit: (timeoutWait) });
	},
	sleep: async function (time) {
		await this.driver.sleep(time);
	},
	teste: function () {
		console.log("teste OK!!");
	},
	clickElement: async function (path, type) {
		switch (type) {
			case PathType.XPATH:
				try {
					await driver.findElement(By.xpath(path)).click();
				} catch (e) {
					console.log("\n\n==================================================\nErro no click: \n"
						+ e + "\n\nCom o path: \n" + path +
						"\n==================================================\n\n");
				}
				break;
			case PathType.ID:
				try {
					await driver.findElement(By.id(path)).click();
				} catch (e) {
					console.log("\n\n==================================================\nErro no click: \n"
						+ e + "\n\nCom o path: \n" + path +
						"\n==================================================\n\n");
				}
				break;
			default:
				console.log("Invalid path type.");
				break;
		}
	},
	inputTextElement: async function (path, text, type) {
		switch (type) {
			case PathType.XPATH:
				try {
					await driver.findElement(By.xpath(path)).sendKeys(text);
				} catch (e) {
					console.log("\n\n==================================================\nErro no click: \n"
						+ e + "\n\nCom o path: \n" + path +
						"\n==================================================\n\n");
				}
				break;
			case PathType.ID:
				try {
					await driver.findElement(By.id(path)).sendKeys(text);
				} catch (e) {
					console.log("\n\n==================================================\nErro no click: \n"
						+ e + "\n\nCom o path: \n" + path +
						"\n==================================================\n\n");
				}
				break;
			default:
				console.log("Invalid path type.");
				break;
		}
	}
}