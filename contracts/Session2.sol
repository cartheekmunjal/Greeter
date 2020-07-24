// "SPDX-License-Identifier: UNLICENSED"
pragma solidity >=0.4.0 <0.7.0;

// import "packages/lib/contracts/openzeppelin-solidity/ownership/Ownable.sol";
contract Greeter {
    string private _greeting;
    address private _owner;
    bytes32[] showArray;
    bytes32[5] ShowFixedArray;
    // uint256 NameID;
    struct Profile {
        string fName;
        string lName;
        string city;
    }

    Profile profile;

    constructor() public {
        _owner = msg.sender;
        _greeting = "Good Evening";
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only Owner is allowed");
        _;
    }

    function greet() external view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function kill() public {
        if (msg.sender == _owner) {
            selfdestruct(msg.sender);
        }
    }

    function fillArray() public {
        ShowFixedArray[0] = "Test1";
        showArray.push("Test2");
        return;
    }

    function setProfile() public {
        profile = Profile("Elon", "Musk", "USA");
    }

    function getProfile()
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (profile.fName, profile.lName, profile.city);
    }

    function payGreeter(uint256 NameID) public payable returns (uint256) {
        return NameID;
    }
}
