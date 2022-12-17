import React from 'react'
import NavButton from '../NavButton'
import { useContract, useContractRead } from "@thirdweb-dev/react";



const StakingDetails = ({ user, vaultId }) => {

  const contracto = '0x60ac73f941d0ccb9019a50F4Fbb11D84d589acC0'

  const { contract } = useContract(contracto);
  const { data: dailyEarning, isLoading: isLoadingDailyR } = useContractRead(contract, "getUserDailyEarning", user, vaultId)
  const { data: earnedRewards, isLoading: isLoadingDataR } = useContractRead(contract, "getUserEarnedRewards", user, vaultId)
  const { data: stakedTokens, isLoading: isLoadingStaked } = useContractRead(contract, "getStakedTokens", user, vaultId)

  return (
    <div className='stats-container mx-6 text-center'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between space-y-3 flex-col md:flex-row md:justify-between p-1 md:space-x-2'>
    <div className='stats'>
      <h2 className='text-sm'>Total Earned</h2>
      <p className='text-xl text-purple-300 font-semibold'>{earnedRewards} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Daily Earning</h2>
      <p className='text-xl text-purple-300 font-semibold'>{dailyEarning} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>NFTs Staked</h2>
      <p className='text-xl text-purple-300 font-semibold'>{stakedTokens?.length}</p>
    </div>
  </div>
  <div className='items-center text-center mt-3'>
    <NavButton isActive={true} title='Claim Rewards' />
    </div>
</div>
  )
}

export default StakingDetails