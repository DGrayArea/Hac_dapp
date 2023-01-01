import Link from "next/link";
import toast from 'react-hot-toast'
import { _3333contract, _333contract, alienContract } from '../../config/config'
import { useContract, useOwnedNFTs, useAddress, useContractWrite, useContractRead } from "@thirdweb-dev/react"
import { Button } from "@nextui-org/react";

const NFTs = () => {

  const { contract } = useContract("0x9c6E303B68a956EA3fC13648B7685841E446afe0");

  const { mutateAsync: claimForVault, isLoading } = useContractWrite(contract, "claimForVault")

  const address = useAddress()

  const call3333 = async () => {
    try {
      const data = await claimForVault([ 0, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const call333 = async () => {
    try {
      const data = await claimForVault([ 1, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const callAlien = async () => {
    try {
      const data = await claimForVault([ 2, address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const claimAllRewards = () => {
    const notification = toast.loading("Claiming your Rewards...");
  
    try {
      call333()
      call3333()
      callAlien()
     toast.success("Rewards claimed successfully", {
        id: notification,
      })
    } catch(ex) {
      toast.error("Whops something went wrong!", {
        id: notification,
      })
      console.log("contract call failure", ex);
    }
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

  console.log(address, e333, e3333, eAl)

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border mb-4 mx-4 mt-5">
      <p className="font-bold"></p>
      <div className="mt-2 mb-4">
        <div className="mx-auto text-center justify-center flex items-center">
      <Button auto bordered flat color='warning' css={{dflex:'center'}} onClick={claimAllRewards}>Claim all Rewards</Button>
      </div>
      </div>
      <div className="flex mb-6 flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center mt-3">
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
            <div className='text-yellow-400 text-sm italic font-extrabold'>
              <span>You earned {(earned3333/1E18).toFixed(2)} HACT </span>
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
            <div className='text-yellow-400 text-sm italic font-extrabold'>
              <span>You earned {(earned333/1E18).toFixed(2)} HACT </span>
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
            <div className='text-yellow-400 text-sm italic font-extrabold'>
            <span>You earned {(earnedAliens/1E18).toFixed(2)} HACT </span>
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NFTs;
