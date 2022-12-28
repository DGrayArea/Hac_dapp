import React from 'react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { Button } from '@nextui-org/react';
import { useAddress } from '@thirdweb-dev/react'
import toast from 'react-hot-toast'



const StakingDetails = ({ user, vaultId }) => {

  const address = useAddress()

  const contracto = '0x9c6E303B68a956EA3fC13648B7685841E446afe0'

  const { contract } = useContract(contracto);
  const { data: daily, isLoading: isLoadingDailyR } = useContractRead(contract, "getUserDailyEarning", address, 0)
  const { data: earnedRewards, isLoading: isLoadingDataR } = useContractRead(contract, "getUserEarnedRewards", address, 0)
  const { data: stakedTokens, isLoading: isLoadingStaked } = useContractRead(contract, "getStakedTokens", address, 0)
  const { mutateAsync: claimForVault, isLoading } = useContractWrite(contract, "claimForVault")

  const callClaim = async () => {
    const notification = toast.loading("Claiming your rewards...");

    try {
      const data = await claimForVault([ 0 ]);
      console.info("contract call successs", data);
      toast.success("Rewards claimedSuccessfully", {
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

  return (
    <div className='stats-container mx-6 text-center'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between space-y-3 flex-col md:flex-row md:justify-between p-1 md:space-x-2'>
    <div className='stats mt-3'>
      <h2 className='text-sm'>Total Earned</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{earned} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Daily Earning</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{parseInt(dailyEarning)} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>NFTs Staked</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{stakedTokens?.length}</p>
    </div>
  </div>
  <div className='items-center flex justify-center text-center mt-3'>
    <Button onPress={callClaim} auto flat bordered color='warning'>Claim Rewards</Button>
    </div>
</div>
  )
}

export default StakingDetails