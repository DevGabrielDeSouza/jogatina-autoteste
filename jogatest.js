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

	await SelectAvatar(avatarPath);

}

async function SelectAvatar(avatarPath) {

	await driver.switchTo().defaultContent();
	await driver.switchTo().frame(driver.findElement(By.xpath("/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe")));

	let startMessage = await driver.findElement(By.xpath("/html/body/div[2]/div/div")).getText();

	//click in the new avatar
	await ClickElement(avatarPath);

	//click in confirm avatar change
	await ClickElement("/html/body/form/div[2]/div/div[2]/input");

	//debug result of the avatar change
	let currentMessage = await driver.findElement(By.xpath("/html/body/div[2]/div/div")).getText();

	
	//click in the close frame button
	await driver.switchTo().defaultContent();
	await ClickElement("/html/body/div[7]/div[1]/div[2]/div[2]/button[4]");
}



(async function example() {
	driver = await new Builder().forBrowser('chrome').build();
	try {
		// Navigate to Url
		await driver.get("http://www.jogatina.com/");

		driver.manage().setTimeouts({ implicit: (timeoutWait) });

		await LoginFirstPage("gab@test.com", "teste123");


		try{await ChangeAvatar("/html/body/form/div[1]/div/ul/li[18]/label/img");}catch{
			await driver.get("https://www.jogatina.com/welcome.do");
		}
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[17]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[16]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[15]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[14]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[13]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[12]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[11]/label/img");
		await ChangeAvatar("/html/body/form/div[1]/div/ul/li[10]/label/img");

	}
	finally {
		driver.quit();
	}
})();


function DebugClass(e){
	console.log("Nome: " + (e).constructor.toString());
}