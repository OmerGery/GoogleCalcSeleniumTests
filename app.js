// consts:
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_PlusClass = "PaQdxb mF5fo";
const k_EqualClass = "XRsWPe UUhRt";
const k_ButtonsClassTag = "XRsWPe AOvabd";
const k_ResultClassTag = "qv3Wpe";
const { conditionalExpression } = require("@babel/types");
const { Builder, By, Key, util, Button } = require("selenium-webdriver");

class GooglePage {
  static async createPage() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(k_GooglePageLink);
    let rightButtons = await driver.findElements(
      By.className(k_ButtonsClassTag)
    );
    let leftButtons = await driver.findElements(By.className(k_PlusClass));
    let plus = leftButtons[5];
    let equalClass = await driver.findElements(By.className(k_EqualClass));
    let equal = equalClass[0];
    let resultCollection = await driver.findElements(
      By.className(k_ResultClassTag)
    );
    let result = resultCollection[0];
    
    let calc = await new GooglePage(driver,rightButtons, result, plus,equal);
    return calc;
  }
  constructor(driver,buttons, result, additionButton,equalButton) {
    this._driver = driver;
    this._result = result;
    this._buttons = buttons;
    this._additionButton = additionButton;
    this._equalButton = equalButton
  }
  clickButton(buttonNum) {
    let button = this._buttons[buttonNum - 1];
    button.click();
  }
  getResult() {
    return this._result.getText();
  }
  async makeAdittionWithCalc(num1, num2) {
    await this.clickButton(num1);
    await this._additionButton.click();
    await this.clickButton(num2);
    await this._equalButton.click();
    if(num1 + num2 != this._result)
    {
      console.log("the machine calculated the wrong result");
    }
  }
}
async function main() {
  calc = await GooglePage.createPage();
  // await calc.clickButton(4);
  // await calc.clickButton(7);
  // let a = await calc.getResult();
  // console.log("\n" + a + "\n");
  await calc.makeAdittionWithCalc(9,5);
}
main();
