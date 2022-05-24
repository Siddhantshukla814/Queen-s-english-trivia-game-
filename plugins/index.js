const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "12581d97-7b8b-4519-b02f-b404f401a973");

module.exports = {
  onPostBuild: async ({ netlifyConfig }) => {
    //console.log(netlifyConfig.build.environment.DEPLOY_PRIME_URL)

    console.log("Warming Up The WebPageTest");

    const url = netlifyConfig.build.environment.DEPLOY_PRIME_URL;

    let options = {
      firstViewOnly: true,
      runs: 1,
      pollResults: 5,
    };

    try {
      console.log("WPT Test Started");
      wpt.runTest(url, options, async (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(`Error occured:- ${err}`);
        }
      });
    } catch {
      console.log("Test Failed");
    }
  },
};
