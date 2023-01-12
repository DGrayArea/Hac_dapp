import React from 'react'
import Lottery from '../../components/lottery-components/Lottery'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";


const Hac3333 = () => {

  const { contract } = useContract("0x38a5100E72805F35F7D014d2Ef7c69e8D24c6D81");
  const { contract: tokenContract } = useContract("0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68");
  const { data: owner } = useContractRead(contract, "owner")

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Lottery endTime={'Jan 13, 2023 22:00:00'} tokenString={'0x38a5100E72805F35F7D014d2Ef7c69e8D24c6D81'} tContract={'0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68'} admin={owner} contract={contract} name='HORROR APES' token={tokenContract} />
      </div>
  )
}

export default Hac3333