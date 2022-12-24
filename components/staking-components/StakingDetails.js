import React from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Button } from '@nextui-org/react';
import { useAddress } from '@thirdweb-dev/react'
import { ethers } from 'ethers';



const StakingDetails = ({ user, vaultId }) => {

  const address = useAddress()

  const contracto = '0xB9cAa80147D8f3cF3A4D52965406b515d5ca6797'

  const { contract } = useContract(contracto);
  const { data: daily, isLoading: isLoadingDailyR } = useContractRead(contract, "getUserDailyEarning", address, 0)
  const { data: earnedRewards, isLoading: isLoadingDataR } = useContractRead(contract, "getUserEarnedRewards", address, 0)
  const { data: stakedTokens, isLoading: isLoadingStaked } = useContractRead(contract, "getStakedTokens", address, 0)

  const dailyEarning = parseInt(daily)/1000E18

  return (
    <div className='stats-container mx-6 text-center'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between space-y-3 flex-col md:flex-row md:justify-between p-1 md:space-x-2'>
    <div className='stats mt-3'>
      <h2 className='text-sm'>Total Earned</h2>
      <p className='text-xl text-yellow-400 font-semibold'>{0} HACT</p>
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
    <Button auto flat bordered color='warning'>Claim Rewards</Button>
    </div>
</div>
  )
}

export default StakingDetails
