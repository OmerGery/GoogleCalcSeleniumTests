// consts:
const k_GooglePageLink = "https://www.google.co.il/search?q=google+calculator";
const k_PlusClass = "PaQdxb mF5fo";
const k_EqualClass = "XRsWPe UUhRt";
const k_NumbersClassTag = "XRsWPe AOvabd";
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
      By.className(k_NumbersClassTag)
    );
    let rightButtons = await driver.findElements(By.className(k_PlusClass));
    let plus = rightButtons[5];
    let equalClass = await driver.findElements(By.className(k_EqualClass));
    let equal = equalClass[0];
    let resultCollection = await driver.findElements(
      By.className(k_ResultClassTag)
    );
    let result = resultCollection[0];

    let calc = await new GooglePage(
      driver,
      NumbersButtons,
      result,
      plus,
      equal
    );
    return calc;
  }
  constructor(driver, numbersButtons, result, additionButton, equalButton) {
    this._driver = driver;
    this._result = result;
    this._numbersButtons = numbersButtons;
    this._additionButton = additionButton;
    this._equalButton = equalButton;
  }

  enterNumber(buttonNum) {
    // recursive method to enter a number by pressing the calc keys.
    let digit = buttonNum % 10;
    if (buttonNum > 0) {
      this.enterNumber(Math.floor(buttonNum / 10));
    }
    let button = this._numbersButtons[numberToButtonMap[digit]];
    button.click();
  }
  getResult() {
    return this._result.getText();
  }
}

class GoogleTests {
  static async Additiontest(num1, num2) {
    let Page = await GooglePage.CreatePage();
    await Page.enterNumber(num1);
    await Page._additionButton.click();
    await Page.enterNumber(num2);
    await Page._equalButton.click();
    let res = await Page.getResult();
    await Page._driver.sleep(1500);
    await Page._driver.quit();
    return parseInt(res);
  }
}
async function xmain() {
  let x = await GoogleTests.Additiontest(10, 5);
  console.log(x);
}
xmain();
// test("Test 1: 10 + 5 = 15 ", async () => {

//   const result = await GoogleTests.Additiontest(3,9)

//   expect(result);

// });
