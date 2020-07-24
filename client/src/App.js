import React, { Component } from "react";
import GreeterContract from "./contracts/Greeter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { greeting: "", web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GreeterContract.networks[networkId];
      // const add="0xF92D49d29c8a3Fb5de0DF4C9C64CB10E052a8705";
      const instance = new web3.eth.Contract(
        GreeterContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // const instance = new web3.eth.Contract(GreeterContract.abi,add);
      console.log(networkId);
      console.log(deployedNetwork.address);
      console.log(instance);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.greet().call();

    this.setState({ greeting: response });
  };

  handleGreetingChange = (e) => {
    const inputVal = e.target.value;
    this.setState({ greeting: inputVal });
  };

  formSubmitHandler = async () => {
    const { accounts, contract, greeting } = this.state;
    const oldgetupdatedGreeting = await contract.methods
      .greet()
      .call({ from: accounts[0] });
    console.log("Old : " + oldgetupdatedGreeting);

    const updatedGreeting = await contract.methods
      .setGreeting(greeting)
      .send({ from: accounts[0] });

    const getupdatedGreeting = await contract.methods
      .greet()
      .call({ from: accounts[0] });
    // .receive({ from: accounts[0] });

    console.log(updatedGreeting);
    console.log("New : " + getupdatedGreeting);
    this.setState({ oldGreet: "Old Greeting Was : " + oldgetupdatedGreeting });
    this.setState({ newGreet: "New Greeting Was : " + getupdatedGreeting });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Greeter</h1>
        You are Entering : {this.state.greeting}
        <br></br>
        <form>
          <label>
            New Greeting:
            <input
              type="text"
              value={this.state.greeting}
              onChange={(e) => this.handleGreetingChange(e)}
            />
          </label>
        </form>
        <button onClick={this.formSubmitHandler}> Submit </button>
        <div> {this.state.oldGreet}</div>
        <div> {this.state.newGreet}</div>
      </div>
    );
  }
}

export default App;
