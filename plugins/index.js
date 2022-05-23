// index.js

module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    console.log(netlifyConfig);
    console.log(netlifyConfig);
  },
  onPostBuild: ({ packageJson }) => {
    console.log(packageJson);
  },
};
