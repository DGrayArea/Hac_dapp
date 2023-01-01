import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  const { contract: nftContract } = useContract('0xD84d651e4B6968FF8865cFacAF3db20b28b136a8')
  const { contract: token } = useContract('0xD504C0aad04A7273Ae7e13a94CEB28b1c9F3b736')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking  name={'Hac 333 Staking'} vaultId={0} contract={nftContract} token={token} cardName={'Hac 333'}  />
        </div>
      </div>
  )
}

export default Hac333