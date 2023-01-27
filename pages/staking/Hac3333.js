import React from 'react'
import Nav from '../../components/Nav'
import Staking from '../../components/staking-components/Staking'


const Hac3333 = () => {

  return (
    <div className="bg-black min-h-screen mx-auto">
        <Nav />
        <div className='nftDiv'>
        <Staking contract='0xAFc7647b584730694B9606511F11F423A0816eFf' tokenC={'0x120A9664D35031691eC7ee98B81F1A87ebbD1217'} name={'HORROR APES'} vaultId={1} cardName={'HAC 3333'}  />
        </div>
      </div>
  )
}

export default Hac3333