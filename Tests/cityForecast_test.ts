import forecastPage from "../pages/cityForecastPage";
const { I } = inject();
Feature("Weather Forecast");

Scenario(
  "Verify that Third Day from today is rainy day or not in city",
  async ({ I }) => {
    await forecastPage.cityForecastVisit();
    await forecastPage.findChanceOfRain(3);
  }
);
