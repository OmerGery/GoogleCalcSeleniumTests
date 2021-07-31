// consts:
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_PlusClass = "PaQdxb mF5fo";
const k_EqualClass = "XRsWPe UUhRt";
const k_ButtonsClassTag = "XRsWPe AOvabd";
const k_ResultClassTag = "qv3Wpe";
const { conditionalExpression } = require("@babel/types");
const { Builder, By, Key, util, Button } = require("selenium-webdriver");

class GooglePage {
  static async CreatePage() {
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

    let calc = await new GooglePage(driver, rightButtons, result, plus, equal);
    return calc;
  }
  constructor(driver, buttons, result, additionButton, equalButton) {
    this._driver = driver;
    this._result = result;
    this._buttons = buttons;
    this._additionButton = additionButton;
    this._equalButton = equalButton;
  }
  clickButton(buttonNum) {
    let button = this._buttons[buttonNum - 1];
    button.click();
  }
  getResult() {
    return this._result.getText();
  }
}

class GoogleTests{
    static async Additiontest(num1, num2) {
      let Page = await GooglePage.CreatePage();
      await Page.clickButton(num1);
      await Page._additionButton.click();
      await Page.clickButton(num2);
      await Page._equalButton.click();
      let res = await Page.getResult();
      await Page._driver.sleep(1500);
      await Page._driver.quit();
      return res;
    }
  };
async function main()
{
await GoogleTests.Additiontest(3, 9);
await GoogleTests.Additiontest(4,7);
}
main();
//GoogleTests.Additiontest(4, 8)
// test("good ", () => {
//   expect(GoogleTests.Additiontest(3, 9).toBe("12"));
// });
