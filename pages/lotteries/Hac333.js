import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";


const Hac333 = () => {

  const address = useAddress()

  const { contract } = useContract("0x0000000000000000000000000000000000000000");
  const { contract: tokenContract } = useContract("0x0000000000000000000000000000000000000000");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-[#0d0613] min-h-screen flex flex-col">
      <Lottery admin={owner} contract={contract} name='333' token={tokenContract} />
      </div>
  )
}

export default Hac333