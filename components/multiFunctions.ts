import { WAIT_SHORT, Key } from "../helpers/container/constants";
const { I } = inject();

export class multiFunctions {
  locator: CodeceptJS.LocatorOrString;
  constructor() {}
  public locateSearchInput() {
    return locate("input[#query]");
  }
  public search(keyword: string) {
    I.waitForClickable(this.locateSearchInput(), WAIT_SHORT);
    I.fillField(this.locateSearchInput(), keyword);
    I.pressKey(Key.ENTER);
  }
  public async findNumberOfElements(locator: CodeceptJS.LocatorOrString) {
    let numOfElements = await I.grabNumberOfVisibleElements(locator);
    return numOfElements;
  }
}
