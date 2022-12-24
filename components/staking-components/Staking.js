import React from 'react'
import Header from '../Header'
import Nav from '../Nav'
import StakedPagination from './StakedPagination'
import StakingDetails from './StakingDetails'
import UnstakedPagination from './UnstakedPagination'
import { useAddress } from '@thirdweb-dev/react'


const Staking = ({ name, user, vaultId, contract, cardName }) => {
  
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header name={name} />
      <StakingDetails user={user} vaultId={0} />
          <UnstakedPagination vaultId={0} contract={contract} cardName={cardName} />
        <StakedPagination vaultId={0} contract={contract} cardName={cardName} />
      </div>
  )
}

export default Staking