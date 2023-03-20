const { I } = inject();
import { WAIT_SHORT, City, Day } from "../helpers/container/constants";
import { multiFunctions } from "../components/multiFunctions";
import BasePage from "./Base";

class forecastPage extends BasePage {
  todayDateFromPage: CodeceptJS.LocatorOrString;
  percentageOfRain: CodeceptJS.LocatorOrString;
  forecastDateFromNow: CodeceptJS.LocatorOrString;
  multiFunctions: multiFunctions;
  forecastDateLocator: CodeceptJS.LocatorOrString;
  forecastTable: CodeceptJS.LocatorOrString;

  constructor() {
    super();
    this.todayDateFromPage = locate('p[class = "date"]').inside("#content");
    this.forecastTable = locate('//*[@id="content"]/div');
    this.multiFunctions = new multiFunctions();
  }

  public async cityForecastVisit() {
    this.loadBasePage();
    await this.clickElementWithText("h3", City.SYD);
    I.waitForText(`${City.SYD} Forecast`, WAIT_SHORT);
  }

  public async findChanceOfRain(noOfDays: number) {
    let forecastFullDateString = await I.grabTextFrom(this.todayDateFromPage);
    await this.findDateFromNow(forecastFullDateString, noOfDays);

    let forecastTableValue = (await this.findForecastTable()) - 1;
    this.percentageOfRain = locate(".pop")
      .inside(locate('dd[class="rain"]').withText("Chance of any rain: "))
      .inside(locate(".day"))
      .at(forecastTableValue)
      .inside("#content");

    const percentageOfRainText = await I.grabTextFrom(this.percentageOfRain);
    console.log(percentageOfRainText);

    if (percentageOfRainText.toString() > "50%") {
      throw new Error(
        `Looks like it will a rainy day on ${this.forecastDateFromNow}`
      );
    } else {
      I.say(`No rain on ${this.forecastDateFromNow}`);
    }
  }

  async findDateFromNow(fulldate: string, noOfDays: number) {
    let splitDateString = fulldate.split(" ");
    await this.getDayFromNow(splitDateString[7], noOfDays);

    this.forecastDateFromNow =
      this.dayfromNow +
      " " +
      [parseInt(splitDateString[8]) + noOfDays] +
      " " +
      splitDateString[9];
    console.log(this.forecastDateFromNow);
  }
  public async findForecastTable() {
    let noOfForecastTables = await this.multiFunctions.findNumberOfElements(
      this.forecastTable
    );
    for (var i = 1; i <= noOfForecastTables; i++) {
     
      this.forecastDateLocator = locate(`//*[@id="content"]/div[${i}]/h2`);
      let forecasttableExist: boolean = await this.tryTo(() =>I.waitForElement(this.forecastDateLocator, WAIT_SHORT));
      if(!forecasttableExist)
      {
      I.say("Forecast table is not existed");
      i = i + 1;
      this.forecastDateLocator = locate(`//*[@id="content"]/div[${i}]/h2`);
      }

      let forecastDate = await I.grabTextFrom(this.forecastDateLocator);
      console.log(forecastDate)

      if (this.forecastDateFromNow == forecastDate) {
        I.say("Forecast Date is matched");
      } else {
        continue;
      }
      return i;
    }
  }
}
export = new forecastPage();
