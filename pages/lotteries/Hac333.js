import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContractRead } from "wagmi"
import LOTTERYABI from '../../config/LOTTERYABI.json'


const Hac333 = () => {

  const { data: owner } = useContractRead({
    address: '0xB8e9e90cc512184082E8512a61C07206E8030C6d',
    abi: LOTTERYABI,
    functionName: 'owner'
  })

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery vaultId={0} endTime={'Jan 13, 2023 22:00:00'} tokenString='0xB8e9e90cc512184082E8512a61C07206E8030C6d' tContract={'0xceA4195AeCc3622179334e346cF526312F32D836'} admin={owner} name='PROJECT 333 APES' />
      </div>
  )
}

export default Hac333