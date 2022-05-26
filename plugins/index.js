const WebPageTest = require("webpagetest");
const { runTest } = require("./wptHelpers");

require("dotenv");

module.exports = {
  onPostBuild: async ({ netlifyConfig }) => {
    console.log("🔥🔥Warming Up The WebPageTest🔥🔥");

    const wpt = new WebPageTest(
      "https://www.webpagetest.org",
      netlifyConfig.build.environment.WPT_API_KEY
    );

    const url = netlifyConfig.build.environment.DEPLOY_PRIME_URL;

    let options = {
      firstViewOnly: true,
      runs: 1,
      pollResults: 5,
    };

    console.log("WPT Test Started 💨💨💨");

    await runTest(wpt, url, options)
      .then(async (test) => {
        if (test) {
          console.log(
            " \n\n Scores: \n\n TTFB:" +
              test.result.data.average.firstView["TTFB"] +
              "\n Start Render:" +
              test.result.data.average.firstView["render"] +
              "\n FCP:" +
              test.result.data.average.firstView["firstContentfulPaint"] +
              "\n LCP:" +
              test.result.data.average.firstView["chromeUserTiming.LargestContentfulPaint"] +
              "\n CLS:" +
              test.result.data.average.firstView["chromeUserTiming.CumulativeLayoutShift"] +
              "\n TBT:" +
              test.result.data.average.firstView["TotalBlockingTime"] +
              "\n Full WebPageTest results:" +
              test.result.data.summary +
              " \n\n"
          );
        }
      })
      .catch(async (err) => {
        console.log(err);
      });
  },
};
