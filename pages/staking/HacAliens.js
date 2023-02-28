import React from 'react'
import Nav from '../../components/Nav'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking contract='0xE33cc98d90975Ad42e56251B0A1cd8bda9FAF003' tokenC={'0x120A9664D35031691eC7ee98B81F1A87ebbD1217'} name={'ALIEN HORROR APES'} vaultId={2} cardName={'HAC Aliens'}  />
        </div>
      </div>
  )
}

export default Hac333