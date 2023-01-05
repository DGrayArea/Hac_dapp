import React from 'react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { Button } from '@nextui-org/react';
import { useAddress } from '@thirdweb-dev/react'
import toast from 'react-hot-toast'
import TOKENABI from '../../config/TOKENABI.json'
import { ethers } from 'ethers';



const StakingDetails = ({ user, vaultId , token}) => {

  const address = useAddress()
  const nftArr = ['0xceA4195AeCc3622179334e346cF526312F32D836', '0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68', '0x120A9664D35031691eC7ee98B81F1A87ebbD1217']

  const contracto = '0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E'
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")
  const ethersContract = new ethers.Contract(nftArr[vaultId], TOKENABI, provider)

  const { contract } = useContract(contracto);
  const { data: daily, isLoading: isLoadingDailyR } = useContractRead(contract, "getUserDailyEarning", address, vaultId)
  const { data: earnedRewards, isLoading: isLoadingDataR } = useContractRead(contract, "getUserEarnedRewards", address, vaultId)
  const { data: stakedTokens, isLoading: isLoadingStaked } = useContractRead(contract, "getStakedTokens", address, vaultId)
  const { mutateAsync: claimForVault, isLoading } = useContractWrite(contract, "claimForVault")
  const { data: balance } = useContractRead(token, "balanceOf", address)

  const callClaim = async () => {
    const notification = toast.loading("Claiming your rewards...");

    try {
      const data = await claimForVault([ vaultId ]);
      console.info("contract call successs", data);
      toast.success("Rewards Claimed Successfully", {
        id: notification,
      })
    } catch (err) {
      toast.error("Whops something went wrong!", {
        id: notification,
      })
      console.error("contract call failure", err);
    }
  }

  const dailyEarning = parseInt(daily)
  let rawR = parseInt(earnedRewards) / 1E18
  const earned = rawR.toFixed(3)
  console.log(parseInt(earnedRewards))

  const bb = async() => {
    let x = 0
    if(address != undefined) {
    x = await ethersContract.balanceOf(address)
    } else {
      x = 0
    }
   return x
  }
  (bb().then(res => document.getElementById('balance').innerHTML = (parseInt(res)/1E18).toFixed(2)))

  const bal = (parseInt(balance)/1E18).toFixed(2)

  return (
    <div className='stats-container mx-6 text-center'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between space-y-3 flex-col md:flex-row md:justify-between p-1 md:space-x-2'>
    <div className='stats mt-3'>
      <h2 className='text-sm'>Total Earned</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{earned ? earned : 0} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Daily Earning</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{parseInt(dailyEarning) ? parseInt(dailyEarning) : 0} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>NFTs Staked</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{stakedTokens?.length}</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Balance</h2>
      <p className='text-xl text-yellow-400 font-semibold'><span id='balance'>{0}</span>HACT</p>
    </div>
  </div>
  <div className='items-center flex justify-center text-center mt-3'>
    <Button onPress={callClaim} auto flat bordered color='warning'>Claim Rewards</Button>
    </div>
</div>
  )
}

export default StakingDetails