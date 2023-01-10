import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead } from "@thirdweb-dev/react";


const Hac333 = () => {

  const { contract } = useContract("0xB8e9e90cc512184082E8512a61C07206E8030C6d");
  const { contract: tokenContract } = useContract("0xceA4195AeCc3622179334e346cF526312F32D836");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery endTime={'Jan 13, 2023 22:00:00'} tokenString={'0xB8e9e90cc512184082E8512a61C07206E8030C6d'} tContract={'0xceA4195AeCc3622179334e346cF526312F32D836'} admin={owner} contract={contract} name='333' token={tokenContract} />
      </div>
  )
}

export default Hac333