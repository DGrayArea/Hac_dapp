import React from 'react'
import Header from '../Header'
import StakedPagination from './StakedPagination'
import StakingDetails from './StakingDetails'
import UnstakedPagination from './UnstakedPagination'


const Staking = ({ name, user, vaultId, contract, cardName, token }) => {
  
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header name={name} />
      <StakingDetails token={token } user={user} vaultId={vaultId} />
          <UnstakedPagination vaultId={vaultId} contract={contract} cardName={cardName} />
        <StakedPagination vaultId={vaultId} contract={contract} cardName={cardName} />
      </div>
  )
}

export default Staking