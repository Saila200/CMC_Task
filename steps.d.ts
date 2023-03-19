/// <reference types='codeceptjs' />
type steps_file = typeof import("./steps_file");
type constants = typeof import("./helpers/container/constants");
type multiFunctions = typeof import("./components/multiFunctions");
type forecastPage = typeof import("./pages/cityForecastPage");
type BasePage = typeof import("./pages/Base");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    BasePage: BasePage;
    constants: constants;
    multiFunctions: multiFunctions;
    authPage: authPage;
    forecastPage: forecastPage;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
