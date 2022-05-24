const WebPageTest = require("webpagetest");

const wpt = new WebPageTest("https://www.webpagetest.org", "12581d97-7b8b-4519-b02f-b404f401a973");

module.exports = {
  onPostBuild: async ({ netlifyConfig }) => {
    //console.log(netlifyConfig.build.environment.DEPLOY_PRIME_URL)

    const urls = [netlifyConfig.build.environment.DEPLOY_PRIME_URL];

    let options = {
      firstViewOnly: true,
      runs: 1,
      pollResults: 5,
    };

    const runTest = (wpt, url, options) => {
      return new Promise((resolve, reject) => {
        console.log(`Submitting test for ${url}...`);
        wpt.runTest(url, options, async (err, result) => {
          try {
            if (result) {
              return resolve(result);
            } else {
              return reject(err);
            }
          } catch (e) {
            console.info(e);
          }
        });
      });
    };

    (async function () {
      Promise.all(
        urls.map(async (url) => {
          try {
            await runTest(wpt, url, options).then(async (result) => {
              if (result.data) {
                console.log("asdasdasd");
              }
            });
          } catch (e) {
            console.error(e);
          }
        })
      ).then(() => {
        console.info("finalResults");
      });
    })();
  },
};
