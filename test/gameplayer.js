const { By, Builder, Key, until } = require("selenium-webdriver");
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

      let startGame = await driver.findElement(By.id("start game")); // Ensure this matches the actual ID
      await startGame.click();

      let setNumber = 1; // Start with the first set (XPath is 1-based for indexes)
      let inputsPerSet = 4; // Assuming there are 4 inputs per set

      while (setNumber < 6) {
        // Adjust as needed for the number of sets
        let doubleValueChecker = [];
        for (let i = 1; i <= inputsPerSet; i++) {
          let inputXPath = `/html/body/div[2]/div[${setNumber}]/form/input[${i}]`;
          let input = await driver.findElement(By.xpath(inputXPath));
          let value = await input.getAttribute("value");
          let numberGenerator = Math.floor(Math.random() * 9 + 1);

          while (doubleValueChecker.includes(numberGenerator)) {
            numberGenerator = Math.floor(Math.random() * 9 + 1);
          }
          doubleValueChecker.push(numberGenerator);

          if (value === "") {
            await input.sendKeys(numberGenerator.toString()); // Send number as string
          }

          if (i === inputsPerSet) {
            await input.sendKeys(Key.ENTER);
          }
        }

        setNumber++; // Increment setNumber for the next set
        if (setNumber < 6) {
          let newSetXPath = `/html/body/div[2]/div[${setNumber}]`;
          // Wait for the new set to appear
          await driver.wait(until.elementLocated(By.xpath(newSetXPath)), 10000);
        }
      }
      await driver.findElement(By.id("start game")); // Ensure this matches the actual ID
    } catch (error) {
      console.error("Error in test execution", error);
    } finally {
      await driver.quit(); // Uncomment this to close the browser after the test
    }
  });
});
