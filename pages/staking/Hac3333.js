import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac3333 = () => {

  const { contract } = useContract('0xAFc7647b584730694B9606511F11F423A0816eFf')
  const { contract: token } = useContract('0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking token={token} vaultC={'0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E'}  name={'Hac 3333 Staking'} vaultId={1} contract={contract} cardName={'Hac 3333'}  />
        </div>
      </div>
  )
}

export default Hac3333