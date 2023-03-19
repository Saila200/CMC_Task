import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './Tests/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://www.bom.gov.au/',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file',
  },
  name: 'automation-tester',
  plugins: {
    screenshotOnFail: {
      enabled: true,
      uniqueScreenshotNames: true,
      fullPageScreenshots: true
    },
    autoDelay: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    customLocator: {
      enabled: true,
      attribute: "data-test"
    },
    retryFailedStep: {
      enabled: true
    }
  }
}