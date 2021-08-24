// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address recipient) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address owner, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed owner, address indexed recipient, uint256 value);
    event Approval(address indexed owner, address indexed recipient, uint256 value);
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract ERC20Basic is IERC20 {
    using SafeMath for uint256;

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;
    uint256 totalSupply_;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor(uint256 total) {
        totalSupply_ = total;
        balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address recipient) public view override returns (uint256) {
        return allowed[owner][recipient];
    }

    function transfer(address recipient, uint256 value) public override returns (bool) {
        require(value <= balances[msg.sender]);

        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[recipient] = balances[recipient].add(value);

        emit Transfer(msg.sender, recipient, value);
        return true;
    }

    function approve(address recipient, uint256 value) public override returns (bool) {
        require(value <= balances[msg.sender]);
        
        allowed[msg.sender][recipient] = value;
        
        emit Approval(msg.sender, recipient, value);
        return true;
    }

    function transferFrom(address owner, address recipient, uint256 value) public override returns (bool) {
        require(value <= balances[owner]);
        require(value <= allowed[owner][recipient]);

        balances[owner] = balances[owner].sub(value);
        allowed[owner][recipient] = allowed[owner][recipient].sub(value);
        balances[recipient] = balances[recipient].add(value);

        emit Transfer(owner, recipient, value);
        return true;
    }
}
