const WebPageTest = require("webpagetest");
const axios = require("axios");

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
    const test = await axios.get(`https://www.webpagetest.org/runtest.php?k=${key}&url=${url}&f=json`);

    console.log(test);
  },
};
