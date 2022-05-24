const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "12581d97-7b8b-4519-b02f-b404f401a973");

module.exports = {
  onPostBuild: ({ netlifyConfig }) => {
    console.log(netlifyConfig.build.environment.DEPLOY_PRIME_URL);

    const testURL = netlifyConfig.build.environment.DEPLOY_PRIME_URL;

    let options = {
      firstViewOnly: true,
      runs: 1,
      pollResults: 5,
    };

    // Run the test
    wpt.runTest(testURL, options, (err, result) => {
      if (result) {
        console.log(result);
      } else {
        console.log(err);
      }
    });

    console.log(
      "--------------------------------------------------------------------------------------"
    );
  },
};
