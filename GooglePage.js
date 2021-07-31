// consts:
"use strict";
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_PlusClass = "PaQdxb mF5fo";
const k_EqualClass = "XRsWPe UUhRt";
const k_NumbersClass = "XRsWPe AOvabd";
const k_ResultClassTag = "qv3Wpe";
const { conditionalExpression } = require("@babel/types");
const { Builder, By, Key, util, Button } = require("selenium-webdriver");
const numberToButtonMap = [9, 6, 7, 8, 3, 4, 5, 0, 1, 2];
//

// The class representing the page:
class GooglePage {
  static async CreatePage() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(k_GooglePageLink);
    let NumbersButtons = await driver.findElements(
      By.className(k_NumbersClass)
    );
    let rightButtons = await driver.findElements(By.className(k_PlusClass));
    let plus = rightButtons[5];
    let equalClass = await driver.findElements(By.className(k_EqualClass));
    let equal = equalClass[0];
    let allbuttons = await driver.findElements(By.tagName("td"));
    let resultCollection = await driver.findElements(
      By.className(k_ResultClassTag)
    );
    let result = resultCollection[0];
    let calc = await new GooglePage(
      driver,
      NumbersButtons,
      result,
      plus,
      equal,
      allbuttons
    );
    return calc;
  }
  constructor(
    driver,
    numbersButtons,
    result,
    additionButton,
    equalButton,
    buttonsAsText
  ) {
    this._driver = driver;
    this._result = result;
    this._numbersButtons = numbersButtons;
    this._additionButton = additionButton;
    this._equalButton = equalButton;
    this._buttonsAsText = buttonsAsText;
  }

  async enterNumber(buttonNum) {
    // recursive method to enter a number by pressing the calc keys.
    let digit = buttonNum % 10;
    if (buttonNum > 0) {
      this.enterNumber(Math.floor(buttonNum / 10));
    }
    let button = this._numbersButtons[numberToButtonMap[digit]];
    await button.click();
  }
  getResult() {
    return this._result.getText();
  }
}
module.exports = GooglePage;
