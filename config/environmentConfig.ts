
export enum TestEnvironment {
    Dev = "Dev",
    Prd = "Live",
  }
  
  export const TestURLs = {
    [TestEnvironment.Dev]: "http://www.dev.bom.gov.au/",
    [TestEnvironment.Prd]: "http://www.bom.gov.au/",
  };