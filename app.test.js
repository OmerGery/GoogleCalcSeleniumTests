"use strict";
let GooglePage = require("./GooglePage.js");
// Tests Functions
class GoogleTests {
  static async Additiontest(num1, num2) {
    let Page = await GooglePage.CreatePage();
    await Page.enterNumber(num1);
    await Page._additionButton.click();
    await Page.enterNumber(num2);
    await Page._equalButton.click();
    let res = await Page.getResult();
    await Page._driver.sleep(1000);
    await Page._driver.quit();
    return parseInt(res);
  }
  static async buttonCountTest() {
    let Page = await GooglePage.CreatePage();
    let allbuttons = Page._buttonsAsText;
    let amountOfNumberedButtons = 0;
    let amountOfButtons = 0;
    for (let i = 0; i < allbuttons.length; i++) {
      let currentText = await allbuttons[i].getText();
      if (currentText == "") {
        // this the first tr tag which is outside of the Calc table.
        break;
      }
      amountOfButtons++;
      if (currentText >= "0" && currentText <= "9") {
        amountOfNumberedButtons++;
      }
    }
    let res = "The amount of buttons is: " + amountOfButtons + "\n";
    res += "The amount of numbered buttons is: " + amountOfNumberedButtons;
    await Page._driver.quit();
    return res;
  }
}
//Jest Tests:
const jestTimeOutTime = 30000;
jest.setTimeout(jestTimeOutTime);

//test 1 consts:
const num1 = 5;
const num2 = 10;
const sum = num1 + num2;
// the tests:
test(
  "Test 1: Addition of 2 numbers: " + num1 + " + " + num2 + " = " + sum,
  async () => {
    const result = await GoogleTests.Additiontest(num1, num2);
    expect(result).toBe(sum);
  }
);

test("Button Counting Test:", async () => {
  const outputString = await GoogleTests.buttonCountTest();
  console.log(outputString);
});
