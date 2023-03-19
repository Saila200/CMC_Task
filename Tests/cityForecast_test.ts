import forecastPage from "../pages/cityForecastPage";
const { I } = inject();
Feature("Sydney Weather Forecast");

Scenario(
  "Verify that Third Day from today is rainy day or not",
  async ({ I }) => {
    await forecastPage.cityForecastVisit();
    await forecastPage.findChanceOfRain(3);
  }
);
