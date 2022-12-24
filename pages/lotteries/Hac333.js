import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";


const Hac333 = () => {

  const address = useAddress()

  const { contract } = useContract("0x62937Ef07743c40cE212DD85084f6C2a00E9C271");
  const { contract: tokenContract } = useContract("0xb6b4FFF2e95aAdd0B08fe1Cc087Efb5cF0a679D8");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery admin={owner} contract={contract} name='333' token={tokenContract} />
      </div>
  )
}

export default Hac333