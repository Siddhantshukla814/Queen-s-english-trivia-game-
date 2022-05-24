const WebPageTest = require("webpagetest");
const { runTest } = require("./wptHelpers");

const wpt = new WebPageTest("https://www.webpagetest.org", "12581d97-7b8b-4519-b02f-b404f401a973");

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
