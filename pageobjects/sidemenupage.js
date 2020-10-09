function DriverUtils(_driver) {
	this.driver = _driver;
}

const ElementsPaths = {
	ArrowButton: "/html/body/div[1]/div/ul/li[6]/a/i",
	ChangeAvatarOption: "/html/body/div[1]/div/ul/li[6]/ul/li[9]",
	UpdateProfileOption: "/html/body/div[1]/div/ul/li[6]/ul/li[8]"
}

module.exports = {
	driver: DriverUtils,
	initialize: function (_driver) {
		this.driver = _driver;
	},
	mouseOverArrowButton: async function () {
		return await this.driver.mouseOverElement(ElementsPaths.ArrowButton, this.driver.PathType.XPATH);
	},
	optionChangeAvatar: async function () {
		return await this.driver.clickElement(ElementsPaths.ChangeAvatarOption, this.driver.PathType.XPATH);
	},
	popupChangeAvatar: async function () {
		return await Promise.all([
			(await this.mouseOverArrowButton()),
			(await this.optionChangeAvatar())
		]);
	},
	optionUpdateProfile: async function () {
		return await this.driver.clickElement(ElementsPaths.UpdateProfileOption, this.driver.PathType.XPATH);
	},
	popupUpdateProfile: async function () {
		return await Promise.all([
			(await this.mouseOverArrowButton()),
			(await this.optionUpdateProfile())
		]);
	}
}