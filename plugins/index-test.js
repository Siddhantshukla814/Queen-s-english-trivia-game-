// index.js

module.exports = {
  onPreBuild: ({ utils }) => {
    try {
      badMethod();
    } catch (error) {
      utils.build.failBuild("YOUR_FAILURE_MESSAGE", { error });
    }
  },
};

function badMethod() {
  throw "Too big";
}
