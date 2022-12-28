import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac3333 = () => {

  const { contract } = useContract('0xD84d651e4B6968FF8865cFacAF3db20b28b136a8')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking  name={'Hac 3333 Staking'} vaultId={0} contract={contract} cardName={'Hac 3333'}  />
        </div>
      </div>
  )
}

export default Hac3333