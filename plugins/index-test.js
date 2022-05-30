// index.js

module.exports = {
  onPreBuild: ({ utils }) => {
    try {
      console.log("1111111111111111111111111");
      badMethod();
    } catch (error) {
      console.log("222222222222222222222");
      utils.build.cancelBuild("behenchod", { error });
    }
  },
};

function badMethod() {
  console.log("3333333333333333333333333");
  throw "Too big";
}
