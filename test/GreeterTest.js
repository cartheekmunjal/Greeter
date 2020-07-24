const GreeterContract = artifacts.require("Greeter");
contract(
  "Greeter",
  () => {
    it("Contract has been deployed!", async function () {
      const greeter = await GreeterContract.deployed();
      assert(greeter, "contract wasn't deployed");
    });
  },
  describe("greet()", () => {
    it("returns Good Evening", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Good Evening";
      // const expected = "";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "Greeting Should be 'Good Evening'");
    });
  })
);

// function testUserGreeter() {
//   let returnGreet = GreeterContract.greet("Good evening");
//   let expected = "Good evening";
//   assert.equal(returnGreet, expected, "Greeting Should be 'Good evening' ");
// }
// testUserGreeter();
