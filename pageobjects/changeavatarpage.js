function DriverUtils(_driver) {
	this.driver = _driver;
}

///html/body/form/div[1]/div/ul/li[6]/label/img
///html/body/form/div[1]/div/ul/li[6]/label/img
const ElementsPaths = {
	PopupFrame : "/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe",
	Avatares : function(id){
		return "/html/body/form/div[1]/div/ul/li[" + id + "]/label/img"
	},
	ConfirmButton:  "/html/body/form/div[2]/div/div[2]/input",
	FeedbackText: "/html/body/div[2]/div/div/span"
}

let sleepWait = 3000;

module.exports = {
	driver : DriverUtils,
	initialize : function (_driver) {
		this.driver = _driver;
	},
	moveToFrame : async function () {
		return await this.driver.moveToFrame(ElementsPaths.PopupFrame, this.driver.PathType.XPATH);
	},
	optionAvatar : async function (id) {
		return await this.driver.clickElement(ElementsPaths.Avatares(id), this.driver.PathType.XPATH);
		//return await this.driver.clickElement("/html/body/form/div[1]/div/ul/li[17]/label/img", this.driver.PathType.XPATH);
	},
	confirmButton : async function () {
		return await this.driver.clickElement(ElementsPaths.ConfirmButton, this.driver.PathType.XPATH);
	},
	getFeedback : async function () {

		await this.driver.sleep(sleepWait);

		let text = await this.driver.getTextElement(ElementsPaths.FeedbackText, this.driver.PathType.XPATH);

		console.log(text);

		return text;
	},
	selectAvatarRoutine : async function(id){
		return await Promise.all([
			(await this.moveToFrame()),
			(await this.optionAvatar(id)),
			(await this.confirmButton()),
			(await this.getFeedback())
		]);
	}
}