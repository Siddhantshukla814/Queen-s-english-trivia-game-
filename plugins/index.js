// index.js

module.exports = {
  onPostBuild: ({ netlifyConfig }) => {
    console.log(netlifyConfig.build.environment.DEPLOY_PRIME_URL);
    console.log(
      "netlifyConfig.build.environment.DEPLOY_PRIME_URL------------------------------------------"
    );
  },
};
