import React from 'react'
import Staking from '../../components/staking-components/Staking'
import { useAddress } from '@thirdweb-dev/react'

const Hac333 = () => {

  const account = useAddress()

  return (
    <div className="bg-[#0d0613] min-h-screen flex flex-col">
      <Staking user={account} vaultId={0} name='Hac 333 Staking' />
      </div>
  )
}

export default Hac333