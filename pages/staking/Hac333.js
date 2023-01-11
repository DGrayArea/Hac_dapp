import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  const { contract: nftContract } = useContract('0x7E82F54578f03ad922F2bA61674C46b9dBdCE61d')
  const { contract: token } = useContract('0xceA4195AeCc3622179334e346cF526312F32D836')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking tokenC={'0x7E82F54578f03ad922F2bA61674C46b9dBdCE61d'} vaultC={'0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A'}  name={'PROJECT 333 APES'} vaultId={0} contract={nftContract} token={token} cardName={'HAC 333'}  />
        </div>
      </div>
  )
}

export default Hac333