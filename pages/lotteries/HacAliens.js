import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContractRead } from "wagmi"
import LOTTERYABI from '../../config/LOTTERYABI.json'


const HacAliens = () => {

  const { data: owner } = useContractRead({
    address: '0x760ED02d9407372416155A5962092ba95ebc1290',
    abi: LOTTERYABI,
    functionName: 'owner'
  })

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery vaultId={2} endTime={'Jan 27, 2023 22:00:00'} tokenString='0x760ED02d9407372416155A5962092ba95ebc1290' tContract={'0x120A9664D35031691eC7ee98B81F1A87ebbD1217'} admin={owner} name='ALIEN HORROR APES' />
      </div>
  )
}

export default HacAliens