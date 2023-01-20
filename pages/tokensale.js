import { useContract } from '@thirdweb-dev/react'
import TokenSale from '../components/TokenSale'

const tokensale = () => {

  const { contract } = useContract("0xB8e9e90cc512184082E8512a61C07206E8030C6d");
  const { contract: tokenContract } = useContract("0xceA4195AeCc3622179334e346cF526312F32D836");

  return (
    <div className="bg-black min-h-screen mx-auto">
        <TokenSale />
    </div>
  )
}

export default tokensale