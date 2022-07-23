// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract NFT is ERC721Upgradeable, OwnableUpgradeable, PausableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    uint256 public maxSupply;
    uint256 public mintFee;
    uint256 public cappedSupply; // limit of each wallet's nft count
    address public beneficiary; // the wallet which will receive the minting fee

    //properties
    mapping(uint256=>string) public names;

    function initialize(string memory _name, string memory _symbol, uint256 _cappedSupply, address _beneficiary) public initializer {
        __ERC721_init(_name, _symbol);
        require(_cappedSupply > 0, "Invalid max supply");
        require(_beneficiary != address(0), "Invalid beneficiary");
        cappedSupply = _cappedSupply;
        beneficiary = _beneficiary;
        maxSupply = 100000;
        mintFee = 0;
        _pause();
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner{
        require(_maxSupply > 0 && _maxSupply >= totalSupply(), "Invalid max supply");
        maxSupply = _maxSupply;
    }

    function updateMintFee(uint256 _mintFee) external onlyOwner{
        mintFee = _mintFee;
    }

    function mint(string memory tokenURI) external payable{
        require(msg.value >= mintFee, "Insufficient mint fee.");
        mintTo(tokenURI, msg.sender);
    }

    function mintTo(string memory tokenURI, address recipient) internal returns(uint256) {
        require(balanceOf(recipient) < cappedSupply, "You can't mint anymore.");
        require(totalSupply() < maxSupply, "Max supply reached");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        require(from == address(0) || !paused(), "ERC721Pausable: token transfer while paused");
    }

    // set name of the token
    function setName(uint256 tokenId, string memory name) external {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner.");
        names[tokenId] = name;
    }

    // withdraw collected minting fee to the beneficiary
    function withDraw() external onlyOwner{
        payable(beneficiary).transfer(address(this).balance);
    }
}