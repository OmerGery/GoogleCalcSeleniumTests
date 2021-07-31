// consts:
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_PlusClass = "PaQdxb mF5fo";
const k_EqualClass = "XRsWPe UUhRt";
const k_NumbersClassTag = "XRsWPe AOvabd";
const k_ResultClassTag = "qv3Wpe";
const { conditionalExpression } = require("@babel/types");
const { Builder, By, Key, util, Button } = require("selenium-webdriver");

class GooglePage {
  static async CreatePage() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(k_GooglePageLink);
    let NumbersButtons = await driver.findElements(
      By.className(k_NumbersClassTag)
    );
    let rightButtons = await driver.findElements(By.className(k_PlusClass));

    //
    //
    let plus = rightButtons[5];
    let equalClass = await driver.findElements(By.className(k_EqualClass));
    let equal = equalClass[0];
    let resultCollection = await driver.findElements(
      By.className(k_ResultClassTag)
    );
    let result = resultCollection[0];

    let calc = await new GooglePage(driver, NumbersButtons, result, plus, equal);
    return calc;
  }
  constructor(driver, numbersButtons, result, additionButton, equalButton) {
    this._driver = driver;
    this._result = result;
    this._numbersButtons = numbersButtons;
    this._additionButton = additionButton;
    this._equalButton = equalButton;
  }
  clickButton(buttonNum) {
    let button = this._numbersButtons[buttonNum - 1];
    button.click();
  }
  getResult() {
    return this._result.getText();
  }
}

class GoogleTests {
  static async Additiontest(num1, num2) {
    let Page = await GooglePage.CreatePage();
    await Page.clickButton(num1);
    await Page._additionButton.click();
    await Page.clickButton(num2);
    await Page._equalButton.click();
    let res = await Page.getResult();
    await Page._driver.sleep(1500);
    await Page._driver.quit();
    return parseInt(res);
  }
}
GoogleTests.Additiontest(3, 9);
// test("Test 1: 10 + 5 = 15 ", async () => {

//   const result = await GoogleTests.Additiontest(3,9)

//   expect(result);

// });
