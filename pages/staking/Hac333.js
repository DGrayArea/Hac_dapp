import React from 'react'
import Nav from '../../components/Nav'
import Staking from '../../components/staking-components/Staking'


const Hac333 = () => {

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking contract='0x7E82F54578f03ad922F2bA61674C46b9dBdCE61d' tokenC={'0xceA4195AeCc3622179334e346cF526312F32D836'}  name={'PROJECT 333 APES'} vaultId={0} cardName={'HAC 333'}  />
        </div>
      </div>
  )
}

export default Hac333