function DriverUtils(_driver) {
	this.driver = _driver;
}

const ElementsPaths = {
	OpenRegisterButton: "/html/body/div[3]/div/div/a",
	InputEmailField: "emailIn",
	InputPasswordField: "password-field",
	ConfirmRegisterButton: "/html/body/div[2]/div/div/div[1]/form/div/fieldset[3]/input"
}

module.exports = {
	driver: DriverUtils,
	initialize: function (_driver) {
		this.driver = _driver;
	},
	openRegister: async function () {
		return await this.driver.clickElement(ElementsPaths.OpenRegisterButton, this.driver.PathType.XPATH);
	},
	inputEmail: async function (email) {
		return await this.driver.inputTextElement(ElementsPaths.InputEmailField, email, this.driver.PathType.ID);
	},
	inputPassword: async function (password) {
		return await this.driver.inputTextElement(ElementsPaths.InputPasswordField, password, this.driver.PathType.ID);
	},
	confirmRegister: async function () {
		return await this.driver.clickElement(ElementsPaths.ConfirmRegisterButton, this.driver.PathType.XPATH);
	},
	registerRoutine: async function (email, password) {

		return await Promise.all([
			(await this.openRegister()),
			(await this.inputEmail(email)),
			(await this.inputPassword(password)),
			(await this.confirmRegister())
		]);
	}
}
