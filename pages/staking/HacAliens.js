import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  const { contract } = useContract('0xE33cc98d90975Ad42e56251B0A1cd8bda9FAF003')
  const { contract: token } = useContract('0x120A9664D35031691eC7ee98B81F1A87ebbD1217')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking token={token} vaultC={'0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E'}  name={'Hac Aliens Staking'} vaultId={2} contract={contract} cardName={'Hac Aliens'}  />
        </div>
      </div>
  )
}

export default Hac333