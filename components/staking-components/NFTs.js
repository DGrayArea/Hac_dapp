import Link from "next/link";
import toast from 'react-hot-toast'
import { _3333contract, _333contract, alienContract } from '../../config/config'
import { useContract, useAddress, useContractWrite, useContractRead } from "@thirdweb-dev/react"
import { Button } from "@nextui-org/react";
import { ethers } from 'ethers'
import NFTABI from '../../config/NFTABI.json'

const NFTs = () => {

  const { contract } = useContract("0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E");

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

  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")
  const firstContract = new ethers.Contract(_333contract, NFTABI, provider)
  const secondContract = new ethers.Contract(_3333contract, NFTABI, provider)
  const thirdContract = new ethers.Contract(alienContract, NFTABI, provider)

  const { data: e3333 } = useContractRead(contract, "getUserEarnedRewards", address, 0)
  const { data: e333 } = useContractRead(contract, "getUserEarnedRewards", address, 1)
  const { data: eAl } = useContractRead(contract, "getUserEarnedRewards", address, 2)

  const { data: staked3333Tokens} = useContractRead(contract, "getStakedTokens", address, 0)
  const { data: staked333Tokens } = useContractRead(contract, "getStakedTokens", address, 1)
  const { data: stakedAlienTokens } = useContractRead(contract, "getStakedTokens", address, 2)

  const earned333 =  parseInt(e333)
  const earned3333 = parseInt(e3333)
  const earnedAliens = parseInt(eAl)

  const setBal = async() => {
    let x = await firstContract.balanceOf(address)
    let y = await secondContract.balanceOf(address)
    let z = await thirdContract.balanceOf(address)

    document.getElementById('four').innerHTML = parseInt(x)
    document.getElementById('five').innerHTML = parseInt(y)
    document.getElementById('six').innerHTML = parseInt(z)
  }

  setBal()

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
                <span className="font-bold"><span id="four">{0}</span> NFTs</span>
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
                <span className="font-bold"><span id="five">{0}</span> NFTs</span>
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
            HAC ALIEN
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{stakedAlienTokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold"><span id='six'>{0}</span> NFTs</span>
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
