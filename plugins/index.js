const WebPageTest = require("webpagetest");
const { runTest } = require("./wptHelpers");

module.exports = {
  onPostBuild: async ({ netlifyConfig, inputs, utils }) => {
    console.log("🔥🔥Warming Up The WebPageTest🔥🔥");

    const wpt = new WebPageTest("https://www.webpagetest.org", netlifyConfig.build.environment.WPT_API_KEY);

    const urlToTest = inputs.urls
      ? inputs.urls.length > 0
        ? inputs.urls.replaceAll(" ", "").split(",")
        : [netlifyConfig.build.environment.DEPLOY_PRIME_URL]
      : [netlifyConfig.build.environment.DEPLOY_PRIME_URL];

    const finalResults = [];

    let options = {
      pollResults: 5,
      location: inputs.location,
      firstViewOnly: inputs.firstViewOnly,
      connectivity: inputs.connectivity,
      runs: inputs.runs,
      emulateMobile: inputs.emulateMobile,
      block: inputs.block,
      lighthouse: inputs.lighthouse,
      throttleCPU: inputs.throttleCPU,
    };

    if (inputs.specs) {
      Object.assign(options, { specs: JSON.parse(inputs.specs) });
    }

    console.log("WPT Test Started 💨💨💨");

    await Promise.all(
      urlToTest.map(async (url) => {
        await runTest(wpt, url, options)
          .then((test) => {
            finalResults.push({
              SEC1: "Config: ⬇️",
              Test_URL: test.result.data.url,
              Test_ID: test.result.data.id,
              Full_WebPageTest_Results: test.result.data.summary,
              Test_Location: test.result.data.location,
              Test_Origin: test.result.data.from,
              Connectivity: test.result.data.connectivity,
              SEC2: "Scores: ⬇️",
              TTFB: test.result.data.average.firstView["TTFB"],
              StartRender: test.result.data.average.firstView["chromeUserTiming.LargestContentfulPaint"],
              FCP: test.result.data.average.firstView["firstContentfulPaint"],
              LCP: test.result.data.average.firstView["chromeUserTiming.LargestContentfulPaint"],
              CLS: test.result.data.average.firstView["chromeUserTiming.CumulativeLayoutShift"],
              CLS: test.result.data.average.firstView["chromeUserTiming.CumulativeLayoutShift"],
              TBT: test.result.data.average.firstView["TotalBlockingTime"],
              Full_WebPageTest_Results: test.result.data.summary,
            });
          })
          .catch((error) => {
            if (error.statusCode == 400) {
              console.log(error);
              utils.build.cancelBuild("Please Update Your API KEY", { error });
            } else {
              utils.build.cancelBuild("Perf Budget failed", { error });
            }
          });
      })
    )
      .then(() => {
        console.log(finalResults);
      })
      .catch((err) => {
        console.log("Retry there is some error");
        console.log(err);
      });
  },
};
