const { Builder, By, Key, until } = require('selenium-webdriver');

const timeoutWait = 10000;

let driver;

async function TextInElement(path, text) {
	await driver.findElement(By.xpath(path)).sendKeys(text);
}

async function ClickElement(path) {

	await driver.findElement(By.xpath(path)).click();
}

async function ClickElementWhenVisible(path) {
	errorInLastTest = false;
	try {
		await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(path))), timeoutWait).then(async el => {

			try{
				await driver.findElement(By.xpath(path)).click();
			}catch(e){
				console.log("\n\n==================================================\nErro no click: \n"
					+ e + "\n\nCom o path: \n" + path +
					"\n==================================================\n\n")
			}

		})
	} catch (e) {

		console.log("\nErro ao buscar elemento: " + e + "\nCom o path: " + path + "\n");
		errorInLastTest = true;

		/*DebugClass(e);*/

		/*if (e instanceof NoSuchElementError) {
			console.log("Elemento não encontrado!");

		}
		console.log("Chegou aqui!!");*/
	}
}

async function LoginFirstPage(username, password) {

	await ClickElement("/html/body/div[1]/div/div[2]/a");
	//await ClickElementWhenVisible("/html/body/div[1]/div/div[37]/a");

	await TextInElement("/html/body/div[1]/div/div[2]/div/form/div[1]/input", username);
	await TextInElement("/html/body/div[1]/div/div[2]/div/form/div[3]/input", password);

	//confirm
	await ClickElement("/html/body/div[1]/div/div[2]/div/form/input");
}

async function ChangeAvatar(avatarPath) {
	await driver.switchTo().defaultContent();


	//Move pointer to user side menu
	const actions = driver.actions({ bridge: true });

	await driver.findElement(By.xpath("/html/body/div[1]/div/ul/li[6]/a/i")).then(elem => {
		actions.move({ origin: elem })
			.press();
	});
	await actions.perform();

	//Open change avatar image option
	await ClickElement("/html/body/div[1]/div/ul/li[6]/ul/li[9]");

}



(async function example() {
	driver = await new Builder().forBrowser('firefox').build();
	try {
		// Navigate to Url
		await driver.get("http://www.jogatina.com/");

		driver.manage().setTimeouts({ implicit: (timeoutWait) });

		await LoginFirstPage("gab@test.com", "teste123");


		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[18]/label/img");

	}
	finally {
		driver.quit();
	}
})();


function DebugClass(e){
	console.log("Nome: " + (e).constructor.toString());
}