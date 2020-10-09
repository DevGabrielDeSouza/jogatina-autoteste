const { Builder, By, Key, until, Actions } = require('selenium-webdriver');

function Driver(_driver) {
	this.driver = _driver;
}
function ActionManager(_actions) {
	this.actions = _actions;
}

function errorBehaviour(error) {
	throw error;
}

function debugError(e, action, path){
	console.log("\n\n\n==================================================\nError in module:\n"
		+"webdriverutils.js\n\nTrigger action:\n"
		+ action +"\n\nError:\n"
		+ e + "\n\nWebElement with path:\n" + path
		+"\n==================================================\n\n\n"
	);
}

module.exports = {
	driver: Driver,

	actions: ActionManager,

	PathType : Object.freeze({
		XPATH: 0,
		ID: 1
	}),

	initializeFirefox: async function () {
		this.driver = new Builder().forBrowser("firefox").build();
		this.actions = this.driver.actions({ bridge: true });
		return await Promise.all([
			(await this.driver),
			(await this.actions)
		]);
	},
	initializeChrome: async function () {
		this.driver = new Builder().forBrowser("chrome").build();
		this.actions = this.driver.actions({ bridge: true });
		return await Promise.all([
			(await this.driver),
			(await this.actions)
		]);
	},
	quit : async function (){
		return this.driver.quit();
	},
	goToPage : async function (url) {
		return this.driver.get(url);
	},
	setImplicitTimeOut : function (timeoutWait) {
		this.driver.manage().setTimeouts({ implicit: (timeoutWait) });
	},
	sleep : async function (time) {
		return await this.driver.sleep(time);
	},
	moveToFrame: async function (path, type){
		return await this.driver.switchTo().frame(this.findElement(path, type));
	},
	findElement:  async function (path, type) {
		switch (type) {
			case this.PathType.XPATH:
				try {
					return await this.driver.findElement(By.xpath(path));
				} catch (e) {
					debugError(e, "Trying to find WebElement.", path),
					errorBehaviour(e);
				}
				break;
			case this.PathType.ID:
				try {
					return await this.driver.findElement(By.id(path));
				} catch (e) {
					debugError(e, "Trying to find WebElement.", path),
					errorBehaviour(e);
				}
				break;
			default:
				console.log("Invalid path type.");
				break;
		}
	},
	clickElement : async function (path, type) {
		return (await this.findElement(path, type)).click().catch(
			e => {
				debugError(e, "Trying to click in WebElement.", path),
				errorBehaviour(e)
			}
		);
	},
	inputTextElement : async function (path, text, type) {
		return (await this.findElement(path, type)).sendKeys(text).catch(
			e => {
				debugError(e, "Trying to input text in WebElement.", path),
				errorBehaviour(e)
			}
		);
	},
	clearTextElement : async function (path, type) {
		return (await this.findElement(path, type)).clear().catch(
			e => {
				debugError(e, "Trying to clear text in WebElement.", path),
				errorBehaviour(e)
			}
		);
	},
	getTextElement : async function (path, type) {
		return (await this.findElement(path, type)).getText().catch(
			e => {
				debugError(e, "Trying to get text in WebElement.", path),
				errorBehaviour(e)
			}
		);
	},
	mouseOverElement : async function (path, type){
		return await Promise.all([
			(await this.findElement(path, type).then(elem => {
				this.actions.move({ origin: elem });
			}).catch(
				e => {
					debugError(e, "Trying to put mouse over WebElement.", path),
					errorBehaviour(e)
				}
			)),
			(await this.actions.perform())
		]);
	}
}