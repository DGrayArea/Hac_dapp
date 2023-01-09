// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./RewardsToken.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IHacStakingVaultV1 {
    function tokenRarity(uint256 _vaultId, uint256 _tokenId) external view returns(uint256);

    function rewardRate(uint256 _id) external view returns(uint256);
}

contract HacStakingVaultV2 is IERC721Receiver, Ownable, ReentrancyGuard {

    struct vault {
        IERC721 nft;
        RewardsToken token;
        string name;
    }

    struct StakedToken {
        address staker;
        uint256 tokenId;
        uint256 stakedTimestamp;
    }
    
    // Staker info
    struct Staker {
        uint256 amountStaked;
        StakedToken[] stakedTokens;
    }


    vault[] public VaultInfo;

    IHacStakingVaultV1 public V1Vault;

    mapping(uint256 => mapping(uint256 => address)) public stakerAddress;
    mapping(address => mapping(uint256 => Staker)) public stakerInfo;

    bool public active;

    modifier isActive() {
        require(active == true, "staking vault is currently closed");
        _;
    }


    event MultiStake (uint256 indexed vaultId, uint256[] indexed tokenIds);
    event MultiUnstake (uint256 indexed vaultId, uint256[] indexed tokenIds);
    event RewardsClaimed (uint256 indexed vaultId, uint256 indexed amount);
    event NewVault (vault indexed _vaultInfo, uint256 indexed time);


  constructor(IHacStakingVaultV1 _v1Vault) {
        V1Vault = _v1Vault;
        active = false;
    }

    //only owner functions

    function addVault(
        IERC721 _nft,
        RewardsToken _token,
        string calldata _name
    ) public onlyOwner {
        VaultInfo.push(
            vault({
                nft: _nft,
                token: _token,
                name: _name
            })
        );
        emit NewVault(vault(_nft, _token, _name), block.timestamp);
    }

    function setActiveState(bool _state) public onlyOwner {
        active = _state;
    }

    //internal functions
    

    function claimForVault(uint256 _vaultId, address _staker, uint256[] calldata _tokenIds) public {
       vault storage vaultid = VaultInfo[_vaultId];
        uint256 index = 0;
        uint256 i = 0;
        uint256 idLength = _tokenIds.length;
        uint256 rewards = calculateRewards(_staker, _vaultId);
        for (i; i < idLength; ++i) {
        if (stakerInfo[_staker][_vaultId].stakedTokens[i].tokenId == _tokenIds[i] && stakerInfo[_staker][_vaultId].stakedTokens[i].staker != address(0)) {
                index = i;
                break;
            }
        }
        stakerInfo[msg.sender][_vaultId].stakedTokens[index].stakedTimestamp = block.timestamp;
        vaultid.token.mint(_staker, rewards);

       emit RewardsClaimed(_vaultId, rewards);
    }

    //external functions

    function stake(uint256 _vaultId, uint256[] calldata _tokenIds, address _staker) external isActive nonReentrant {
        vault storage vaultid = VaultInfo[_vaultId];
        uint length = _tokenIds.length;
        uint i;

        for(i; i < length; ++i) {
        unchecked {
        uint256 id = _tokenIds[i];
        require(vaultid.nft.ownerOf(id) == _staker,"Not NFT owner");
        vaultid.nft.transferFrom(msg.sender, address(this), id);
        StakedToken memory stakedToken = StakedToken(_staker, id, block.timestamp);
        stakerInfo[_staker][_vaultId].stakedTokens.push(stakedToken);
        stakerInfo[_staker][_vaultId].amountStaked++;
        stakerAddress[_vaultId][id] = _staker; 
            }
        }
        emit MultiStake(_vaultId, _tokenIds);
    }

    function unStake(uint256 _vaultId, uint256[] calldata _tokenIds, address _staker) external isActive nonReentrant {
        uint256 idLength = _tokenIds.length;
        uint256 l;
        vault storage vaultid = VaultInfo[_vaultId];
        claimForVault(_vaultId, _staker, _tokenIds);

        for(l; l < idLength; ++l) {
        unchecked {
        uint256 id = _tokenIds[l];
        require(stakerInfo[_staker][_vaultId].amountStaked > 0, "No tokens staked");
        require(stakerAddress[_vaultId][id] == _staker, "Not NFT owner!");
        uint256 index = 0;
        uint256 i = 0;
        uint256 length = stakerInfo[msg.sender][_vaultId].stakedTokens.length;
        for (i; i < length; ++i) {
        if (stakerInfo[_staker][_vaultId].stakedTokens[i].tokenId == id && stakerInfo[_staker][_vaultId].stakedTokens[i].staker != address(0)) {
                index = i;
                break;
            }
        }
        stakerInfo[_staker][_vaultId].stakedTokens[index].staker = address(0);
        stakerInfo[_staker][_vaultId].stakedTokens[index].stakedTimestamp = block.timestamp;
        stakerInfo[_staker][_vaultId].amountStaked--;
        stakerAddress[_vaultId][id] = address(0);
        vaultid.nft.transferFrom(address(this), _staker, id);
            }

        }
        emit MultiUnstake(_vaultId, _tokenIds);
    }

    //read functions



    function calculateRewards(address _staker, uint256 _vaultId)
    internal
        view
        returns (uint256 _rewards)
    {
        StakedToken[] memory staked = getStakedTokens(_staker, _vaultId);
        uint i;
        uint rewards;
        for (i; i< staked.length; ++i) {
        uint256 tokenId = stakerInfo[_staker][_vaultId].stakedTokens[i].tokenId;
        uint256 rarity = V1Vault.tokenRarity(_vaultId, tokenId);
        uint256 rewardRate = V1Vault.rewardRate(rarity);
           rewards += ((block.timestamp - stakerInfo[_staker][_vaultId].stakedTokens[i].stakedTimestamp) *
           (rewardRate / 86400));
        }
        return rewards;
    }


 function getStakedTokens(address _user, uint256 _vaultId) public view returns (StakedToken[] memory) {
        // Check if we know this user
        if (stakerInfo[_user][_vaultId].amountStaked > 0) {
            StakedToken[] memory _stakedTokens = new StakedToken[](stakerInfo[_user][_vaultId].amountStaked);
            uint256 _index = 0;

            for (uint256 j = 0; j < stakerInfo[_user][_vaultId].stakedTokens.length; j++) {
                if (stakerInfo[_user][_vaultId].stakedTokens[j].staker != (address(0))) {
                    _stakedTokens[_index] = stakerInfo[_user][_vaultId].stakedTokens[j];
                    _index++;
                }
            }

            return _stakedTokens;
        }
        else {
            return new StakedToken[](0);
        }
    }

    function getUserEarnedRewards(address _staker, uint256 _vaultId) public view returns (uint256) {
         StakedToken[] memory staked = getStakedTokens(_staker, _vaultId);
        uint i;
        uint rewards;
        for (i; i< staked.length; ++i) {
        uint256 tokenId = stakerInfo[_staker][_vaultId].stakedTokens[i].tokenId;
        uint256 rarity = V1Vault.tokenRarity(_vaultId, tokenId);
        uint256 rewardRate = V1Vault.rewardRate(rarity);
           rewards += ((block.timestamp - stakerInfo[_staker][_vaultId].stakedTokens[i].stakedTimestamp) *
           (rewardRate / 86400));
        }
        return rewards;
    }


    function getUserDailyEarning(address _user, uint256 _vaultId) public view returns (uint256) {
            uint256 earned;
        if (stakerInfo[_user][_vaultId].amountStaked > 0) {
            // Return all the tokens in the stakedToken Array for this user that are not -1
            StakedToken[] memory _stakedTokens = new StakedToken[](stakerInfo[_user][_vaultId].amountStaked);
            uint256 _index = 0;
            uint256 j = 0;

            for (j; j < stakerInfo[_user][_vaultId].stakedTokens.length; ++j) {
                if (stakerInfo[_user][_vaultId].stakedTokens[j].staker != (address(0))) {
                    _stakedTokens[_index] = stakerInfo[_user][_vaultId].stakedTokens[j];
                    _index++;
                }
            }
             for(uint256 i; i < _stakedTokens.length; ++i) {
                uint256 rarity;
                rarity = V1Vault.tokenRarity(_vaultId, stakerInfo[_user][_vaultId].stakedTokens[i].tokenId);
                earned += (rarity + 1);
             }
        }
             return earned;
    }

    function tRarity(uint256 _vaultId, uint256 _tokenId) public view returns(uint256 rarity){
        rarity = V1Vault.tokenRarity(_vaultId, _tokenId);
    }
    function rewardR(uint256 _vaultId, uint256 _tokenId) public view returns(uint256 rate){
        uint256 rarity = V1Vault.tokenRarity(_vaultId, _tokenId);
        rate = V1Vault.rewardRate(rarity);
    }

      function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721Receiver.onERC721Received.selector;
    }
}