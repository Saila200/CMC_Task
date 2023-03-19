const { I } = inject();
import { WAIT_SHORT, WAIT_MEDIUM } from "../helpers/container/constants";
import { TestURLs } from "../config/environmentConfig";

export default class BasePage {
  currentDay: string;
  currentDayIndex: number;
  dayfromNow: string;
  todayWeather: CodeceptJS.LocatorOrString;
  constructor() {
    this.todayWeather = locate("#today_refresh");
  }

  public async visit() {
    try {
      this.loadBasePage();
    } catch (error) {
      console.log(error);
    }
  }

  public async loadBasePage() {
    I.amOnPage(TestURLs.Live);
    I.seeElement(this.todayWeather);
    return this;
  }

  public async click(
    locator: CodeceptJS.LocatorOrString,
    wait: number = WAIT_MEDIUM
  ) {
    I.waitForElement(locator, wait);
    I.click(locator);
  }
  public async clickElementWithText(
    tag: string,
    text: string,
    timeout: number = WAIT_SHORT
  ) {
    let element = `//${tag}[contains(text(),'${text}')]`;
    I.waitForElement(element, timeout);
    I.seeElement(element);
    await this.click(element, timeout);
  }

  seeElementWithText(tag: string, text: string, timeout: number = WAIT_SHORT) {
    let element = `//${tag}[contains(text(),'${text}')]`;
    I.waitForElement(element, timeout);
    I.seeElement(element);
  }

  getFutureDate(dayIncrement: number, monthIncrement?: number) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1 + monthIncrement;
    let dd = today.getDate() + dayIncrement;

    return (
      dd.toString().padStart(2, "0") +
      " " +
      mm.toString().padStart(2, "0") +
      " " +
      yyyy.toString()
    );
  }

  getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let mm = months[today.getMonth()];
    let dd = today.getDate();
    var week = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    var day = week[today.getDay()];

    return (
      day.toString() +
      " " +
      dd.toString().padStart(2, "0") +
      " " +
      mm.toString() +
      " " +
      yyyy.toString()
    );
  }
  async getDayFromNow(getCurrentDay: string, noOfDays: number) {
    var week = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    for (var i = 0; i <= week.length; i++) {
      if (getCurrentDay === week[i]) {
        this.currentDay = week[i];
        this.currentDayIndex = i;
      }
    }

    if (this.currentDayIndex >= noOfDays + 1) {
      this.dayfromNow = week[this.currentDayIndex - (noOfDays + 1)];
    } else {
      this.dayfromNow = week[this.currentDayIndex + noOfDays];
    }

    return this.dayfromNow;
  }

  public async findNumberOfElements(locator: CodeceptJS.LocatorOrString) {
    let numOfElements = await I.grabNumberOfVisibleElements(locator);
    return numOfElements;
  }
}
