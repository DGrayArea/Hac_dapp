import React from 'react'
import Nav from '../../components/Nav'
import { useContract } from '@thirdweb-dev/react'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  const { contract } = useContract('0x1604Be4764993e1d9aD37358a918C910B4D37096')

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking  name={'Hac Aliens Staking'} vaultId={0} contract={contract} cardName={'Hac Aliens'}  />
        </div>
      </div>
  )
}

export default Hac333