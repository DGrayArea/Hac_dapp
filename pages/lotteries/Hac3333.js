import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";


const Hac3333 = () => {

  const address = useAddress()

  const { contract } = useContract("0xE58d23F3fd794E4fFb1e8A2E067375b0D7A04090");
  const { contract: tokenContract } = useContract("0xD504C0aad04A7273Ae7e13a94CEB28b1c9F3b736");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery admin={owner} contract={contract} name='3333' token={tokenContract} />
      </div>
  )
}

export default Hac3333