import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";


const HacAliens = () => {

  const { contract } = useContract("0x760ED02d9407372416155A5962092ba95ebc1290");
  const { contract: tokenContract } = useContract("0x120A9664D35031691eC7ee98B81F1A87ebbD1217");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery endTime={'Jan 27, 2023 23:00:00'} tokenString={'0x760ED02d9407372416155A5962092ba95ebc1290'} tContract={'0x120A9664D35031691eC7ee98B81F1A87ebbD1217'} admin={owner} contract={contract} name='ALIEN HORROR APES' token={tokenContract} />
      </div>
  )
}

export default HacAliens
