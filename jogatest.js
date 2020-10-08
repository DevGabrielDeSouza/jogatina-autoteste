const { Builder, By, Key, until } = require('selenium-webdriver');

const timeoutWait = 10000;

let driver;

const PathType = Object.freeze({
	XPATH: 0,
	ID: 1
});

async function InputTextElement(path, text, type) {

	switch (type) {
		case PathType.XPATH:
			try{
				await driver.findElement(By.xpath(path)).sendKeys(text);
			}catch(e){
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

async function ClearTextElement(path, type) {

	switch (type) {
		case PathType.XPATH:
			try{
				await driver.findElement(By.xpath(path)).clear();
			}catch(e){
				console.log("\n\n==================================================\nErro no click: \n"
					+ e + "\n\nCom o path: \n" + path +
					"\n==================================================\n\n");
			}
			break;
		case PathType.ID:
			try {
				await driver.findElement(By.id(path)).clear();
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

async function ClickElement(path, type) {

	switch (type) {
		case PathType.XPATH:
			try{
				await driver.findElement(By.xpath(path)).click();
			}catch(e){
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

	
}

/*async function ClickElementWhenVisible(path) {
	errorInLastTest = false;
	try {
		await driver.wait(until(driver.findElement(By.xpath(path))), timeoutWait).then(async el => {

			try{
				await driver.findElement(By.xpath(path)).click();
			}catch(e){
				console.log("\n\n==================================================\nErro no click: \n"
					+ e + "\n\nCom o path: \n" + path +
					"\n==================================================\n\n");
			}

		})
	} catch (e) {

		console.log("\nErro ao buscar elemento: " + e + "\nCom o path: " + path + "\n");
		errorInLastTest = true;

		//DebugClass(e);

		//if (e instanceof NoSuchElementError) {
		//	console.log("Elemento não encontrado!");

		//}
		console.log("Chegou aqui!!");
	}
}*/

async function LoginFirstPage(username, password) {

	await ClickElement("/html/body/div[1]/div/div[2]/a", PathType.XPATH);
	//await ClickElementWhenVisible("/html/body/div[1]/div/div[37]/a");

	await InputTextElement("/html/body/div[1]/div/div[2]/div/form/div[1]/input", username, PathType.XPATH);
	await InputTextElement("/html/body/div[1]/div/div[2]/div/form/div[3]/input", password, PathType.XPATH);

	//confirm
	await ClickElement("/html/body/div[1]/div/div[2]/div/form/input", PathType.XPATH);
}

async function OpenSideMenu(){
	await driver.switchTo().defaultContent();

	//Move pointer to user side menu
	const actions = driver.actions({ bridge: true });

	await driver.findElement(By.xpath("/html/body/div[1]/div/ul/li[6]/a/i")).then(elem => {
		actions.move({ origin: elem });
	});
	await actions.perform();
}

async function ChangeAvatarId(id) {
	await OpenSideMenu();

	//Open change avatar image option
	await ClickElement("/html/body/div[1]/div/ul/li[6]/ul/li[9]", PathType.XPATH);

	await SelectAvatarId(id);

}

async function ChangeAvatarPath(avatarPath) {
	await OpenSideMenu();

	//Open change avatar image option
	await ClickElement("/html/body/div[1]/div/ul/li[6]/ul/li[9]", PathType.XPATH);

	await SelectAvatarPath(avatarPath);

}

async function SelectAvatarId(id){

	await SelectAvatarPath("/html/body/form/div[1]/div/ul/li[" + id + "]/label/img");
}

async function SelectAvatarPath(path) {

	await driver.switchTo().defaultContent();
	await driver.switchTo().frame(driver.findElement(By.xpath("/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe")));

	//let startMessage = await driver.findElement(By.xpath("/html/body/div[2]/div/div")).getText();

	//click in the new avatar
	await ClickElement(path, PathType.XPATH);

	//click in confirm avatar change
	await ClickElement("/html/body/form/div[2]/div/div[2]/input", PathType.XPATH);

	await driver.sleep(4000);

	console.log(await driver.findElement(By.xpath("/html/body/div[2]/div/div/span")).getText());
	
	//click in the close frame button
	await driver.switchTo().defaultContent();
	await ClickElement("/html/body/div[7]/div[1]/div[2]/div[2]/button[4]", PathType.XPATH);
}

async function UpdateProfile(){
	await OpenSideMenu();

///html/body/div[1]/div/ul/li[6]/ul/li[8]/a


	//Open profile update option
	await ClickElement("/html/body/div[1]/div/ul/li[6]/ul/li[8]", PathType.XPATH);
	//driver.switchTo().frame(driver.findElement(By.xpath("/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe")));

	//select frame
	await driver.switchTo().frame(driver.findElement(By.xpath("/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe")));

	//city
	await ClearTextElement("campo-new-city", PathType.ID);
	await InputTextElement("campo-new-city", "Rio de Janeiro", PathType.ID);
	
	//state
	await ClearTextElement("campo-new-state", PathType.ID);
	await InputTextElement("campo-new-state", "RJ", PathType.ID);

	//country
	await ClickElement("/html/body/div[2]/div/form/div/div[3]/select/option[3]", PathType.XPATH);

	await ClickElement("femGender", PathType.ID);

	//day
	await ClickElement("/html/body/div[2]/div/form/div/div[5]/select[1]/option[16]", PathType.XPATH);

	//month
	await ClickElement("/html/body/div[2]/div/form/div/div[5]/select[2]/option[10]", PathType.XPATH);

	//year
	await ClickElement("/html/body/div[2]/div/form/div/div[5]/select[3]/option[97]", PathType.XPATH);

	//confirm button
	await ClickElement("/html/body/div[2]/div/form/div/div[6]/input", PathType.XPATH);


	await driver.sleep(4000);

	console.log(await driver.findElement(By.xpath("/html/body/div[2]/div/div/span")).getText());

	//click in the close frame button
	await driver.switchTo().defaultContent();
	await ClickElement("/html/body/div[7]/div[1]/div[2]/div[2]/button[4]", PathType.XPATH);
}


(async function example() {
	driver = await new Builder().forBrowser('chrome').build();
	try {
		// Navigate to Url
		await driver.get("http://www.jogatina.com/");

		driver.manage().setTimeouts({ implicit: (timeoutWait) });

		await LoginFirstPage("gab@test.com", "teste123");
		
		await UpdateProfile();

		for(i = 1; i < 10; i ++){
			await ChangeAvatarId(i);
		}
		

	}
	finally {
		driver.quit();
	}
})();


function DebugClass(e){
	console.log("Nome: " + (e).constructor.toString());
}