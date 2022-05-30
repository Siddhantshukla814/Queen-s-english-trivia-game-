exports.runTest = (wpt, url, options) => {
  const tempOptions = JSON.parse(JSON.stringify(options));
  return new Promise((resolve, reject) => {
    console.info(`Submitting test for ${url}`);
    wpt.runTest(url, tempOptions, async (err, result) => {
      try {
        if (result.err && result.err > 0) {
          if (result.err == 1) {
            return reject(err);
          } else {
            return reject(err);
          }
        } else {
          return resolve({ result: result });
        }
      } catch (e) {
        console.info(e);
      }
    });
  });
};
