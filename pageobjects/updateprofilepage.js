let sleepWait = 3000;

function DriverUtils(_driver) {
	this.driver = _driver;
}

const ElementsPaths = {
	PopupFrame : "/html/body/div[7]/div[1]/div[2]/div[2]/div[1]/iframe",
	ConfirmButton: "/html/body/div[2]/div/form/div/div[6]/input",
	FeedbackText : "/html/body/div[2]/div/div/span",
	InputCityField : "campo-new-city",
	InputStateField: "campo-new-state",
	Countries: function (id) {
		return "/html/body/div[2]/div/form/div/div[3]/select/option[" + id + "]";
	},
	MaleButton: "mascGender",
	FemaleButton: "femGender",
	DayDropField : function(id) {
		return "html/body/div[2]/div/form/div/div[5]/select[1]/option["+ id +"]";
	},
	MonthDropField: function (id) {
		return "/html/body/div[2]/div/form/div/div[5]/select[2]/option[" + id +"]";
	},
	YearDropField: function (id) {
		return "html/body/div[2]/div/form/div/div[5]/select[1]/option[" + id +"]";
	}
}

module.exports = {
	driver : DriverUtils,
	initialize : function (_driver) {
		this.driver = _driver;
	},
	moveToFrame : async function () {
		return await this.driver.moveToFrame(ElementsPaths.PopupFrame, this.driver.PathType.XPATH);
	},
	optionCountry : async function (id) {
		return await this.driver.clickElement(ElementsPaths.Countries(id), this.driver.PathType.XPATH);
	},
	inputCity: async function (city) {
		return await this.driver.inputTextElement(ElementsPaths.InputCityField, city, this.driver.PathType.ID);
	},
	clearInputCity: async function () {
		return await this.driver.clearTextElement(ElementsPaths.InputCityField, this.driver.PathType.ID);
	},
	inputState: async function (state) {
		return await this.driver.inputTextElement(ElementsPaths.InputStateField, state, this.driver.PathType.ID);
	},
	clearInputState: async function () {
		return await this.driver.clearTextElement(ElementsPaths.InputStateField, this.driver.PathType.ID);
	},
	optionDay: async function (id) {
		return await this.driver.clickElement(ElementsPaths.DayDropField(id), this.driver.PathType.XPATH);
	},
	optionMonth: async function (id) {
		return await this.driver.clickElement(ElementsPaths.MonthDropField(id), this.driver.PathType.XPATH);
	},
	optionYear: async function (id) {
		return await this.driver.clickElement(ElementsPaths.YearDropField(id), this.driver.PathType.XPATH);
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
	updateProfileRoutine : async function (city, state, countryId, dayId, monthId, yearId) {
		return await Promise.all([
			(await this.moveToFrame()),
			(await this.clearInputCity(city)),
			(await this.inputCity(city)),
			(await this.clearInputState(state)),
			(await this.inputState(state)),
			(await this.optionCountry(countryId)),
			(await this.optionCountry(countryId)),
			(await this.optionDay(dayId)),
			(await this.optionMonth(monthId)),
			(await this.optionYear(yearId)),
			(await this.confirmButton()),
			(await this.getFeedback())
		]);
	}
}