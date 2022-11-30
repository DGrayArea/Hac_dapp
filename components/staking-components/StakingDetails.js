import React from 'react'
import NavButton from '../NavButton'

const StakingDetails = () => {
  return (
    <div className='stats-container mx-6'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between p-1 space-x-2'>
    <div className='stats'>
      <h2 className='text-sm'>Total HAC Earned</h2>
      <p className='text-xl text-purple-300 font-semibold'>0.34</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>NFTs Staked</h2>
      <p className='text-xl text-purple-300 font-semibold'>100</p>
    </div>
  </div>
  <div className='items-center text-center mt-3'>
    <NavButton isActive={true} title='Claim Rewards' />
    </div>
</div>
  )
}

export default StakingDetails