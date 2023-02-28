import React from 'react'
import Header from '../Header'
import StakedPagination from './StakedPagination'
import StakingDetails from './StakingDetails'
import UnstakedPagination from './UnstakedPagination'
import { useAccount } from 'wagmi'


const Staking = ({ name, vaultId, contract, cardName, token }) => {
  const { address } = useAccount()

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header name={name} />
      <StakingDetails address={address} vaultId={vaultId} />
          <UnstakedPagination token={token} vaultId={vaultId} contract={contract} />
        <StakedPagination vaultId={vaultId} cardName={cardName} />
      </div>
  )
}

export default Staking