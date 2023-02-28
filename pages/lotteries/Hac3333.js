import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContractRead } from "wagmi"
import LOTTERYABI from '../../config/LOTTERYABI.json'


const Hac3333 = () => {

  const { data: owner } = useContractRead({
    address: '0x38a5100E72805F35F7D014d2Ef7c69e8D24c6D81',
    abi: LOTTERYABI,
    functionName: 'owner'
  })

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery vaultId={1} endTime={'Jan 20, 2023 22:00:00'} tokenString='0x38a5100E72805F35F7D014d2Ef7c69e8D24c6D81' tContract={'0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68'} admin={owner} name='HORROR APES' />
      </div>
  )
}

export default Hac3333