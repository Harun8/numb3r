const { By, Builder, Key } = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

describe("Game Player Test", function () {
  this.timeout(30000); // Set timeout if necessary

  it("should start game correctly", async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get("http://localhost:3000/");
      await driver.manage().setTimeouts({ implicit: 500 });
      let startGame = await driver.findElement(By.id("start game"));
      await startGame.click();
      await driver.manage().setTimeouts({ implicit: 500 });
      // Add your assertions here

      for (let i = 0; i < 4; i++) {
        let input = await driver.findElement(
          By.css(`input.form_width[type='text']:nth-of-type(${i + 1})`)
        );
        await input.sendKeys(i.toString()); // first input is 0 need change

        if (i === 3) {
          input.sendKeys(Key.ENTER);
        }
      }
    } catch (error) {
      console.error("Error in test execution", error);
    } finally {
      //   await driver.quit();
    }
  });
});
