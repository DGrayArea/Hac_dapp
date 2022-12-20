import Link from "next/link";
import NavButton from "../NavButton";
import { _3333contract, _333contract, alienContract } from '../../config/config'
import { useContract, useOwnedNFTs, useAddress, useContractWrite, useContractRead } from "@thirdweb-dev/react"

const NFTs = () => {

  const { contract } = useContract("0x60ac73f941d0ccb9019a50F4Fbb11D84d589acC0");
  const { mutateAsync: claimRewards, isLoading } = useContractWrite(contract, "claimRewards")

  const address = useAddress()

  const call3333 = async () => {
    try {
      const data = await claimRewards([ 0, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const call333 = async () => {
    try {
      const data = await claimRewards([ 1, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const callAlien = async () => {
    try {
      const data = await claimRewards([ 2, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const claimAllRewards = () => {
    call333()
    call3333()
    callAlien()
  }

  const { contract : firstContract } = useContract(_3333contract);
  const { contract : secondContract } = useContract(_333contract);
  const { contract : thirdContract } = useContract(alienContract);

  const { data : _3333Bal, /*isLoading: isLdng3333VaultBal*/ } = useOwnedNFTs(firstContract, address)
  const { data : _333Bal, /*isLoading: isLdng333VaultBal*/ } = useOwnedNFTs(secondContract, address)
  const { data : alienBal, /*isLoading: isLdngAlienVaultBal*/ } = useOwnedNFTs(thirdContract, address)

  const { data: e3333 } = useContractRead(contract, "getUserEarnedRewards", address, 0)
  const { data: e333 } = useContractRead(contract, "getUserEarnedRewards", address, 1)
  const { data: eAl } = useContractRead(contract, "getUserEarnedRewards", address, 2)

  const { data: staked3333Tokens} = useContractRead(contract, "getStakedTokens", address, 0)
  const { data: staked333Tokens } = useContractRead(contract, "getStakedTokens", address, 1)
  const { data: stakedAlienTokens } = useContractRead(contract, "getStakedTokens", address, 2)

  const earned333 =  parseInt(e333)
  const earned3333 = parseInt(e3333)
  const earnedAliens = parseInt(eAl)

  console.log(address)

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-purple-300/20 border mx-4 mt-5">
      <p className="font-bold"></p>
      <div className="mt-2 mb-2">
      <NavButton onClick={claimAllRewards} isActive={true} title="Claim all Rewards"  />
      </div>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center mt-3">
        <Link href="/staking/Hac3333">
          <div className="stats-container text-white">
            HAC 3333
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{staked3333Tokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{_3333Bal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
              <span>You earned {earned3333} HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/Hac333">
          <div className="stats-container text-white">
            HAC 333
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{staked333Tokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{_333Bal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
              <span>You earned {earned333} HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/HacAliens">
          <div className="stats-container text-white">
            HAC Alien
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{stakedAlienTokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{alienBal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
            <span>You earned {earnedAliens} HACT </span>
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NFTs;
