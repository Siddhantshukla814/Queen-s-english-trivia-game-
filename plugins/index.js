const WebPageTest = require("webpagetest");

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
    const test = await axios.get(
      "https://www.webpagetest.org/runtest.php?k=12581d97-7b8b-4519-b02f-b404f401a973&url=https://www.amazon.com&f=json"
    );

    console.log(test);
  },
};
