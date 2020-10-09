function DriverUtils(_driver) {
	this.driver = _driver;
}

const ElementsPaths = {
	OpenLoginButton: "/html/body/div[1]/div/div[2]/a",
	InputEmailField: "/html/body/div[1]/div/div[2]/div/form/div[1]/input",
	InputPasswordField: "html/body/div[1]/div/div[2]/div/form/div[3]/input",
	ConfirmLoginButton: "/html/body/div[1]/div/div[2]/div/form/input"
}

module.exports = {
	driver: DriverUtils,
	getDriver: function () {
		return this.driver;
	},
	initialize: function (_driver) {
		this.driver = _driver;
	},
	openLogin: async function () {
		await this.driver.clickElement(ElementsPaths.OpenLoginButton, this.driver.PathType.XPATH);
	},
	inputEmail: async function (email) {
		await this.driver.inputTextElement(ElementsPaths.InputEmailField, email, this.driver.PathType.XPATH);
	},
	inputPassword: async function (password) {
		await this.driver.inputTextElement(ElementsPaths.InputPasswordField, password, this.driver.PathType.XPATH);
	},
	confirmLogin: async function () {
		await this.driver.clickElement(ElementsPaths.ConfirmLoginButton, this.driver.PathType.XPATH);
	},
	login: async function (email, password) {

		await this.openLogin();
		await this.inputEmail(email);
		await this.inputPassword(password);
		await this.confirmLogin();
	}
}