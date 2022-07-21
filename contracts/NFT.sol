// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply = 1000000;
    uint256 public totalSupply = 0;
    uint256 public mintFee = 0;
    uint256 public cappedSupply;
    constructor(string memory _name, string memory _symbol, uint256 _cappedSupply) ERC721(_name, _symbol) {
        require(_cappedSupply > 0, "Invalid max supply");
        cappedSupply = _cappedSupply;
        _pause();
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner{
        require(_maxSupply > 0 && _maxSupply >= totalSupply, "Invalid max supply");
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
        require(totalSupply < maxSupply, "Max supply reached");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        totalSupply++;

        return newItemId;
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        require(!paused(), "ERC721Pausable: token transfer while paused");
    }

    function withDraw() external onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
}