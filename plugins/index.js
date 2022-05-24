const WebPageTest = require("webpagetest");
const { runTest } = require("./wptHelpers");

require("dotenv");

const wpt = new WebPageTest("https://www.webpagetest.org", process.env.WPT_API_KEY);

module.exports = {
  onPostBuild: async ({ netlifyConfig }) => {
    console.log("Warming Up The WebPageTest");

    const url = netlifyConfig.build.environment.DEPLOY_PRIME_URL;

    let options = {
      firstViewOnly: true,
      runs: 1,
      pollResults: 5,
    };

    console.log("WPT Test Started");

    await runTest(wpt, url, options)
      .then(async (test) => {
        if (test) {
          console.log(test);
        }
      })
      .catch(async (err) => {
        console.log(err);
      });
  },
};
