import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead } from "@thirdweb-dev/react";


const Hac333 = () => {

  const { contract } = useContract("0x0000000000000000000000000000000000000000");
  const { data: owner, isLoading } = useContractRead(contract, "owner")

  return (
    <div className="bg-[#0d0613] min-h-screen flex flex-col">
      <Lottery admin={owner} contract={contract} name='333' />
      </div>
  )
}

export default Hac333