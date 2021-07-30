// consts:
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_ButtonsClassTag = "XRsWPe AOvabd";
const k_ResultClassTag = "qv3Wpe";
const { conditionalExpression } = require("@babel/types");
const { Builder, By, Key, util, Button } = require("selenium-webdriver");

class GooglePage {
  static async createCalc() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(k_GooglePageLink);
    let rightButtons = await driver.findElements(
      By.className(k_ButtonsClassTag)
    );
    let resultCollection = await driver.findElements(
      By.className(k_ResultClassTag)
    );
    let result = resultCollection[0];
    let calc = await new GooglePage(rightButtons, result);
    return calc;
  }
  constructor(buttons, result) {
    this._result = result;
    this._buttons = buttons;
  }
  clickButton(buttonNum) {
    let button = this._buttons[buttonNum - 1];
    button.click();
  }

  getResult() {
    return this._result.getText();
  }
}
